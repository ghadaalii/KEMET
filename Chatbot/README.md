# KEMET Assistant 🤖

### AI-Powered Conversational Assistant for Egyptian Museums

KEMET Assistant is an intelligent conversational chatbot developed as part of the KEMET platform. It enables visitors and stakeholders to interact with Egyptian museum data using natural language instead of traditional search interfaces.

The assistant is directly connected to a SQL Server Data Warehouse and provides accurate responses about museums, tours, events, ticket pricing, guides, and analytics through a hybrid architecture that combines Data Engineering, Prompt Engineering, and Artificial Intelligence.

---

## Demo

🎥 Watch KEMET Assistant in Action

A complete demonstration of the chatbot, including visitor interactions, dynamic pricing, recommendations, conversational memory, and admin analytics features, is available here:

👉 [Watch Demo Video](https://drive.google.com/file/d/1bTt4nlvZVlariuJz3fClrvxclr7rLozV/view?usp=sharing)

---

# Project Motivation

Museum information is often scattered across multiple systems and interfaces. Visitors typically need to browse several pages to find simple information such as:

- Available museums
- Tour schedules
- Ticket prices
- Events
- Guide availability

KEMET Assistant was designed to transform this experience into a natural conversation, allowing users to ask questions in Arabic or English and receive immediate responses powered by real museum data.

---

# Key Features

## Visitor Assistant

The chatbot helps visitors with:

- Museum discovery
- Tour exploration
- Event information
- Ticket pricing
- Museum services
- Guide information
- Hall and artifact information
- Museum recommendations

### Example Questions

```text
What museums are available in Cairo?

Tell me about available tours.

What is the price of this tour?

هل يوجد مرشدين في المتحف المصري؟

Recommend a museum for me.
```

---

## Admin Assistant

A dedicated administrative mode enables stakeholders to query analytics using natural language.

### Supported Analytics

- Museum revenue statistics
- Booking performance
- Tour performance
- Event performance
- Guide analytics
- Operational KPIs

### Example Questions

```text
Show museum revenue statistics.

Tour performance and participant counts.

Event performance overview.

Guide workload and language coverage.
```

---

# System Architecture

```text
User
  ↓
Chat Interface
  ↓
JavaScript Frontend
  ↓
Node.js + Express API
  ↓
Data Processing Layer
  ↓
SQL Server Data Warehouse
  ↓
OpenAI GPT-4o-mini
  ↓
Natural Language Response
```

---

# How It Works

## 1. Data Loading Layer

When the application starts, the frontend requests data from the backend endpoint:

```text
/api/museum-data
```

The Node.js server retrieves data from the Data Warehouse and loads it into a local object:

```javascript
MUSEUM_DATA;
```

This includes:

- Museums
- Tours
- Events
- Pricing
- Guides
- Halls
- Artifacts
- Statistics

Loading the data once significantly improves performance by avoiding repeated database queries.

---

## 2. Intent Detection Layer

Each user message is analyzed to determine its intent.

Supported intents include:

- Museums
- Tours
- Events
- Pricing
- Guides
- Analytics

Example:

```text
What tours are available in Cairo?
```

Intent:

```text
Tour Search
```

---

## 3. Entity Recognition Layer

The assistant automatically detects entities mentioned by the user such as:

- Museum names
- Tour names
- Event names
- Cities

Example:

```text
Egyptian Museum
Grand Egyptian Museum
Cairo
Luxor
```

This allows the chatbot to retrieve only relevant information.

---

## 4. Data Engineering Layer

Instead of sending the entire warehouse to the AI model, the system performs:

### Data Extraction

Retrieves data from:

- Fact Tables
- Dimension Tables

### Data Transformation

Converts relational SQL data into lightweight JSON structures.

### Data Filtering

Keeps only the information relevant to the current question.

### Data Compression

Builds compact datasets to minimize prompt size.

---

## 5. Dynamic Prompt Engineering

The assistant generates a custom prompt for every question.

Each prompt contains:

- User question
- Relevant warehouse data
- System instructions

This ensures that responses remain grounded in project data rather than relying on general AI knowledge.

---

## 6. Conversational Memory

The chatbot maintains conversational context.

Example:

```text
User:
Tell me about available tours.

Bot:
Ancient Wonders of Main Gallery 10

User:
What is its price?
```

The assistant understands that "its" refers to the previously mentioned tour.

This enables natural multi-turn conversations.

---

## 7. Language Detection

The assistant automatically detects the user's language.

Supported languages:

- Arabic
- English

The chatbot responds using the same language as the user.

---

## 8. Dynamic Pricing Engine

Pricing is handled locally using warehouse pricing data.

The system supports:

- Nationality categories
- Ticket types
- Ticket classes
- Discount rules

This avoids unnecessary AI calculations and guarantees accurate pricing.

---

## 9. Museum Recommendation Engine

The assistant can recommend museums based on:

- User interests
- Museum type
- Available data

Example:

```text
I want to visit a museum in Cairo.
```

The assistant recommends suitable museums using warehouse information rather than generic AI suggestions.

---

## 10. AI Guardian Layer

The chatbot is restricted to Egyptian museum topics.

The Guardian layer prevents:

- Off-topic discussions
- General AI questions
- Unrelated requests

This ensures domain-specific responses and reduces hallucinations.

---

# Performance Optimization

One of the main challenges was reducing token usage.

Instead of sending the entire warehouse to OpenAI:

```text
Large Warehouse
      ↓
Intent Detection
      ↓
Data Filtering
      ↓
Compact Dataset
      ↓
OpenAI
```

Benefits:

- Faster responses
- Lower token consumption
- Reduced API cost
- Improved accuracy

---

# Security

The OpenAI API key is never exposed to the frontend.

Environment variables are used for secure configuration:

```env
OPENAI_API_KEY=your_api_key
```

The `.env` file is excluded from GitHub using:

```gitignore
.env
```

---

# Technology Stack

## Frontend

- HTML
- CSS
- JavaScript

## Backend

- Node.js
- Express.js

## Database

- SQL Server
- Data Warehouse

## Artificial Intelligence

- OpenAI GPT-4o-mini
- Prompt Engineering
- Conversational Memory
- Intent Detection

---

# Challenges Solved

### Context Understanding

Implemented conversational memory to support follow-up questions.

### Hallucination Reduction

Restricted responses to warehouse data only.

### Pricing Accuracy

Built a local pricing engine using warehouse pricing data.

### Token Optimization

Implemented compact dataset generation to minimize prompt size.

### Domain Restriction

Developed an AI Guardian layer for museum-specific conversations.

---

# Future Enhancements

- Semantic Search
- Vector Database Integration
- Retrieval-Augmented Generation (RAG)
- Voice Assistant Support
- User Profile Personalization
- Online Ticket & Tour Booking Integration

---

# Project Highlights

✅ SQL Server Data Warehouse Integration

✅ AI-Powered Conversational Interface

✅ Arabic & English Support

✅ Dynamic Pricing Engine

✅ Conversational Memory

✅ Museum Recommendation System

✅ Admin Analytics Assistant

✅ Prompt Engineering & Token Optimization

✅ Domain-Specific AI Guardrails

---

## Author

**KEMET Assistant – AI Module**

Part of the **KEMET Egyptian Museums Management & Analytics Platform**

Developed during the ITI Power BI Development Intensive Training Graduation Project.
