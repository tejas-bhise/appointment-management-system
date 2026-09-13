<div align="center">

# Appointment Board

### Full-Stack Appointment Management for Small Teams

Create, manage, filter and track appointments from one clean workspace.

<br>

<a href="https://appointment-management-system-iota.vercel.app/">
<img src="https://img.shields.io/badge/🚀%20VISIT%20LIVE%20APPLICATION-2563EB?style=for-the-badge">
</a>

<br><br>

<img src="frontend/public/appointment-board-dashboard.png" alt="Appointment Board Dashboard" width="950">

</div>

---

## 🎯 What I Built

<div align="center">

### Create → Manage → Complete / Cancel → Track

</div>

Appointment Board is a full-stack scheduling application designed for a small team workflow.

It combines appointment management, filtering, persistent storage and server-side time-slot protection in one interface.

---

## 🛠️ Technology Stack

<div align="center">

<table width="100%">

<tr>

<td width="18%" align="center">

### Frontend

</td>

<td align="left">

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/Lucide_React-000000?style=for-the-badge&logo=lucide&logoColor=white">

</td>

</tr>

<tr>

<td width="18%" align="center">

### Backend

</td>

<td align="left">

<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white">
<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white">
<img src="https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white">
<img src="https://img.shields.io/badge/Pydantic-E92063?style=for-the-badge&logo=pydantic&logoColor=white">
<img src="https://img.shields.io/badge/Uvicorn-499848?style=for-the-badge&logo=uvicorn&logoColor=white">

</td>

</tr>

<tr>

<td width="18%" align="center">

### Database & Tools

</td>

<td align="left">

<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
<img src="https://img.shields.io/badge/Neon-000000?style=for-the-badge&logo=neon&logoColor=white">
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
<img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black">
<img src="https://img.shields.io/badge/Vercel_Analytics-000000?style=for-the-badge&logo=vercel&logoColor=white">

</td>

</tr>

</table>

</div>

---

## 🏗️ Architecture

<div align="center">

<img src="frontend/public/appointment-management-architecture.png" alt="Appointment Management System Architecture" width="1100">

</div>

---

## 🔄 How the Application Works

<div align="center">

| 👤 User | ⚛️ React Frontend | 🚀 FastAPI REST API | 🗄️ SQLAlchemy | 🐘 PostgreSQL |
|:---:|:---:|:---:|:---:|:---:|
| Interacts with the dashboard | Collects input & manages UI | Validates data & business rules | Handles database operations | Stores persistent data |

</div>

**Flow:**

**User → React → FastAPI → SQLAlchemy → PostgreSQL → API Response → Dashboard**

### Example: Adding an Appointment

1. The user selects **Add Appointment**.
2. The form collects the appointment details.
3. Required-field and time validation happens in the frontend.
4. React sends the appointment to the FastAPI API.
5. FastAPI validates the request again.
6. The backend checks for an overlapping appointment.
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

<div align="center">

### Overlapping appointments are rejected by the backend

<br>

| New Start | Condition | Existing End |
|:---:|:---:|:---:|
| **New Start** | **<** | **Existing End** |

**AND**

| New End | Condition | Existing Start |
|:---:|:---:|:---:|
| **New End** | **>** | **Existing Start** |

</div>

When both conditions are true for appointments on the **same date**, the appointments overlap and the new request is rejected with a clear error message.

### Example

<div align="center">

| Existing Appointment | New Appointment | Result |
|:---:|:---:|:---:|
| 09:00 – 10:00 | 09:30 – 10:30 | ❌ **Conflict** |
| 09:00 – 10:00 | 10:00 – 11:00 | ✅ **Available** |
| 09:00 – 10:00 | 10:30 – 11:30 | ❌ **Conflict** |

</div>

The rule is enforced by FastAPI rather than relying only on frontend validation.

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

<div align="center">

## Full Stack Developer Intern Practical Task

### React • FastAPI • PostgreSQL • REST API

**Appointment Management System**

</div>
