# 🔄 KEMET ETL Process (SSIS)

## 📖 Overview

The ETL layer of the **KEMET Egyptian Museums Management & Analytics Platform** was developed using **SQL Server Integration Services (SSIS)** to extract, transform, and load data from the operational database into the Data Warehouse.

The ETL process ensures data consistency, quality, and historical tracking while preparing analytical data for reporting and visualization tools such as Power BI and SSRS.

---

## 🎯 Objectives

- Extract data from the OLTP database.
- Clean and validate source data.
- Transform business data into analytical structures.
- Generate surrogate keys.
- Implement Slowly Changing Dimensions (SCD).
- Load Dimension and Fact tables into the Data Warehouse.
- Ensure data quality and integrity.

---

## 🏗️ ETL Architecture

```text
OLTP Database
      │
      ▼
Extract
      │
      ▼
Transform
      │
      ├── Data Cleansing
      ├── Data Validation
      ├── Lookup Transformations
      ├── Business Rules
      └── Surrogate Key Generation
      │
      ▼
Load
      │
      ├── Dimension Tables
      ├── Bridge Tables
      └── Fact Tables
      │
      ▼
KEMET Data Warehouse
```

---

## 📂 ETL Packages

### Dimension Packages

- Load DimDate
- Load DimTime
- Load DimMuseum
- Load DimVisitor
- Load DimTicket
- Load DimPricing
- Load DimPayment
- Load DimGuide
- Load DimLanguage
- Load DimHall
- Load DimArtifact

---

### Bridge Packages

- Load BridgeGuideLanguage
- Load BridgeMuseumService

---

### Fact Packages

- Load FactMuseumBooking
- Load FactTourBooking
- Load FactEventBooking

---

## 🔄 ETL Workflow

### 1. Extract

Data is extracted from the KEMET operational database, including:

- Museums
- Visitors
- Bookings
- Tours
- Events
- Guides
- Languages
- Payments
- Tickets
- Artifacts

---

### 2. Transform

Transformation processes include:

#### Data Cleansing

- Remove invalid records
- Handle missing values
- Standardize formats

#### Data Validation

- Validate foreign keys
- Verify business rules
- Check data completeness

#### Lookup Transformations

- Match business keys with surrogate keys
- Resolve dimension references

#### Business Logic

- Revenue calculations
- Discount calculations
- Occupancy calculations
- Ticket categorization

#### Surrogate Key Generation

- Create warehouse-friendly dimension keys

---

### 3. Load

Data is loaded into:

#### Dimensions First

- Date
- Time
- Museum
- Visitor
- Ticket
- Pricing
- Payment
- Guide
- Language
- Hall
- Artifact

#### Bridge Tables

- Guide-Language
- Museum-Service

#### Fact Tables

- Museum Booking Facts
- Tour Booking Facts
- Event Booking Facts

---

## 🧠 Slowly Changing Dimensions (SCD)

The ETL process supports historical tracking using SCD techniques.

### Implemented For

- Visitor Information
- Museum Information
- Guide Information
- Pricing Information

### Benefits

- Historical analysis
- Change tracking
- Accurate reporting over time

---

## ✅ Data Quality Checks

The ETL process performs:

- Null validation
- Duplicate detection
- Data type validation
- Referential integrity checks
- Revenue validation
- Record count verification

---

## 📊 Output

The ETL pipeline populates the KEMET Data Warehouse, which powers:

- Power BI Dashboards
- SSRS Reports
- Business Analytics
- KPI Monitoring
- Executive Reporting

---

## 🛠️ Technologies Used

- SQL Server
- SQL Server Integration Services (SSIS)
- Data Warehouse Modeling
- ETL Development
- SQL

---

## 📌 Key Features

- Automated ETL workflow
- Incremental loading strategy
- Surrogate key generation
- Lookup transformations
- Data validation and cleansing
- Slowly Changing Dimension support
- Fact and Dimension loading
- Scalable architecture

