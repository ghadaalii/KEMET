# 🏛️ KEMET Data Warehouse (DWH)

## 📖 Overview
The **KEMET Data Warehouse (DWH)** serves as the analytical backbone of the KEMET Egyptian Museums Management & Analytics Platform. It integrates museum operations data into a centralized warehouse optimized for reporting, business intelligence, and advanced analytics.

The warehouse follows a **Galaxy Schema (Fact Constellation)** design to support analysis across museum bookings, tours, events, visitors, guides, and revenue streams.

---

## 🎯 Objectives

- Centralize museum operational data.
- Enable efficient analytical querying.
- Support Power BI dashboards and SSRS reports.
- Track visitor behavior and revenue performance.
- Preserve historical data for trend analysis.
- Provide a scalable foundation for business intelligence.

---

## 🏗️ Data Warehouse Architecture

```text
OLTP Database
      │
      ▼
ETL Process (SSIS)
      │
      ▼
KEMET Data Warehouse
      │
      ├── Fact Tables
      ├── Dimension Tables
      └── Bridge Tables
      │
      ▼
Power BI / SSRS / Analytics
```

---

## 📊 Fact Tables

### FactMuseumBooking
Stores museum ticket booking transactions.

**Measures**
- Revenue
- Tickets Sold
- Discount Amount
- Net Revenue

### FactTourBooking
Stores guided tour booking transactions.

**Measures**
- Tour Revenue
- Occupancy Rate
- Tour Duration
- Tickets Sold

### FactEventBooking
Stores event reservation and attendance transactions.

**Measures**
- Event Revenue
- Attendance
- Ticket Quantity
- Capacity Utilization

---

## 📂 Dimension Tables

| Dimension | Description |
|------------|-------------|
| DimDate | Calendar and time intelligence attributes |
| DimTime | Hourly analysis attributes |
| DimMuseum | Museum information and metadata |
| DimVisitor | Visitor demographics and segmentation |
| DimTicket | Ticket type and class details |
| DimPricing | Pricing and discount information |
| DimPayment | Payment method and status |
| DimGuide | Guide information |
| DimLanguage | Supported tour languages |
| DimHall | Museum halls and capacities |
| DimArtifact | Cultural heritage artifacts |

---

## 🔗 Bridge Tables

### BridgeGuideLanguage
Manages the many-to-many relationship between guides and languages.

### BridgeMuseumService
Manages the many-to-many relationship between museums and available services.

---

## ⭐ Schema Design

The warehouse implements a **Galaxy Schema** where multiple fact tables share common dimensions.

### Shared Dimensions
- DimDate
- DimTime
- DimMuseum
- DimVisitor
- DimTicket
- DimPricing
- DimPayment

### Specialized Dimensions
- DimGuide
- DimLanguage
- DimHall
- DimArtifact

---

## 🔄 ETL Process

The ETL pipeline was developed using **SQL Server Integration Services (SSIS)**.

### ETL Workflow

1. Extract data from the OLTP database.
2. Clean and validate source data.
3. Apply lookup transformations.
4. Generate surrogate keys.
5. Handle Slowly Changing Dimensions (SCD).
6. Load dimension tables.
7. Load fact tables.
8. Execute validation and quality checks.

---

## 📈 Supported Analytics

The Data Warehouse powers:

- Executive Dashboard
- Revenue Analysis
- Visitor Segmentation
- Museum Performance
- Tour Analytics
- Event Analytics
- Nationality Behavior
- Language Coverage
- Group Experience
- Payment Behavior
- Hall Utilization
- Cultural Heritage Insights
- Loyalty & Repeat Visitors
- Crowd Control Monitoring

