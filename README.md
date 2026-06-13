# 🏛️ KEMET – Egyptian Museums Management & Analytics Platform

Developed by **Shrouk Ehab, Nouran, Yasser, Noha Ahmed, Basmala Khaled, and Ghada Ali**

![SQL Server](https://img.shields.io/badge/SQL%20Server-Database-red)
![SSIS](https://img.shields.io/badge/SSIS-ETL-blue)
![SSRS](https://img.shields.io/badge/SSRS-Reporting-green)
![Power%20BI](https://img.shields.io/badge/Power%20BI-Dashboard-yellow)
![Node.js](https://img.shields.io/badge/Node.js-Backend-brightgreen)

---

## 📖 Overview

KEMET is an end-to-end Business Intelligence and Analytics platform designed to support the management and analysis of Egyptian museums through data-driven decision-making.

The project simulates a nationwide museum ecosystem, covering museum visits, guided tours, cultural events, visitors, artifacts, halls, pricing systems, payments, and operational performance.

The solution transforms raw operational data into meaningful business insights through a complete BI pipeline consisting of:

- Data Generation
- OLTP Database
- ETL Process (SSIS)
- Data Warehouse (Galaxy Schema)
- SSRS Reporting
- Power BI Dashboards
- AI-Powered Analytics Chatbot

---

## 🎯 Project Objectives

- Centralize museum operational data.
- Analyze visitor demographics and behavior.
- Monitor museum performance.
- Track revenue and profitability.
- Evaluate event and tour performance.
- Support strategic decision-making.
- Deliver interactive analytics and KPIs.
- Enable natural language analytics through AI.

---

## 🏗️ Solution Architecture

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
Data Warehouse (Galaxy Schema)
       │
 ┌─────┼─────┐
 ▼     ▼     ▼
SSRS  Power BI  AI Chatbot
Reports Dashboards Analytics
```

---

## 📂 Project Structure

```text
KEMET
│
├── Data
│   ├── Generated Datasets
│   └── Data Documentation
│
├── Database
│   ├── ERD
│   ├── Database Scripts
│   └── OLTP Design
│
├── SSIS
│   ├── ETL Packages
│   ├── Dimension Loads
│   ├── Fact Loads
│   └── SCD Processes
│
├── DWH
│   ├── Galaxy Schema
│   ├── Fact Tables
│   ├── Dimension Tables
│   └── Bridge Tables
│
├── SSRS
│   └── Analytical Reports
│
├── Power BI
│   ├── Dashboards
│   ├── Measures
│   └── Data Model
│
├── Chatbot
│   ├── Backend API
│   ├── SQL Integration
│   └── Natural Language Queries
│
└── Documentation
```

---

## 📊 Dataset Overview

The project uses large-scale simulated data representing Egyptian museum operations from **2021–2026**.

| Dataset | Rows |
|----------|---------:|
| Visitor | 2,300,000 |
| MuseumBooking | 5,000,000 |
| TourBooking | 3,000,000 |
| EventBooking | 2,500,000 |
| Museum | 72 |
| Hall | 720 |
| Artifact | 14,400 |
| Guide | 4,060 |
| Tour | 656 |
| Event | 500 |
| Pricing | 3,240 |

### Total Records

**17+ Million Records**

---

## 🗄️ Operational Database (OLTP)

The OLTP database was designed to manage daily museum operations while ensuring data integrity and minimizing redundancy.

### Core Entities

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

### Design Features

- Fully normalized structure
- Primary & Foreign Keys
- Business Rule Enforcement
- High scalability
- Optimized transactional performance

---

## 🔄 ETL Process (SSIS)

The ETL layer was developed using SQL Server Integration Services (SSIS) to transfer data from the OLTP database into the analytical warehouse.

### ETL Workflow

1. Extract source data.
2. Clean and validate records.
3. Apply business transformations.
4. Generate surrogate keys.
5. Implement Slowly Changing Dimensions (SCD).
6. Load dimension tables.
7. Load bridge tables.
8. Load fact tables.
9. Perform validation and auditing checks.

### ETL Features

- Lookup Transformations
- Data Cleansing
- Error Handling
- SCD Implementation
- Incremental Loading
- Data Validation
- Audit Tracking

---
## 🏛️ Data Warehouse (DWH)

The KEMET Data Warehouse combines both **Galaxy Schema** and **Snowflake Schema** designs to balance analytical performance, scalability, and normalization.

### Galaxy Schema Components

The Galaxy Schema serves as the core analytical model by sharing dimensions across multiple fact tables.

#### Fact Tables

- FactMuseumBooking
- FactTourBooking
- FactEventBooking

#### Shared Dimensions

- DimDate
- DimTime
- DimMuseum
- DimVisitor
- DimTicket
- DimPricing
- DimPayment

---

### Snowflake Schema Components

Several dimensions were further normalized to reduce redundancy and improve maintainability.

#### Snowflaked Dimensions

- DimMuseum
- DimGuide
- DimArtifact
- DimLocation
- DimLanguage

---

### Bridge Tables

- BridgeGuideLanguage
- BridgeMuseumService

---

### Warehouse Features

- Galaxy Schema Design
- Snowflake Schema Design
- Historical Analysis
- Shared Dimensions
- Surrogate Keys
- Slowly Changing Dimensions (SCD)
- Enterprise Analytics Support
- Optimized Query Performance
- Scalable Architecture


---

## 📋 SSRS Reports

The reporting layer provides operational and analytical reports for business users.

### Reports Included

- Revenue Summary Report
- Visitor Analysis Report
- Event Performance Report
- Museum Performance Report
- Tour Analysis Report
- Payment Analysis Report

### Reporting Features

- Interactive Parameters
- Filtering & Sorting
- Aggregated KPIs
- Drill-Down Capabilities
- Export to PDF and Excel

---

## 📈 Power BI Dashboards

The project includes **20 interactive dashboards** designed to provide comprehensive insights across all museum operations.

### Dashboard Categories

- Executive Overview
- Revenue Analysis
- Visitor Segmentation
- Museum Performance
- Event Analytics
- Tour Analytics
- Payment Behavior
- Crowd Control
- Language Coverage
- Nationality Behavior
- Group Experience
- Hall Utilization
- Cultural Heritage Insights
- Loyalty & Repeat Visitors
- Staff Overview
- Pricing & Discounts
- Geography Analysis
- Ticket Type Analysis
- Ticket Class Analysis
- Museums Overview
- Tour Business Analysis

### Dashboard Features

- Bookmarks
- Drill Through
- Drill Down
- Dynamic KPIs
- Advanced DAX Measures
- Responsive Design

---

## 🤖 AI Analytics Chatbot

An AI-powered conversational assistant designed to enable both visitors and stakeholders to interact with Egyptian museum data using natural language. The chatbot is directly integrated with the SQL Server Data Warehouse and provides accurate, data-driven responses for museums, tours, events, guides, pricing, and analytics.

### Features

- Arabic & English Support
- Revenue Queries
- Visitor Insights
- Museum Performance Analysis
- Dashboard Navigation Assistance
- Real-Time Data Retrieval

### Technologies

- Node.js
- Express.js
- SQL Server
- REST APIs


### Demo

Watch the chatbot demonstration:

https://drive.google.com/file/d/1bTt4nlvZVlariuJz3fClrvxclr7rLozV/view?usp=sharing
---

## 📊 Business Insights Enabled

The platform supports analysis of:

- Revenue Performance
- Visitor Demographics
- Nationality Trends
- Tour Occupancy
- Event Attendance
- Guide Performance
- Payment Behavior
- Museum Utilization
- Crowd Management
- Visitor Loyalty
- Language Coverage
- Cultural Heritage Analytics

---

## 🛠️ Technology Stack

### Database
- SQL Server

### Data Warehouse
- Galaxy Schema
- Dimensional Modeling

### ETL
- SSIS

### Reporting
- SSRS

### Business Intelligence
- Power BI
- DAX
- Power Query

### Data Generation
- Chat GPT & REAL SOURCE

### Version Control
- Git
- GitHub

---

## 🚀 End-to-End Workflow

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
AI Chatbot
        ↓
Business Insights & Decision Making
```

---

## 📥 Download Dataset

The complete datasets used in this project can be downloaded from:

🔗 **Dataset Download**

https://drive.google.com/file/d/1D4KKv-F4yp3KShRb4xFpIfqscYnsFq1z/view?usp=drive_link

---

## 👥 Project Team

| Team Member |
|------------|
| Shrouk Ehab |
| Nouran Yasser |
| Noha Ahmed |
| Basmala Khaled |
| Ghada Ali |

---

## ⭐ Project Highlights

- End-to-End Business Intelligence Solution
- 17+ Million Records
- Complete ETL Pipeline
- Enterprise Data Warehouse
- Interactive Power BI Dashboards
- AI-Powered Analytics Chatbot
- Realistic Egyptian Museum Ecosystem
- Full BI Lifecycle Implementation
