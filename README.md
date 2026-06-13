# 🏛️ KEMET – Egyptian Museums Management & Analytics Platform

<div align="center">

### Transforming Egyptian Museum Operations into Actionable Insights

End-to-End Business Intelligence Solution for Egyptian Museums

![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white)
![SSIS](https://img.shields.io/badge/SSIS-0078D4?style=for-the-badge)
![SSRS](https://img.shields.io/badge/SSRS-CC2927?style=for-the-badge)
![Power BI](https://img.shields.io/badge/Power%20BI-F2C811?style=for-the-badge&logo=powerbi&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

<br>

### 🇪🇬 Preserving History Through Data

An Enterprise-Scale Business Intelligence Platform Designed to Analyze, Monitor, and Optimize Egyptian Museum Operations.

</div>

---

# 👥 Project Team

<div align="center">

| Team Member | GitHub | LinkedIn | Email |
|:---:|:---:|:---:|:---:|
| **Shrouk Ehab** | <a href="https://github.com/shroukehabsabry"><img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github"></a> | — | — |
| **Nouran Yasser** | <a href="https://github.com/nouranyasser"><img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github"></a> | <a href="https://www.linkedin.com/in/nouran-yasser-582450280"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin"></a> | <a href="mailto:nourany743@gmail.com"><img src="https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail"></a> |
| **Noha Ahmed** | <a href="https://github.com/NohaAhmed238"><img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github"></a> | <a href="https://www.linkedin.com/in/noha-ahmed-98798a2a3/"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin"></a> | <a href="mailto:nohaahmed.eng@gmail.com"><img src="https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail"></a> |
| **Ghada Ali** | <a href="https://github.com/ghadaalii"><img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github"></a> | <a href="https://www.linkedin.com/in/ghadaabobakr/"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin"></a> | <a href="mailto:ghadaabobakrr@gmail.com"><img src="https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail"></a> |
| **Basmala Khaled** | <a href="https://github.com/Basmalakh22"><img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github"></a> | <a href="https://www.linkedin.com/in/basmalakha22"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin"></a> | <a href="mailto:basmalakha772@gmail.com"><img src="https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail"></a> |

</div>
---

# 📖 Overview

KEMET is an end-to-end Business Intelligence and Analytics platform developed to support Egyptian museums through data-driven decision-making.

The project simulates a nationwide museum ecosystem covering:

- Museum Operations
- Visitor Management
- Guided Tours
- Cultural Events
- Museum Artifacts
- Museum Halls
- Pricing Strategies
- Revenue Tracking
- Payment Analysis
- Operational Performance

The platform transforms raw operational data into strategic business insights through a complete BI pipeline.

---

# 🎯 Project Objectives

- Centralize museum operational data.
- Analyze visitor demographics and behavior.
- Monitor museum performance.
- Measure revenue and profitability.
- Track event and tour success.
- Improve operational efficiency.
- Support strategic decision-making.
- Enable self-service analytics.
- Provide AI-powered natural language insights.

---

# 🏗️ Solution Architecture

```text
Generated Data
       │
       ▼
SQL Server OLTP Database
       │
       ▼
SSIS ETL Process
       │
       ▼
Data Warehouse
(Galaxy + Snowflake Schema)
       │
 ┌─────┼─────┐
 ▼     ▼     ▼
SSRS  Power BI  AI Chatbot
Reports Dashboards Analytics
```

---

# 📂 Repository Structure

```text
KEMET
│
├── Data
│   ├── Generated Datasets
│   ├── Data Dictionary
│   └── Documentation
│
├── ERD
│   ├── Final ERD
│   └── Database Design
│
├── Mapping
│   ├── Source-To-Target Mapping
│   └── ETL Documentation
│
├── DWH
│   ├── Galaxy Schema
│   ├── Snowflake Schema
│   ├── Fact Tables
│   ├── Dimension Tables
│   └── Bridge Tables
│
├── SSIS
│   ├── ETL Packages
│   ├── Fact Loads
│   ├── Dimension Loads
│   └── SCD Processes
│
├── SSRS
│   ├── Operational Reports
│   └── Analytical Reports
│
├── Dashboards
│   ├── Power BI Dashboards
│   └── KPI Analysis
│
├── Chatbot
│   ├── Backend API
│   ├── SQL Integration
│   └── Analytics Assistant
│
└── Presentation
```

---

# 📊 Dataset Overview

The project uses large-scale simulated datasets representing Egyptian museum operations from 2021–2026.

| Dataset | Records |
|----------|----------:|
| Visitor | 2,300,000 |
| Museum Booking | 5,000,000 |
| Tour Booking | 3,000,000 |
| Event Booking | 2,500,000 |
| Museum | 72 |
| Hall | 720 |
| Artifact | 14,400 |
| Guide | 4,060 |
| Tour | 656 |
| Event | 500 |
| Pricing | 3,240 |

### Total Dataset Size

### 🚀 17+ Million Records

---

# 🗄️ Operational Database (OLTP)

The OLTP database was designed to support daily museum operations while ensuring data integrity, scalability, and transactional efficiency.

## Core Entities

- Museum
- Hall
- Artifact
- Visitor
- MuseumBooking
- Tour
- TourBooking
- Event
- EventBooking
- Guide
- Language
- Pricing
- Payment

## Database Features

- Fully Normalized Design
- Primary & Foreign Keys
- Business Rule Enforcement
- Referential Integrity
- Optimized Transaction Processing
- High Scalability

---

# 🧩 Entity Relationship Diagram (ERD)

![ERD](ERD/ERD.png)

---

# 🔄 ETL Process (SSIS)

The ETL layer was developed using SQL Server Integration Services (SSIS) to move data from the operational database into the analytical warehouse.

## ETL Workflow

1. Extract Source Data
2. Validate Data
3. Clean Data
4. Transform Records
5. Generate Surrogate Keys
6. Load Dimensions
7. Load Bridge Tables
8. Load Facts
9. Execute Validation Checks
10. Audit & Logging

## ETL Features

- Lookup Transformations
- Data Cleansing
- Error Handling
- Incremental Loading
- Audit Tracking
- SCD Implementation
- Data Validation

---

## 📸 ETL Packages

### Museum Booking Fact

![Museum Fact](SSIS/MuseumFactB.png)

### Tour Booking Fact

![Tour Fact](SSIS/TourFactB.png)

### Event Booking Fact

![Event Fact](SSIS/EventFactB.png)

---

# 🏛️ Data Warehouse (DWH)

The KEMET Data Warehouse combines both Galaxy Schema and Snowflake Schema approaches to balance performance, scalability, and maintainability.

---

## Galaxy Schema

The Galaxy Schema serves as the primary analytical model and shares dimensions across multiple business processes.

### Fact Tables

- FactMuseumBooking
- FactTourBooking
- FactEventBooking

### Shared Dimensions

- DimDate
- DimTime
- DimMuseum
- DimVisitor
- DimTicket
- DimPricing
- DimPayment

---

## Snowflake Schema

Selected dimensions were further normalized to reduce redundancy and improve maintainability.

### Snowflaked Dimensions

- DimMuseum
- DimGuide
- DimArtifact
- DimLanguage
- DimLocation

---

## Bridge Tables

- BridgeGuideLanguage
- BridgeMuseumService

---

## Warehouse Features

- Galaxy Schema Design
- Snowflake Schema Design
- Shared Dimensions
- Historical Analysis
- Surrogate Keys
- Slowly Changing Dimensions (SCD)
- Enterprise Analytics Support
- Optimized Query Performance
- Scalable Architecture

---

## 🏗️ Warehouse Architecture
<div align="center">

![Data Warehouse Diagram](DWH/DWH.png)

</div>

---

# 📋 SSRS Reports

The reporting layer provides operational and analytical reports for decision-makers and museum administrators.

## Reports Included

- Revenue Summary Report
- Visitor Analysis Report
- Museum Performance Report
- Event Performance Report
- Tour Guide Performance Report

## Reporting Features

- Interactive Parameters
- Filtering & Sorting
- KPI Aggregation
- Drill Down
- PDF Export
- Excel Export

---

## 📸 SSRS Reports Gallery

### Revenue Summary Report

![Revenue Summary](SSRS/Revenue%20Summary%20Report.png)

### Museum Performance Report

![Museum Performance](SSRS/Museum%20Performance%20Report.png)

### Visitor Analysis Report

![Museum Visitor Analysis Report](SSRS/Museum%20Visitor%20Analysis%20Report..jpeg)

### Tour Guide Performance Report

![Tour Guide Performance Report](SSRS/Tour%20Guide%20Performance%20Report.jpeg)

---

# 📈 Power BI Dashboards

The project includes 20 interactive dashboards providing a comprehensive view of museum operations.

---

## Dashboard Categories

### Executive Analytics

- Executive Command Center
- Revenue Analysis
- Museums Overview

### Visitor Analytics

- Visitor Segmentation
- Customer Loyalty
- Nationality Behaviour

### Operational Analytics

- Hall Utilization
- Crowd Control
- Museum Staff
- Guide Performance

### Business Analytics

- Payment Behaviour
- Pricing & Discounts
- Ticket Type Analysis
- Ticket Class Analysis

### Experience Analytics

- Event Performance
- Tour Business
- Group Experience
- Language Coverage

### Strategic Analytics

- Cultural Heritage
- Geography Analysis

---

# 📊 Dashboard Gallery

## Executive Command Center

![Executive Dashboard](./Dashboards/Exectutive%20command%20center.png)

## Geography Analysis

![Geography](Dashboards/Geography.png)

## Guide Performance

![Guide Performance](Dashboards/Guide%20Performance.png)

## Museum Overview

![Museum Overview](Dashboards/Museum%20Overview.png)



---

# 🤖 AI Analytics Chatbot

The KEMET AI Analytics Chatbot enables users to interact with museum analytics using natural language in both Arabic and English.

The chatbot is connected directly to the museum database and provides real-time analytical insights, KPI exploration, and business intelligence support.

---

## ✨ Features

- Arabic & English Support
- Revenue & KPI Queries
- Visitor Insights
- Museum Performance Analysis
- Dashboard Navigation Assistance
- Real-Time Data Retrieval
- Interactive Business Analytics

---

## 🛠️ Technologies

- Node.js
- Express.js
- SQL Server
- REST APIs

---

## 🎥 Chatbot Demo

<div align="center">

<a href="https://drive.google.com/file/d/1bTt4nlvZVlariuJz3fClrvxclr7rLozV/view" target="_blank">

![Watch Demo](https://img.shields.io/badge/▶%20Watch%20Chatbot%20Demo-4285F4?style=for-the-badge&logo=google-drive&logoColor=white)

</a>

</div>

> Click the button above to watch the chatbot demonstration video.

---
## 📸 Chatbot Gallery

### 👥 Visitor Experience

<p align="center">
  <img src="Chatbot/visitorMode.png" width="90%">
</p>

The chatbot provides an intuitive interface for visitors to explore museums, tours, events, ticket information, and museum services through natural language interactions.

---

### 🌍 Arabic & English Support

<p align="center">
  <img src="Chatbot/Chatbot4.jpeg" width="90%">
</p>

Supports bilingual conversations, allowing users to interact seamlessly in both Arabic and English.

---

### 🔐 Secure Admin Authentication

<p align="center">
  <img src="Chatbot/Chatbot2.jpeg" width="75%">
</p>

Role-based authentication ensures secure access to administrative analytics and business intelligence features.

---

### 📊 Analytics Assistant

<p align="center">
  <img src="Chatbot/Chatbot6.jpeg" width="90%">
</p>

The Admin Analytics Assistant is directly connected to the Data Warehouse, enabling stakeholders to query KPIs, revenue statistics, booking performance, guide workload, language coverage, and operational insights using natural language.

---

# 📊 Business Insights Enabled

The platform supports analysis of:

- Revenue Performance
- Visitor Demographics
- Nationality Trends
- Museum Popularity
- Event Attendance
- Tour Occupancy
- Guide Performance
- Payment Behaviour
- Crowd Management
- Language Coverage
- Visitor Loyalty
- Cultural Heritage Analytics

---

# 🛠️ Technology Stack

## Database

- SQL Server

## Data Warehouse

- Galaxy Schema
- Snowflake Schema
- Dimensional Modeling

## ETL

- SSIS

## Reporting

- SSRS

## Business Intelligence

- Power BI
- DAX
- Power Query

## Backend

- Node.js
- Express.js

## Version Control

- Git
- GitHub

---

# 🚀 End-to-End Workflow

```text
Data Generation
       ↓
OLTP Database
       ↓
ETL (SSIS)
       ↓
Data Warehouse
       ↓
SSRS Reports
       ↓
Power BI Dashboards
       ↓
AI Analytics Chatbot
       ↓
Business Insights & Decision Making
```

---

<div align="center">

# 📥 Download Dataset

[![Download Dataset](https://img.shields.io/badge/Download-Dataset-blue?style=for-the-badge&logo=googledrive&logoColor=white)](https://drive.google.com/file/d/1D4KKv-F4yp3KShRb4xFpIfqscYnsFq1z/view?usp=drive_link)

</div>

---

# ⭐ Project Highlights

✅ 17+ Million Records

✅ Enterprise-Scale Data Warehouse

✅ Galaxy & Snowflake Schema Design

✅ Complete OLTP → DWH → BI Pipeline

✅ Automated ETL using SSIS

✅ Advanced SSRS Reporting

✅ 20 Interactive Power BI Dashboards

✅ Arabic & English AI Analytics Chatbot

✅ End-to-End Business Intelligence Solution

✅ Realistic Egyptian Museum Ecosystem

---

<div align="center">

## 🏛️ KEMET

### Preserving History Through Data

⭐ If you found this project interesting, consider starring the repository.

</div>
