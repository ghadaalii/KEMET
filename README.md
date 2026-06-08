# 🏛️ KEMET – Smart Egyptian Museum Management & Analytics System

## 📌 Overview

KEMET is an end-to-end Business Intelligence and Data Analytics solution designed to support the management and analysis of Egyptian museums.

The project integrates operational data, data warehousing, ETL processes, reporting, interactive dashboards, and an AI-powered chatbot to provide actionable insights for museum administrators and decision-makers.

The system analyzes:

* Museum Bookings
* Visitors
* Tours
* Events
* Guides
* Ticket Sales
* Revenue Performance
* Museum Services

---

## 🎯 Project Objectives

* Centralize museum-related data in a structured database.
* Support data-driven decision making.
* Analyze visitor behavior and tourism trends.
* Monitor revenue and operational performance.
* Provide interactive dashboards for business users.
* Enable natural language access to museum data through an AI chatbot.

---

## 🏗️ Project Architecture

### 1. ERD Design

Designed a complete Entity Relationship Diagram representing:

* Museums
* Visitors
* Bookings
* Tours
* Events
* Tickets
* Guides
* Services

Ensuring strong relationships, data consistency, and scalability.

### 2. Data Mapping

Converted business requirements and ERD entities into relational database structures with:

* Primary Keys
* Foreign Keys
* Constraints
* Business Rules

### 3. Database Development

Implemented the operational database using SQL Server.

Features include:

* Normalized schema
* Referential integrity
* Business rule enforcement
* Optimized relationships

### 4. Data Warehouse

Built a Data Warehouse using a **Galaxy Schema** architecture with selected **Snowflake Dimensions**.

#### Fact Tables

* FactMuseumBooking
* FactTourBooking
* FactEventBooking

#### Dimension Tables

* DimMuseum
* DimVisitor
* DimDate
* DimTicket
* DimGuide
* DimLanguage
* DimPricing
* DimPayment
* DimHall
* DimArtifact

### 5. Data Generation

Generated realistic large-scale datasets simulating:

* Visitor behavior
* Tourism seasonality
* Group and individual bookings
* Event attendance
* Tour occupancy
* Pricing rules by nationality and ticket type

The generated data maintains business constraints and referential integrity.

### 6. ETL Process (SSIS)

Developed ETL pipelines using SQL Server Integration Services (SSIS) to:

* Extract data from source systems
* Transform and clean data
* Load data into the Data Warehouse

### 7. Reporting (SSRS)

Created operational and analytical reports using SQL Server Reporting Services (SSRS), including:

* Revenue Summary Report
* Visitor Analysis Report
* Event Performance Report
* Museum Performance Reports

### 8. Power BI Dashboards

Built interactive dashboards to provide insights across different business areas.

Examples include:

* Executive Command Center
* Revenue Performance Dashboard
* Visitor Segmentation Dashboard
* Group Experience Dashboard
* Payment Behavior Dashboard
* Tour Business Dashboard
* Event Performance Dashboard
* Language Coverage Dashboard
* Nationality Behavior Dashboard
* Guide Performance Dashboard

---

## 🤖 AI Chatbot

An AI-powered chatbot was developed to provide a smart conversational interface for museum analytics.

### Features

* Natural language queries
* Arabic and English support
* Real-time database retrieval
* Museum information lookup
* Pricing inquiries
* Tour information
* Visitor analytics insights

The chatbot connects directly to the project database through API endpoints and returns accurate responses based on the stored data.

---

## 🛠️ Technologies Used

### Database

* Microsoft SQL Server
* T-SQL

### Data Warehouse

* Star Schema
* Galaxy Schema
* Snowflake Schema

### ETL

* SQL Server Integration Services (SSIS)

### Reporting

* SQL Server Reporting Services (SSRS)

### Business Intelligence

* Microsoft Power BI
* DAX
* Power Query

### Backend & AI

* Node.js
* Express.js
* REST APIs
* AI-powered Chatbot

### Data Generation

* Python
* ChatGPT-Assisted Synthetic Data Generation

---

## 📊 Key Features

✔ Museum Management Analytics

✔ Revenue Analysis

✔ Visitor Behavior Analysis

✔ Tour Performance Monitoring

✔ Event Performance Tracking

✔ Group Booking Analysis

✔ Nationality Insights

✔ Interactive Dashboards

✔ Automated Reporting

✔ AI Chatbot Integration

---

## 👨‍🎓 Graduation Project


KEMET was developed as a graduation project to demonstrate the complete Business Intelligence lifecycle, from database design and data warehousing to advanced analytics, reporting, visualization, and AI integration.

---

## 📸 Project Workflow

ERD Design → Data Mapping → Database Creation → Data Warehouse → Data Generation → SSIS ETL → SSRS Reports → Power BI Dashboards → AI Chatbot
