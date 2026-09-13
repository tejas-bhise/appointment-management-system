<div align="center">

# 📅 Appointment Board

### Full-Stack Appointment Management for Small Teams

Create, manage, filter and track appointments from one clean workspace.

<br>

<img src="frontend/public/appointment-board-dashboard.png" alt="Appointment Board Dashboard" width="950">

<br><br>

<a href="#"><img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=white"></a>
<a href="#"><img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white"></a>
<a href="#"><img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"></a>

</div>

---

## 🎯 What I Built

Appointment Board is a full-stack scheduling application designed around a simple team workflow:

<div align="center">

**Create → Manage → Complete / Cancel → Track**

</div>

It solves the core scheduling problem by combining appointment management, filtering, persistent storage and server-side time-slot protection in one interface.

---

## ⚡ What You Can Do

<table>
<tr>
<td width="25%" align="center">

### ➕
### Create

Add an appointment with title, description, date and time.

</td>
<td width="25%" align="center">

### ✏️
### Manage

Edit existing appointments whenever details change.

</td>
<td width="25%" align="center">

### 🔎
### Filter

Filter the board by date, status or both.

</td>
<td width="25%" align="center">

### 🛡️
### Protect

Prevent overlapping active appointments.

</td>
</tr>
</table>

<br>

| Feature | Implementation |
|---|---|
| Appointment creation | Form validation + REST API |
| Appointment editing | Update API + conflict validation |
| Completion | Dedicated status action |
| Cancellation | Dedicated status action without deletion |
| Date filtering | Backend query filtering |
| Status filtering | Scheduled / Completed / Cancelled |
| Conflict prevention | Backend overlap validation |
| Persistence | PostgreSQL database |
| User feedback | Success, error, loading and empty states |

---

## 🔄 How the Application Works

The complete request flow is:

<div align="center">

### 👤 User
Interacts with the dashboard

↓  

### ⚛️ React Frontend
Collects input and manages the interface

↓

### 🚀 FastAPI REST API
Validates data and applies business rules

↓

### 🗄️ SQLAlchemy
Communicates with the database

↓

### 🐘 PostgreSQL
Stores appointment data

↓

### 🔁 API Response
Result is returned to React

↓

### 🖥️ Dashboard
UI updates with the latest appointment state

</div>

### Example: Adding an Appointment

1. The user selects Add Appointment.
2. The form collects the appointment details.
3. Basic required-field and time validation happens in the frontend.
4. React sends the appointment to the FastAPI API.
5. FastAPI validates the request again.
6. The backend checks for an overlapping active appointment.
7. If the slot is available, the appointment is stored in PostgreSQL.
8. The created appointment is returned to the frontend.
9. The dashboard updates and displays the new appointment.

The same frontend → API → database flow is used for editing, filtering, completing and cancelling appointments.

---

## 🧩 Application Modules

### Frontend

| Module | What it handles |
|---|---|
| App.jsx | Main application state, loading, filtering and appointment actions |
| Header.jsx | Dashboard header and Add Appointment action |
| Filters.jsx | Date and status filters |
| AppointmentCard.jsx | Appointment information, status and actions |
| AppointmentForm.jsx | Create/edit form and input validation |
| EmptyState.jsx | No-results and empty-board state |
| services/api.js | Centralized communication with the backend API |
| index.css | Layout, responsive design, cards, states and visual styling |

### Backend

| Module | What it handles |
|---|---|
| main.py | FastAPI application setup and CORS |
| database.py | PostgreSQL connection and SQLAlchemy sessions |
| models.py | Appointment database model |
| schemas.py | API request and response validation |
| crud.py | Database operations |
| appointments.py | Appointment endpoints and business logic |
| seed.py | Initial sample appointments for evaluation |

---

## 🛡️ Time-Slot Conflict Protection

A key requirement is that two active appointments must not overlap.

For appointments on the same date, the backend checks whether:

**new start < existing end**

and

**new end > existing start**

If both conditions are true, the appointment overlaps an existing scheduled appointment and the request is rejected.

This rule is enforced by the backend rather than relying only on the browser, making the business rule authoritative.

When editing an appointment, its own existing record is excluded from the conflict check.

---

## 📊 Appointment States

<div align="center">

| 🟢 Scheduled | 🔵 Completed | 🔴 Cancelled |
|:---:|:---:|:---:|
| Active appointment | Finished appointment | Cancelled appointment |
| Can be edited | Kept for history | Kept for history |
| Can be completed/cancelled | No active actions | No active actions |

</div>

Cancelled appointments are intentionally kept visible instead of being deleted.

---

## 🎨 Interface

The dashboard is designed for quick visual scanning.

The interface provides:

- Clear appointment cards
- Status-based visual indicators
- Date and time displayed prominently
- Direct appointment actions
- Compact dashboard statistics
- Date and status filtering
- Success and error feedback
- Loading states
- Empty states
- Responsive layout

The UI focuses on the required scheduling workflow without adding unrelated functionality.

---

## 🏗️ Architecture

<div align="center">

| Frontend | Backend | Database |
|:---:|:---:|:---:|
| ⚛️ React + Vite | 🚀 FastAPI | 🐘 PostgreSQL |
| UI & State | REST API & Logic | Persistent Data |

</div>

The frontend never connects directly to the database.

All data operations follow:

**React → FastAPI → SQLAlchemy → PostgreSQL**

This keeps database credentials on the backend and allows the server to enforce the application's business rules.

---

## 🛠️ Technology Stack

<div align="center">

### Frontend

React · Vite · JavaScript · Tailwind CSS · Lucide React

### Backend

Python · FastAPI · SQLAlchemy · Pydantic · Uvicorn

### Database

PostgreSQL · Neon

### Deployment

Vercel · Render

### Analytics

Vercel Analytics

</div>

---

## 💡 Important Engineering Decisions

**Backend-authoritative validation**  
The frontend provides immediate feedback, but important validation and conflict rules are also enforced by FastAPI.

**Persistent relational storage**  
PostgreSQL is used because appointments are structured records that require filtering, updates and reliable persistence.

**Cancellation instead of deletion**  
Cancelling changes the appointment status while preserving the record for visibility and history.

**Simple architecture**  
The application uses a straightforward React → FastAPI → PostgreSQL architecture without unnecessary services or complexity.

**Environment-based configuration**  
Database credentials and environment-specific API configuration are kept outside the source code.

---

## 📌 Assumptions

- The application is designed for a small team.
- Authentication and user accounts are outside the provided task scope.
- Appointment statuses are limited to Scheduled, Completed and Cancelled.
- Cancelled appointments remain visible but do not occupy an active scheduling slot.
- Only scheduled appointments are considered when checking availability.
- PostgreSQL is the persistent source of appointment data.
- Sample appointments are included so the application can be reviewed immediately.

---

## 🚀 Deployment

<div align="center">

**GitHub**  
Source Code

↓

**Vercel**  
React Frontend + Analytics

↓

**Render**  
FastAPI Backend

↓

**Neon**  
PostgreSQL Database

</div>

The frontend communicates with the deployed FastAPI backend through an environment-configured API URL.

The backend connects to PostgreSQL using a server-side database connection string.

---

## 📁 Repository

The repository contains two main applications:

**frontend/**  
React + Vite client application

**backend/**  
FastAPI REST API and database layer

The project also includes environment examples and the sample-data seeding script required for local setup.

---

<div align="center">

## Full Stack Developer Intern Practical Task

### React • FastAPI • PostgreSQL • REST API

**Appointment Board**

</div>
