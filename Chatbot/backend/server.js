const express = require("express");
const sql = require("mssql");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// OpenAI API Key — safe here in server, never in browser 
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Data Warehouse Connection 
const dbConfig = {
    user: "museumadmin",
    password: "Museum@123",
    server: "localhost\\NEWSQL",
    database: "Museum_DWH",

    requestTimeout: 60000,
    connectionTimeout: 30000,

    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Health check 
app.get("/", (req, res) => {
    res.json({
        status: "KEMET API is running",
        database: "Museum_DWH (Data Warehouse)",
        routes: ["/api/museum-data", "/api/chat"],
    });
});


app.post("/api/chat", async (req, res) => {
    try {
        const requestSize = JSON.stringify(req.body || {}).length;
        if (requestSize > 180000) {
            return res.status(400).json({
                error: "Prompt too large before OpenAI call. Reduce included data/history."
            });
        }

        if (!OPENAI_API_KEY || OPENAI_API_KEY === "paste your new OpenAI key here") {
            return res.status(500).json({
                error: "OpenAI API key is missing. Set OPENAI_API_KEY in environment or add it in server.js.",
            });
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("OpenAI error:", data);
            return res.status(response.status).json(data);
        }

        res.json(data);

    } catch (error) {
        console.error("OpenAI API error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Museum Data Endpoint 
app.get("/api/museum-data", async (req, res) => {
    try {
        await sql.connect(dbConfig);

        const [
            museums,
            museumServices,
            halls,
            artifacts,
            tickets,
            pricing,
            events,
            tours,
            guides,
            languages,
            museumStats,
            tourStats,
            eventStats,
        ] = await Promise.all([

            // DimMuseum 
            sql.query(`
                SELECT
                    MuseumKey, MuseumID,
                    MuseumName  AS Name,
                    Government, District,
                    MuseumType  AS Type,
                    Capacity,   OpeningYear
                FROM DimMuseum
            `),

            // BridgeMuseumService + DimService 
            sql.query(`
                SELECT
                    bms.MuseumKey,
                    dm.MuseumName AS MuseumName,
                    ds.ServiceName
                FROM BridgeMuseumService bms
                JOIN DimMuseum  dm ON bms.MuseumKey  = dm.MuseumKey
                JOIN DimService ds ON bms.ServiceKey = ds.ServiceKey
            `),

            // DimHall 
            sql.query(`
                SELECT
                    h.HallKey, h.HallID,
                    h.HallName  AS Name,
                    h.Status,   h.MuseumKey,
                    m.MuseumName
                FROM DimHall h
                JOIN DimMuseum m ON h.MuseumKey = m.MuseumKey
            `),

            // DimArtifact 
            sql.query(`
                SELECT
                    a.ArtifactKey, a.ArtifactID,
                    a.ArtifactName AS Name,
                    a.Category, a.Era, a.Condition, a.HallKey,
                    h.HallName, h.MuseumKey,
                    m.MuseumName
                FROM DimArtifact a
                JOIN DimHall   h ON a.HallKey   = h.HallKey
                JOIN DimMuseum m ON h.MuseumKey = m.MuseumKey
            `),

            // DimTicket 
            sql.query(`
                SELECT
                    TicketKey, TicketTypeID, TicketTypeName,
                    TicketClassID, TicketClassName
                FROM DimTicket
            `),

            // DimPricing (all booking types) 
            sql.query(`
                SELECT
                    p.PricingKey,  p.PricingID,
                    p.BookingType, p.EntityID,
                    p.NationalityCategory,
                    p.BasePrice,   p.DiscountPercentage,
                    t.TicketTypeName,
                    t.TicketClassName,
                    CASE
                        WHEN p.BookingType = 'Museum' THEN m.MuseumName
                        WHEN p.BookingType = 'Tour'   THEN tr.TourName
                        WHEN p.BookingType = 'Event'  THEN e.EventName
                        ELSE 'Unknown'
                    END AS EntityName
                FROM DimPricing p
                JOIN DimTicket t
                    ON  p.TicketTypeID  = t.TicketTypeID
                    AND p.TicketClassID = t.TicketClassID
                LEFT JOIN DimMuseum m
                    ON p.BookingType = 'Museum' AND p.EntityID = m.MuseumID
                LEFT JOIN DimTour tr
                    ON p.BookingType = 'Tour'   AND p.EntityID = tr.TourID
                LEFT JOIN DimEvent e
                    ON p.BookingType = 'Event'  AND p.EntityID = e.EventID
            `),

            // DimEvent 
            sql.query(`
                SELECT
                    e.EventKey, e.EventID,
                    e.EventName AS Name,
                    e.EventType AS Type,
                    e.Capacity,
                    e.MuseumID, e.HallID,
                    m.MuseumName, m.MuseumKey
                FROM DimEvent e
                JOIN DimMuseum m ON e.MuseumID = m.MuseumID
            `),

            // DimTour 
            sql.query(`
                SELECT
                    t.TourKey, t.TourID,
                    t.TourName AS Name,
                    t.Capacity,
                    t.MuseumID, t.HallID,
                    m.MuseumName, m.MuseumKey
                FROM DimTour t
                JOIN DimMuseum m ON t.MuseumID = m.MuseumID
            `),

            // DimGuide + BridgeGuideLanguage + DimLanguage 
            sql.query(`
                SELECT
                    g.GuideKey,   g.GuideID,
                    g.FullName,   g.ExperienceYears,
                    g.CertificationLevel, g.ContractType,
                    g.AssignmentDate,
                    STRING_AGG(l.LanguageName, ', ') AS Languages
                FROM DimGuide g
                JOIN BridgeGuideLanguage bgl ON g.GuideKey    = bgl.GuideKey
                JOIN DimLanguage         l   ON bgl.LanguageKey = l.LanguageKey
                GROUP BY
                    g.GuideKey,   g.GuideID,
                    g.FullName,   g.ExperienceYears,
                    g.CertificationLevel, g.ContractType,
                    g.AssignmentDate
            `),

            // DimLanguage 
            sql.query(`
                SELECT LanguageKey, LanguageID, LanguageName
                FROM DimLanguage
            `),

            // FactMuseumBooking — stakeholder stats 
            sql.query(`
                SELECT
                    f.MuseumKey,
                    m.MuseumName,
                    m.Government,
                    COUNT(f.MuseumBookingKey)  AS TotalBookings,
                    SUM(f.Quantity)            AS TotalVisitors,
                    SUM(f.TotalPrice)          AS TotalRevenue,
                    AVG(f.UnitPrice)           AS AvgTicketPrice,
                    SUM(f.DiscountAmount)      AS TotalDiscounts
                FROM FactMuseumBooking f
                JOIN DimMuseum m ON f.MuseumKey = m.MuseumKey
                GROUP BY f.MuseumKey, m.MuseumName, m.Government
            `),

            // FactTourBooking — stakeholder stats 
            sql.query(`
                SELECT
                    f.TourKey,
                    t.TourName,
                    t.MuseumID,
                    m.MuseumName,
                    COUNT(f.TourBookingKey)  AS TotalBookings,
                    SUM(f.Quantity)          AS TotalParticipants,
                    SUM(f.TotalPrice)        AS TotalRevenue,
                    AVG(f.UnitPrice)         AS AvgTourPrice
                FROM FactTourBooking f
                JOIN DimTour   t ON f.TourKey  = t.TourKey
                JOIN DimMuseum m ON t.MuseumID = m.MuseumID
                GROUP BY f.TourKey, t.TourName, t.MuseumID, m.MuseumName
            `),

            // FactEventBooking — stakeholder stats 
            sql.query(`
                SELECT
                    f.EventKey,
                    e.EventName,
                    e.EventType,
                    e.MuseumID,
                    m.MuseumName,
                    COUNT(f.EventBookingKey) AS TotalBookings,
                    SUM(f.Quantity)          AS TotalAttendees,
                    SUM(f.TotalPrice)        AS TotalRevenue,
                    AVG(f.UnitPrice)         AS AvgEventPrice
                FROM FactEventBooking f
                JOIN DimEvent  e ON f.EventKey = e.EventKey
                JOIN DimMuseum m ON e.MuseumID = m.MuseumID
                GROUP BY
                    f.EventKey, e.EventName, e.EventType,
                    e.MuseumID, m.MuseumName
            `),
        ]);

        res.json({
            // Dimension data — visitor mode
            museums:        museums.recordset,
            museumServices: museumServices.recordset,
            halls:          halls.recordset,
            artifacts:      artifacts.recordset,
            tickets:        tickets.recordset,
            pricing:        pricing.recordset,
            events:         events.recordset,
            tours:          tours.recordset,
            guides:         guides.recordset,
            languages:      languages.recordset,

            // Fact data — stakeholder/admin mode 
            museumStats:    museumStats.recordset,
            tourStats:      tourStats.recordset,
            eventStats:     eventStats.recordset,
        });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: err.message });
    } finally {
        await sql.close();
    }
});

app.listen(3000, () => {
    console.log("Museum API running at http://localhost:3000");
    console.log("Database: Museum_DWH (Data Warehouse)");
});