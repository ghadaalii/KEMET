// Mode management
let currentMode = "visitor";
const ADMIN_PASSWORD = "kemet2024";

const conversationHistory = [];
let MUSEUM_DATA = null;

let pendingIntent = null;

let pendingSlots = {
  museum: null,
  nationality: null,
  ticketType: null,
  ticketClass: null,
};

let lastMentionedEntity = null;
let lastMentionedGuide = null;

// Language detection
function detectLanguage(text) {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text) ? "arabic" : "english";
}

// Format markdown to HTML
function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^\* (.+)$/gm, "<li>$1</li>")
    .replace(/^\d+\.\s(.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
    .replace(/\n/g, "<br>");
}

// Add message bubble
function addMessage(text, role) {
  const messagesDiv = document.getElementById("messages");
  const lang = detectLanguage(text);
  const div = document.createElement("div");
  div.className = `message ${role}${lang === "arabic" ? " arabic" : ""}`;
  div.innerHTML = role === "assistant" ? formatMessage(text) : text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Typing animation
function showTyping() {
  const messagesDiv = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = "typing-indicator";
  div.id = "typingIndicator";
  div.innerHTML = "<span></span><span></span><span></span>";
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function hideTyping() {
  const indicator = document.getElementById("typingIndicator");
  if (indicator) indicator.remove();
}

// Quick reply buttons
function sendQuickReply(text) {
  const quickReplies = document.getElementById("quickReplies");

  if (quickReplies) {
    quickReplies.style.display = "none";
  }

  document.getElementById("userInput").value = text;
  sendMessage();
}

function rememberEntityFromReply(reply) {
  const text = reply.toLowerCase();

  const tours = MUSEUM_DATA?.tours || [];
  const events = MUSEUM_DATA?.events || [];
  const museums = MUSEUM_DATA?.museums || [];
  const guides = MUSEUM_DATA?.guides || [];

  const tour = tours.find((t) => {
    const name = String(t.Name || "").toLowerCase();
    return name && text.includes(name);
  });

  if (tour) {
    lastMentionedEntity = {
      type: "tour",
      id: tour.TourID,
      name: tour.Name,
    };
    return;
  }

  const event = events.find((e) => {
    const name = String(e.Name || "").toLowerCase();
    return name && text.includes(name);
  });

  if (event) {
    lastMentionedEntity = {
      type: "event",
      id: event.EventID,
      name: event.Name,
    };
    return;
  }

  const guide = guides.find((g) => {
    const name = String(g.FullName || "").toLowerCase();
    return name && text.includes(name);
  });

  if (guide) {
    lastMentionedGuide = guide;
    return;
  }

  const museum = museums.find((m) => {
    const name = String(m.Name || "").toLowerCase();
    return name && text.includes(name);
  });

  if (museum) {
    lastMentionedEntity = {
      type: "museum",
      id: museum.MuseumID,
      key: museum.MuseumKey,
      name: museum.Name,
    };
  }
}

// Mode switching
function switchMode(mode) {
  if (mode === "admin" && currentMode !== "admin") {
    document.getElementById("adminModal").classList.add("show");
    document.getElementById("adminPassword").focus();
    document.getElementById("adminError").textContent = "";
  } else if (mode === "visitor") {
    currentMode = "visitor";
    document.getElementById("chatWrapper").classList.remove("admin-mode");
    document.getElementById("visitorBtn").classList.add("active");
    document.getElementById("adminBtn").classList.remove("active");
    document.getElementById("headerTitle").textContent = "KEMET Assistant";
    document.getElementById("headerSubtitle").textContent =
      "Museums of Egypt — AI Guide";
    document.getElementById("userInput").placeholder =
      "Ask about museums, tickets, events...";
    resetChat("visitor");
  }
}

// Admin password verification
function verifyAdmin() {
  const password = document.getElementById("adminPassword").value;
  if (password === ADMIN_PASSWORD) {
    document.getElementById("adminModal").classList.remove("show");
    document.getElementById("adminPassword").value = "";
    currentMode = "admin";
    document.getElementById("chatWrapper").classList.add("admin-mode");
    document.getElementById("visitorBtn").classList.remove("active");
    document.getElementById("adminBtn").classList.add("active");
    document.getElementById("headerTitle").textContent = "KEMET Admin";
    document.getElementById("headerSubtitle").textContent =
      "Museum Management — Staff Access";
    document.getElementById("userInput").placeholder =
      "Ask about statistics, reports, performance...";
    resetChat("admin");
  } else {
    document.getElementById("adminError").textContent =
      "Incorrect password. Please try again.";
    document.getElementById("adminPassword").value = "";
    document.getElementById("adminPassword").focus();
  }
}

// Cancel admin login 
function cancelAdmin() {
  document.getElementById("adminModal").classList.remove("show");
  document.getElementById("adminPassword").value = "";
  document.getElementById("adminError").textContent = "";
}

// Reset chat on mode switch
function resetChat(mode) {
  const messagesDiv = document.getElementById("messages");
  conversationHistory.length = 0;

  if (mode === "visitor") {
    messagesDiv.innerHTML = `
        <div class="message assistant welcome-message">
            <div class="welcome-icon">𓂀</div>
            <div class="welcome-text">
                <strong>Welcome to the Museums of Egypt!</strong><br>
                I am KEMET, your personal AI guide. I can help you explore museums, find tours, check ticket prices, discover events, and connect you with expert guides.
                <br><br>How can I help you today?
            </div>
        </div>
        <div class="quick-replies" id="quickReplies">
            <button class="quick-reply-btn" onclick="sendQuickReply('Tell me about available tours')">
                <span>🗺️ Available Tours</span>
            </button>
            <button class="quick-reply-btn" onclick="sendQuickReply('What events are happening?')">
                <span>🎭 Upcoming Events</span>
            </button>
            <button class="quick-reply-btn" onclick="sendQuickReply('I need a guide')">
                <span>👤 Find a Guide</span>
            </button>
        </div>`;
  } else {
    messagesDiv.innerHTML = `
        <div class="message assistant welcome-message">
            <div class="welcome-icon">⚙️</div>
            <div class="welcome-text">
                <strong>Welcome, Stakeholder!</strong><br>
                You have full access to museum performance reports and statistics from the Data Warehouse. You can ask about:
                <br><br>
                📊 Museum bookings and revenue statistics<br>
                🎫 Ticket sales and pricing analysis<br>
                🗺️ Tour performance and participant counts<br>
                🎭 Event attendance and revenue<br>
                👤 Guide workload and language coverage<br>
                🏛️ Museum capacity utilization
                <br><br>What would you like to analyze?
            </div>
        </div>
        <div class="quick-replies" id="quickReplies">
            <button class="quick-reply-btn" onclick="sendQuickReply('Show me museum revenue and booking statistics')">
                <span>📊 Museum Stats</span>
            </button>
            <button class="quick-reply-btn" onclick="sendQuickReply('Show tour performance statistics')">
                <span>🗺️ Tour Performance</span>
            </button>
            <button class="quick-reply-btn" onclick="sendQuickReply('Show event attendance and revenue')">
                <span>🎭 Event Stats</span>
            </button>
        </div>`;
  }
}

// Password Enter key support 
document.addEventListener("DOMContentLoaded", () => {
  const pwdInput = document.getElementById("adminPassword");
  if (pwdInput) {
    pwdInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") verifyAdmin();
    });
  }
});

// Load museum data from Node.js server 
async function loadMuseumData() {
  try {
    const response = await fetch("http://localhost:3000/api/museum-data");
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Server error ${response.status}: ${errText}`);
    }
    const raw = await response.json();

    // Normalize Data Warehouse field names
    // DW uses MuseumKey, HallKey, etc. — chatbot expects MuseumID, HallID

    raw.museums = (raw.museums || []).map((m) => ({
      MuseumKey: m.MuseumKey,
      MuseumID: m.MuseumID,
      Name: m.Name || m.MuseumName,
      Government: m.Government,
      District: m.District,
      Type: m.Type || m.MuseumType,
      Capacity: m.Capacity,
      OpeningYear: m.OpeningYear,
    }));

    raw.halls = (raw.halls || []).map((h) => ({
      HallKey: h.HallKey,
      HallID: h.HallID,
      MuseumKey: h.MuseumKey,
      Name: h.Name || h.HallName,
      Status: h.Status,
    }));

    raw.artifacts = (raw.artifacts || []).map((a) => ({
      ...a,
      ArtifactID: a.ArtifactKey,
      HallID: a.HallKey,
      Name: a.Name || a.ArtifactName,
    }));

    raw.events = (raw.events || []).map((e) => ({
      ...e,
      EventID: e.EventKey,
      MuseumID: e.MuseumKey,
      Name: e.Name || e.EventName,
      Type: e.Type || e.EventType,
    }));

    raw.tours = (raw.tours || []).map((t) => ({
      TourKey: t.TourKey,
      TourID: t.TourID,
      MuseumID: t.MuseumID,
      MuseumKey: t.MuseumKey,
      Name: t.Name || t.TourName,
      Capacity: t.Capacity,
      MuseumName: t.MuseumName,
    }));

    raw.guides = (raw.guides || []).map((g) => ({
      ...g,
      GuideID: g.GuideKey,
    }));

    raw.museumServices = (raw.museumServices || []).map((s) => ({
      MuseumKey: s.MuseumKey,
      ServiceName: s.ServiceName,
    }));

    // Split DimPricing into 3 separate arrays 
    const pricing = raw.pricing || [];

    raw.museumPricing = pricing
      .filter((p) => p.BookingType === "Museum")
      .map((p) => ({
        MuseumID: p.EntityID,
        TicketType: p.TicketTypeName,
        TicketClass: p.TicketClassName,
        Nationality: p.NationalityCategory,
        BasePrice: p.BasePrice,
        DiscountPercentage: p.DiscountPercentage,
        EntityName: p.EntityName,
      }));

    raw.tourPricing = pricing
      .filter((p) => p.BookingType === "Tour")
      .map((p) => ({
        TourID: p.EntityID,
        TicketType: p.TicketTypeName,
        TicketClass: p.TicketClassName,
        Nationality: p.NationalityCategory,
        BasePricePerHour: p.BasePrice,
        DiscountPercentage: p.DiscountPercentage,
        EntityName: p.EntityName,
      }));

    raw.eventPricing = pricing
      .filter((p) => p.BookingType === "Event")
      .map((p) => ({
        EventID: p.EntityID,
        TicketType: p.TicketTypeName,
        TicketClass: p.TicketClassName,
        Nationality: p.NationalityCategory,
        BasePrice: p.BasePrice,
        DiscountPercentage: p.DiscountPercentage,
        EntityName: p.EntityName,
      }));

    MUSEUM_DATA = raw;

    console.log("Museum data loaded successfully!");
    console.log("Museums count:", MUSEUM_DATA.museums?.length);
    console.log("Pricing count:", MUSEUM_DATA.museumPricing?.length);
    console.log("Tours count:", MUSEUM_DATA.tours?.length);
    console.log("Guides count:", MUSEUM_DATA.guides?.length);
  } catch (error) {
    console.error("Failed to load museum data:", error);
    MUSEUM_DATA = { museums: [] };
  }
}

// Central API call
async function callChatAPI(body) {
  // Hard safety: never send giant prompts again
  const payload = JSON.stringify(body);
  if (payload.length > 180000) {
    throw new Error(
      "Prompt is too large before sending. The chatbot reduced data, but this request is still too big.",
    );
  }

  const response = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || data.error || JSON.stringify(data));
  }
  return data;
}

// Token-safe helpers
function limitArray(arr, max = 8) {
  return Array.isArray(arr) ? arr.slice(0, max) : [];
}

function cleanValue(v) {
  if (v === null || v === undefined || v === "") return undefined;
  return v;
}

function compactObject(obj, allowedKeys) {
  const out = {};
  allowedKeys.forEach(([oldKey, newKey]) => {
    const value = cleanValue(obj?.[oldKey]);
    if (value !== undefined) out[newKey] = value;
  });
  return out;
}

function inferNeededData(text) {
  const q = text.toLowerCase();
  const data = new Set();

  if (/tour|tours|جولة|جولات|تور|مرشد|guide|guides/.test(q)) {
    data.add("tours");
    data.add("tourPricing");
    data.add("guides");
  }
  if (/event|events|فعالية|فعاليات|حدث|ايفنت/.test(q)) {
    data.add("events");
    data.add("eventPricing");
  }
  if (/price|ticket|tickets|cost|سعر|تذكرة|تذاكر|تكلفة/.test(q)) {
    data.add("museumPricing");
  }
  if (/service|services|خدمة|خدمات/.test(q)) data.add("museumServices");
  if (/hall|halls|room|rooms|قاعة|قاعات/.test(q)) data.add("halls");
  if (/artifact|artifacts|piece|تمثال|قطع|قطعة|اثار|آثار/.test(q)) {
    data.add("artifacts");
    data.add("halls");
  }
  if (
    /museum|museums|متحف|متاحف|where|فين|أين|محافظة|city|government/.test(q)
  ) {
    data.add("museums");
  }

  if (data.size === 0) data.add("museums");
  return [...data];
}

function buildCompactData(
  neededData,
  activeMuseumID,
  activeMuseumKey,
  cityFilter,
) {
  const relevantData = {};
  const museums = MUSEUM_DATA.museums || [];
  const normalize = (str) =>
    String(str || "")
      .toLowerCase()
      .trim()
      .replace(/governorate/g, "")
      .replace(/gov/g, "")
      .replace(/\s+/g, " ");

  if (activeMuseumID) {
    const m = museums.find(
      (x) => Number(x.MuseumID) === Number(activeMuseumID),
    );
    if (m) {
      relevantData.museum = compactObject(m, [
        ["MuseumID", "id"],
        ["MuseumKey", "key"],
        ["Name", "name"],
        ["Government", "gov"],
        ["District", "district"],
        ["Type", "type"],
        ["Capacity", "capacity"],
        ["OpeningYear", "openingYear"],
      ]);
    }
  }

  if (neededData.includes("museums") && !activeMuseumID) {
    let filteredMuseums = museums;

    // Filter by city/government if provided
    if (cityFilter) {
      filteredMuseums = museums.filter((m) =>
        normalize(m.Government).includes(normalize(cityFilter)),
      );
    }

    relevantData.museums = limitArray(filteredMuseums, 12).map((m) =>
      compactObject(m, [
        ["MuseumID", "id"],
        ["Name", "name"],
        ["Government", "gov"],
        ["District", "district"],
        ["Type", "type"],
      ]),
    );

    if (cityFilter && filteredMuseums.length === 0) {
      relevantData.note = `No museums found in ${cityFilter} in the database.`;
    }
  }

  if (neededData.includes("museumServices")) {
    relevantData.services = activeMuseumKey
      ? limitArray(
          (MUSEUM_DATA.museumServices || []).filter(
            (s) => Number(s.MuseumKey) === Number(activeMuseumKey),
          ),
          12,
        ).map((s) =>
          compactObject(s, [
            ["ServiceName", "service"],
            ["MuseumName", "museum"],
          ]),
        )
      : [];
  }

  if (neededData.includes("halls")) {
    relevantData.halls = activeMuseumKey
      ? limitArray(
          (MUSEUM_DATA.halls || []).filter(
            (h) => Number(h.MuseumKey) === Number(activeMuseumKey),
          ),
          12,
        ).map((h) =>
          compactObject(h, [
            ["HallID", "id"],
            ["HallKey", "key"],
            ["Name", "name"],
            ["Status", "status"],
          ]),
        )
      : [];
  }

  if (neededData.includes("artifacts")) {
    if (activeMuseumKey) {
      const halls = (MUSEUM_DATA.halls || []).filter(
        (h) => Number(h.MuseumKey) === Number(activeMuseumKey),
      );

      const hallKeys = halls.map((h) => Number(h.HallKey));
      const hallIDs = halls.map((h) => Number(h.HallID));

      relevantData.artifacts = limitArray(
        (MUSEUM_DATA.artifacts || []).filter(
          (a) =>
            hallKeys.includes(Number(a.HallKey)) ||
            hallIDs.includes(Number(a.HallID)),
        ),
        12,
      ).map((a) =>
        compactObject(a, [
          ["ArtifactID", "id"],
          ["ArtifactKey", "key"],
          ["Name", "name"],
          ["Category", "cat"],
          ["Era", "era"],
          ["Condition", "condition"],
          ["HallName", "hall"],
        ]),
      );
    } else {
      relevantData.artifacts = [];
    }
  }

  if (neededData.includes("museumPricing")) {
    relevantData.museumPricing = activeMuseumID
      ? limitArray(
          (MUSEUM_DATA.museumPricing || []).filter(
            (p) => Number(p.MuseumID) === Number(activeMuseumID),
          ),
          20,
        ).map((p) =>
          compactObject(p, [
            ["TicketType", "type"],
            ["TicketClass", "class"],
            ["Nationality", "nat"],
            ["BasePrice", "price"],
            ["DiscountPercentage", "disc"],
            ["Discount", "disc"],
          ]),
        )
      : [];

    if (!activeMuseumID) {
      relevantData.note =
        "Ask which museum before giving museum ticket prices.";
    }
  }

  if (neededData.includes("events")) {
    relevantData.events = limitArray(
      (MUSEUM_DATA.events || []).filter(
        (e) =>
          !activeMuseumID ||
          Number(e.MuseumID) === Number(activeMuseumID) ||
          Number(e.MuseumKey) === Number(activeMuseumKey),
      ),
      10,
    ).map((e) =>
      compactObject(e, [
        ["EventID", "id"],
        ["EventKey", "key"],
        ["Name", "name"],
        ["Type", "type"],
        ["Capacity", "capacity"],
        ["MuseumName", "museum"],
      ]),
    );
  }

  if (neededData.includes("eventPricing")) {
    const eventIDs = (MUSEUM_DATA.events || [])
      .filter(
        (e) =>
          !activeMuseumID ||
          Number(e.MuseumID) === Number(activeMuseumID) ||
          Number(e.MuseumKey) === Number(activeMuseumKey),
      )
      .map((e) => Number(e.EventID));

    relevantData.eventPricing = limitArray(
      (MUSEUM_DATA.eventPricing || []).filter((p) =>
        eventIDs.includes(Number(p.EventID)),
      ),
      20,
    ).map((p) =>
      compactObject(p, [
        ["EventID", "eventId"],
        ["EntityName", "event"],
        ["EventName", "event"],
        ["TicketType", "type"],
        ["TicketClass", "class"],
        ["Nationality", "nat"],
        ["BasePrice", "price"],
        ["DiscountPercentage", "disc"],
        ["Discount", "disc"],
      ]),
    );
  }

  if (neededData.includes("tours")) {
    relevantData.tours = limitArray(
      (MUSEUM_DATA.tours || []).filter(
        (t) =>
          !activeMuseumID ||
          Number(t.MuseumID) === Number(activeMuseumID) ||
          Number(t.MuseumKey) === Number(activeMuseumKey),
      ),
      10,
    ).map((t) =>
      compactObject(t, [
        ["TourID", "id"],
        ["TourKey", "key"],
        ["Name", "name"],
        ["Capacity", "capacity"],
        ["MuseumName", "museum"],
      ]),
    );
  }

  if (neededData.includes("tourPricing")) {
    const tourIDs = (MUSEUM_DATA.tours || [])
      .filter(
        (t) =>
          !activeMuseumID ||
          Number(t.MuseumID) === Number(activeMuseumID) ||
          Number(t.MuseumKey) === Number(activeMuseumKey),
      )
      .map((t) => Number(t.TourID));

    relevantData.tourPricing = limitArray(
      (MUSEUM_DATA.tourPricing || []).filter((p) =>
        tourIDs.includes(Number(p.TourID)),
      ),
      20,
    ).map((p) =>
      compactObject(p, [
        ["TourID", "tourId"],
        ["EntityName", "tour"],
        ["TourName", "tour"],
        ["TicketType", "type"],
        ["TicketClass", "class"],
        ["Nationality", "nat"],
        ["BasePricePerHour", "pricePerHour"],
        ["DiscountPercentage", "disc"],
        ["Discount", "disc"],
      ]),
    );
  }

  if (neededData.includes("guides")) {
    relevantData.guides = limitArray(MUSEUM_DATA.guides || [], 10).map((g) =>
      compactObject(g, [
        ["GuideID", "id"],
        ["GuideKey", "key"],
        ["FullName", "name"],
        ["Languages", "langs"],
        ["ExperienceYears", "exp"],
        ["CertificationLevel", "cert"],
        ["ContractType", "contract"],
      ]),
    );
  }

  return relevantData;
}

function buildCompactAdminData(userText) {
  const q = userText.toLowerCase();
  const adminData = {};

  if (/tour|جولة|تور/.test(q)) {
    adminData.tourStats = limitArray(MUSEUM_DATA.tourStats || [], 15).map((x) =>
      compactObject(x, [
        ["TourName", "tour"],
        ["MuseumName", "museum"],
        ["TotalBookings", "bookings"],
        ["TotalParticipants", "participants"],
        ["TotalRevenue", "revenue"],
        ["AvgTourPrice", "avgPrice"],
      ]),
    );
  } else if (/event|فعالية|حدث|ايفنت/.test(q)) {
    adminData.eventStats = limitArray(MUSEUM_DATA.eventStats || [], 15).map(
      (x) =>
        compactObject(x, [
          ["EventName", "event"],
          ["EventType", "type"],
          ["MuseumName", "museum"],
          ["TotalBookings", "bookings"],
          ["TotalAttendees", "attendees"],
          ["TotalRevenue", "revenue"],
          ["AvgEventPrice", "avgPrice"],
        ]),
    );
  } else if (/guide|مرشد|language|لغة/.test(q)) {
    adminData.guides = limitArray(MUSEUM_DATA.guides || [], 15).map((g) =>
      compactObject(g, [
        ["FullName", "name"],
        ["Languages", "langs"],
        ["ExperienceYears", "exp"],
        ["CertificationLevel", "cert"],
        ["ContractType", "contract"],
      ]),
    );
  } else {
    const museums = MUSEUM_DATA.museums || [];
    const stats = MUSEUM_DATA.museumStats || [];

    adminData.museumStats = museums.map((m) => {
      const stat = stats.find(
        (s) =>
          Number(s.MuseumKey) === Number(m.MuseumKey) ||
          String(s.MuseumName || "").toLowerCase() ===
            String(m.Name || "").toLowerCase(),
      );

      return {
        museum: m.Name,
        gov: m.Government,
        bookings: stat ? stat.TotalBookings : 0,
        visitors: stat ? stat.TotalVisitors : 0,
        revenue: stat ? stat.TotalRevenue : 0,
        avgPrice: stat ? stat.AvgTicketPrice : 0,
        discounts: stat ? stat.TotalDiscounts : 0,
      };
    });

    adminData.summary = {
      totalMuseums: museums.length,
      totalBookings: adminData.museumStats.reduce(
        (sum, m) => sum + Number(m.bookings || 0),
        0,
      ),
      totalRevenue: adminData.museumStats.reduce(
        (sum, m) => sum + Number(m.revenue || 0),
        0,
      ),
    };

    return adminData;
  }
}

function normalizeText(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/governorate/g, "")
    .replace(/gov/g, "")
    .replace(/\s+/g, " ");
}

async function findCityFilterAI(userText) {
  const museums = MUSEUM_DATA?.museums || [];

  const governments = [
    ...new Set(museums.map((m) => m.Government).filter(Boolean)),
  ];

  if (governments.length === 0) return null;

  const data = await callChatAPI({
    model: "gpt-4o-mini",
    max_tokens: 20,
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `Extract the city/government from the user message.
                    Choose ONLY ONE exact value from this list:
                    ${JSON.stringify(governments)}

                    If no city/government is mentioned, reply ONLY: NONE.
                    Reply with the exact value only.`,
      },
      {
        role: "user",
        content: userText,
      },
    ],
  });

  const result = data.choices[0].message.content.trim();

  if (result.toUpperCase() === "NONE") return null;

  const matched = governments.find(
    (g) => normalizeText(g) === normalizeText(result),
  );

  return matched || null;
}

// Build system prompt
async function buildSystemPrompt(userText) {
  if (
    !MUSEUM_DATA ||
    !MUSEUM_DATA.museums ||
    MUSEUM_DATA.museums.length === 0
  ) {
    return "You are KEMET Assistant. Data is still loading.";
  }

  const visitorLanguage =
    detectLanguage(userText) === "arabic" ? "Arabic" : "English";

  if (currentMode === "admin") {
    const adminData = buildCompactAdminData(userText);

    return `You are KEMET Admin Assistant.
        Reply in ${visitorLanguage}.
        Use ONLY this warehouse data.

        Never calculate totals yourself.
        Use ONLY DATA.summary values for totals.

        All revenue values are in Egyptian Pounds (EGP), never use $ or USD.
        Always display currency ONLY as EGP.
        Never write جنيه مصري.

        If the user asks for a summary, use DATA.summary.
        If the user asks for details, show museumStats records one by one.

        DATA=${JSON.stringify(adminData)}`;
  }

  const activeMuseum = findMuseumFromText(userText);
  const activeMuseumID = activeMuseum?.MuseumID || null;
  const activeMuseumKey = activeMuseum?.MuseumKey || null;
  const neededData = inferNeededData(userText);
  const cityFilter = await findCityFilterAI(userText);

  const relevantData = buildCompactData(
    neededData,
    activeMuseumID,
    activeMuseumKey,
    cityFilter,
  );

  return `You are KEMET Assistant for Egyptian museums.
    Reply only in ${visitorLanguage}.
    Use ONLY DATA.
    Do NOT use external knowledge.
    Do NOT add historical facts, famous artifacts, assumptions, or general world knowledge unless explicitly present in DATA.
    Keep answer short, max 5 items.
    If price is requested and museum/type/nationality is missing, ask one question.

    DATA=${JSON.stringify(relevantData)}`;
}

// ── Guardian — blocks off-topic questions
async function isMuseumRelated(text) {
  if (currentMode === "admin") return true;

  const quickReplyTexts = [
    "Tell me about available tours",
    "What events are happening?",
    "I need a guide",
    "Show me museum revenue and booking statistics",
    "Show tour performance statistics",
    "Show event attendance and revenue",
  ];
  if (quickReplyTexts.includes(text)) return true;
  // Local bypass for obvious museum-related keywords and common greetings
  const q = text.toLowerCase().trim();
  const obviousMuseumPatterns = [
    // English keywords
    /\b(tour|guide|museum|event|ticket|price|cost|capacity|booking|hello|hi|welcome|hey|morning|evening)\b/i,
    // Arabic roots/keywords
    /جول/, // جولة، جولات، الجولة، الجولات
    /متحف/, // متحف، متاحف، المتحف، المتاحف
    /مرشد/, // مرشد، مرشدين، المرشد، المرشدين
    /دليل/, // دليل، الدليل
    /فعال/, // فعالية، فعاليات، الفعالية، الفعاليات
    /حدث/, // حدث، أحداث، الحدث، الأحداث
    /ايفنت/, // ايفنت، ايفنتات
    /تذكر/, // تذكرة، تذاكر، التذكرة، التذاكر
    /سعر/, // سعر، أسعار، السعر، الأسعار
    /تكلف/, // تكلفة، تكاليف، التكلفة
    /بكام/, // بكام
    /رحل/, // رحلة، رحلات، الرحلة، الرحلات
    /أهلا/, // أهلاً، أهلا
    /اهلا/, // اهلا
    /مرحب/, // مرحباً، مرحبا، مرحب
    /سلام/, // سلام، السلام
  ];

  if (obviousMuseumPatterns.some((pattern) => pattern.test(q))) {
    return true;
  }
  const contextHint =
    conversationHistory.length > 0
      ? "The visitor is already in a conversation about Egyptian museums. Allow follow-up questions and clarifications even if they seem off-topic in isolation."
      : "This is the visitor's FIRST message. Only allow museum-related topics or greetings.";

  try {
    const data = await callChatAPI({
      model: "gpt-4o-mini",
      max_tokens: 10,
      messages: [
        {
          role: "system",
          content: `You are a guardian for a Museums of Egypt chatbot.
                                ${contextHint}
                                Block ONLY clearly unrelated topics: weather forecasts, sports scores, cooking recipes, politics, or requests to write code.
                                Reply ONLY: YES (allow) or NO (block).`,
        },
        { role: "user", content: text },
      ],
    });
    return data.choices[0].message.content.trim().toUpperCase() === "YES";
  } catch (error) {
    console.error("Guardian failed:", error);
    return true;
  }
}

function isMuseumTicketPriceIntent(text) {
  const q = text.toLowerCase();

  const asksPrice = /(price|cost|سعر|اسعار|أسعار|تكلفة|بكام|كام)/i.test(q);

  const isTour = /(tour|tours|جولة|جولات|تور)/i.test(q);

  const isEvent = /(event|events|فعالية|فعاليات|حدث|ايفنت)/i.test(q);

  const isMuseumTicket = /(ticket|tickets|تذكرة|تذاكر)/i.test(q);

  return asksPrice && isMuseumTicket && !isTour && !isEvent;
}

function detectNationality(text) {
  const q = text.toLowerCase();

  if (/(مصري|مصرية|egyptian)/.test(q)) {
    return "Egyptian";
  }

  if (/(اجنبي|أجنبي|اجنبية|أجنبية|foreigner|foreign)/.test(q)) {
    return "Foreigner";
  }

  return null;
}

function detectTicketType(text) {
  const q = text.toLowerCase();

  if (/(student|طالب|طالبة)/.test(q)) {
    return "Student";
  }

  if (/(child|kid|طفل|اطفال|أطفال)/.test(q)) {
    return "Child";
  }

  if (/(adult|بالغ|كبير)/.test(q)) {
    return "Adult";
  }

  return null;
}

function detectTicketClass(text) {
  const q = text.toLowerCase();

  if (/(vip|في اي بي)/.test(q)) {
    return "VIP";
  }

  if (/(premium|بريميوم)/.test(q)) {
    return "Premium";
  }

  if (/(regular|عادي|عادية)/.test(q)) {
    return "Regular";
  }

  return null;
}

function findMuseumFromText(text) {
  const q = text.toLowerCase();
  const museums = MUSEUM_DATA?.museums || [];

  // Exact / partial museum name match
  let found = museums.find((m) => {
    const name = String(m.Name || "").toLowerCase();
    return name && (q.includes(name) || name.includes(q));
  });

  // Fallback fuzzy search
  if (!found) {
    const words = q.split(/\s+/).filter((w) => w.length >= 4);

    found = museums.find((m) => {
      const name = String(m.Name || "").toLowerCase();
      return words.some((w) => name.includes(w));
    });
  }

  if (!found) return null;

  return {
    MuseumID: found.MuseumID,
    MuseumKey: found.MuseumKey,
    Name: found.Name,
    Government: found.Government,
    Type: found.Type,
  };
}

function detectEntityFromText(text) {
  const q = text.toLowerCase();

  // Tours
  const tour = (MUSEUM_DATA.tours || []).find((t) => {
    const name = String(t.Name || "").toLowerCase();
    return name && q.includes(name);
  });

  if (tour) {
    return {
      type: "tour",
      id: tour.TourID,
      name: tour.Name,
    };
  }

  // Events
  const event = (MUSEUM_DATA.events || []).find((e) => {
    const name = String(e.Name || "").toLowerCase();
    return name && q.includes(name);
  });

  if (event) {
    return {
      type: "event",
      id: event.EventID,
      name: event.Name,
    };
  }

  // Museums
  const museum = (MUSEUM_DATA.museums || []).find((m) => {
    const name = String(m.Name || "").toLowerCase();
    return name && q.includes(name);
  });

  if (museum) {
    return {
      type: "museum",
      id: museum.MuseumID,
      key: museum.MuseumKey,
      name: museum.Name,
    };
  }

  return null;
}

function isEntityPriceIntent(text) {
  const q = text.toLowerCase();

  return /(price|cost|سعر|اسعار|أسعار|تكلفة|بكام|كام)/i.test(q);
}

function askMissingPriceSlot(lang) {
  const isArabic = lang === "arabic";

  if (!pendingSlots.museum) {
    addMessage(
      isArabic ? "أي متحف تقصدي؟" : "Which museum do you mean?",
      "assistant",
    );
    return true;
  }

  if (!pendingSlots.nationality) {
    addMessage(
      isArabic
        ? "ما هي جنسيتك؟ مصرية أم أجنبية؟"
        : "What is your nationality? Egyptian or foreigner?",
      "assistant",
    );
    return true;
  }

  if (!pendingSlots.ticketType) {
    addMessage(
      isArabic
        ? "ما نوع التذكرة؟ بالغ، طالب، أم طفل؟"
        : "What ticket type? Adult, student, or child?",
      "assistant",
    );
    return true;
  }

  if (!pendingSlots.ticketClass) {
    addMessage(
      isArabic
        ? "ما فئة التذكرة؟ Regular ولا Premium ولا VIP؟"
        : "What ticket class? Regular, Premium, or VIP?",
      "assistant",
    );
    return true;
  }

  return false;
}

function answerMuseumTicketPrice() {
  const pricing = MUSEUM_DATA.museumPricing || [];
  const museum = pendingSlots.museum;

  const matches = pricing.filter(
    (p) =>
      Number(p.MuseumID) === Number(museum.MuseumID) &&
      String(p.Nationality).toLowerCase() ===
        pendingSlots.nationality.toLowerCase() &&
      String(p.TicketType).toLowerCase() ===
        pendingSlots.ticketType.toLowerCase() &&
      String(p.TicketClass).toLowerCase() ===
        pendingSlots.ticketClass.toLowerCase(),
  );

  if (matches.length === 0) {
    addMessage(
      "عذرًا، لا يوجد سعر مطابق لهذه الاختيارات في قاعدة البيانات.",
      "assistant",
    );
  } else {
    const p = matches[0];

    addMessage(
      `سعر تذكرة ${p.TicketType} - ${p.TicketClass}
            للزائر ${p.Nationality}
            في ${museum.Name}
            هو ${p.BasePrice} جنيه.`,
      "assistant",
    );
  }

  pendingIntent = null;

  pendingSlots = {
    museum: null,
    nationality: null,
    ticketType: null,
    ticketClass: null,
  };
}

function answerEntityPriceFromData(lang) {
  const isArabic = lang === "arabic";
  const e = lastMentionedEntity;

  let prices = [];
  let title = "";

  if (e.type === "museum") {
    prices = (MUSEUM_DATA.museumPricing || []).filter(
      (p) => Number(p.MuseumID) === Number(e.id),
    );

    title = isArabic
      ? `أسعار تذاكر ${e.name}:`
      : `Ticket prices for ${e.name}:`;
  }

  if (e.type === "tour") {
    prices = (MUSEUM_DATA.tourPricing || []).filter(
      (p) => Number(p.TourID) === Number(e.id),
    );

    title = isArabic ? `أسعار جولة ${e.name}:` : `Prices for ${e.name}:`;
  }

  if (e.type === "event") {
    prices = (MUSEUM_DATA.eventPricing || []).filter(
      (p) => Number(p.EventID) === Number(e.id),
    );

    title = isArabic ? `أسعار فعالية ${e.name}:` : `Prices for ${e.name}:`;
  }

  if (prices.length === 0) {
    addMessage(
      isArabic
        ? "عذرًا، لا يوجد سعر مسجل لهذا العنصر في قاعدة البيانات."
        : "Sorry, there is no price recorded for this item in the database.",
      "assistant",
    );
    return;
  }

  const lines = prices
    .map((p) => {
      const price =
        p.BasePricePerHour !== undefined ? p.BasePricePerHour : p.BasePrice;

      return isArabic
        ? `- ${p.TicketType} - ${p.TicketClass} - ${p.Nationality}: ${price} جنيه`
        : `- ${p.TicketType} - ${p.TicketClass} - ${p.Nationality}: ${price} EGP`;
    })
    .join("\n");

  addMessage(`${title}\n${lines}`, "assistant");
}

function isGuideFollowUp(text) {
  const q = text.toLowerCase();

  if (!lastMentionedGuide) return false;

  return (
    q.includes(String(lastMentionedGuide.FullName || "").toLowerCase()) ||
    /(more|details|info|information|about|المزيد|تفاصيل|معلومات|عنها|عنه|عليها|عليه)/i.test(
      q,
    )
  );
}

function answerGuideDetails(lang) {
  const isArabic = lang === "arabic";
  const g = lastMentionedGuide;

  addMessage(
    isArabic
      ? `معلومات المرشد ${g.FullName}:\n- اللغات: ${g.Languages || "غير متاح"}\n- الخبرة: ${g.ExperienceYears || "غير متاح"} سنة\n- مستوى الشهادة: ${g.CertificationLevel || "غير متاح"}\n- نوع العقد: ${g.ContractType || "غير متاح"}`
      : `Guide details for ${g.FullName}:\n- Languages: ${g.Languages || "N/A"}\n- Experience: ${g.ExperienceYears || "N/A"} years\n- Certification: ${g.CertificationLevel || "N/A"}\n- Contract type: ${g.ContractType || "N/A"}`,
    "assistant",
  );
}

// Send message
async function sendMessage() {
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const messagesDiv = document.getElementById("messages");

  const userText = input.value.trim();
  if (!userText) return;

  if (
    !MUSEUM_DATA ||
    !MUSEUM_DATA.museums ||
    MUSEUM_DATA.museums.length === 0
  ) {
    addMessage("Still loading museum data, please wait...", "assistant");
    return;
  }

  const quickReplies = document.getElementById("quickReplies");
  if (quickReplies) quickReplies.style.display = "none";

  addMessage(userText, "user");
  input.value = "";

  sendBtn.classList.add("send-btn-loading");
  sendBtn.textContent = "...";
  showTyping();

  // Local guide follow-up 
  if (currentMode === "visitor" && isGuideFollowUp(userText)) {
    hideTyping();
    answerGuideDetails(detectLanguage(userText));

    sendBtn.classList.remove("send-btn-loading");
    sendBtn.textContent = "Send";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return;
  }

  // Local entity price follow-up
  if (currentMode === "visitor" && isEntityPriceIntent(userText)) {
    const detectedEntity =
      detectEntityFromText(userText) || lastMentionedEntity;

    if (detectedEntity) {
      lastMentionedEntity = detectedEntity;
      hideTyping();

      answerEntityPriceFromData(detectLanguage(userText));

      sendBtn.classList.remove("send-btn-loading");
      sendBtn.textContent = "Send";
      messagesDiv.scrollTop = messagesDiv.scrollHeight;

      return;
    }
  }
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // Local dynamic ticket price flow
  if (
    currentMode === "visitor" &&
    (isMuseumTicketPriceIntent(userText) ||
      pendingIntent === "museum_ticket_price")
  ) {
    pendingIntent = "museum_ticket_price";

    const foundMuseum = findMuseumFromText(userText);
    const nationality = detectNationality(userText);
    const ticketType = detectTicketType(userText);
    const ticketClass = detectTicketClass(userText);

    if (foundMuseum) pendingSlots.museum = foundMuseum;
    if (nationality) pendingSlots.nationality = nationality;
    if (ticketType) pendingSlots.ticketType = ticketType;
    if (ticketClass) pendingSlots.ticketClass = ticketClass;

    hideTyping();

    const stillMissing = askMissingPriceSlot(detectLanguage(userText));

    if (!stillMissing) {
      answerMuseumTicketPrice();
    }

    sendBtn.classList.remove("send-btn-loading");
    sendBtn.textContent = "Send";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return;
  }

  let allowed = true;

  const lastAssistant =
    conversationHistory[conversationHistory.length - 1]?.content || "";

  const shortReply = userText.trim().split(/\s+/).length <= 4;

  const expectingFollowUp =
    lastAssistant.toLowerCase().includes("which") ||
    lastAssistant.toLowerCase().includes("language") ||
    lastAssistant.toLowerCase().includes("guide") ||
    lastAssistant.toLowerCase().includes("museum") ||
    lastAssistant.toLowerCase().includes("tour") ||
    lastAssistant.includes("?") ||
    lastAssistant.includes("؟");

  if (!(expectingFollowUp && shortReply)) {
    allowed = await isMuseumRelated(userText);
  }

  if (!allowed) {
    hideTyping();
    sendBtn.classList.remove("send-btn-loading");
    sendBtn.textContent = "Send";

    const lang = detectLanguage(userText);
    const refusalMsg =
      lang === "arabic"
        ? "عذراً، أنا متخصص فقط في متاحف مصر. يمكنني مساعدتك في المتاحف، التذاكر، الجولات، الفعاليات، والمرشدين!"
        : "I'm sorry, I can only help with questions related to the Museums of Egypt. Feel free to ask about museums, tickets, tours, events, or guides!";

    addMessage(refusalMsg, "assistant");
    return;
  }

  conversationHistory.push({ role: "user", content: userText });

  try {
    const systemPrompt = await buildSystemPrompt(userText);
    const recentConversation = conversationHistory.slice(-4);
    let message = [
      { role: "system", content: systemPrompt },
      ...recentConversation,
    ];
    console.log("Message:", message);

    const data = await callChatAPI({
      model: "gpt-4o-mini",
      max_tokens: 1000,
      temperature: 0.2,
      messages: [
        { role: "system", content: systemPrompt },
        ...recentConversation,
      ],
    });

    if (!data.choices || data.choices.length === 0) {
      throw new Error("No response: " + JSON.stringify(data));
    }

    const reply = data.choices[0].message.content;
    console.log("AI reply:", data);

    hideTyping();
    addMessage(reply, "assistant");
    conversationHistory.push({ role: "assistant", content: reply });
    rememberEntityFromReply(reply);

    if (conversationHistory.length > 8) {
      conversationHistory.splice(0, conversationHistory.length - 8);
    }
  } catch (error) {
    hideTyping();
    addMessage("Error: " + error.message, "assistant");
  }

  sendBtn.classList.remove("send-btn-loading");
  sendBtn.textContent = "Send";
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Enter key to send
document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

// Start: load data on page open 
loadMuseumData();
