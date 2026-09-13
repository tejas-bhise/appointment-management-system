from datetime import date, time

from sqlalchemy import select

from app.database import Base, SessionLocal, engine
from app.models import Appointment


Base.metadata.create_all(bind=engine)


SAMPLE_APPOINTMENTS = [
    {
        "title": "Team Stand-up",
        "description": "Daily engineering team sync.",
        "date": date(2026, 9, 14),
        "start_time": time(9, 30),
        "end_time": time(10, 0),
        "status": "scheduled",
    },
    {
        "title": "Product Planning",
        "description": "Review upcoming sprint priorities.",
        "date": date(2026, 9, 14),
        "start_time": time(10, 30),
        "end_time": time(11, 30),
        "status": "scheduled",
    },
    {
        "title": "Client Review",
        "description": "Review the latest project progress with the client.",
        "date": date(2026, 9, 14),
        "start_time": time(14, 0),
        "end_time": time(15, 0),
        "status": "scheduled",
    },
    {
        "title": "Design Discussion",
        "description": "Discuss UI improvements and feedback.",
        "date": date(2026, 9, 13),
        "start_time": time(11, 0),
        "end_time": time(12, 0),
        "status": "completed",
    },
    {
        "title": "Backend Review",
        "description": "Review API implementation and database changes.",
        "date": date(2026, 9, 13),
        "start_time": time(14, 0),
        "end_time": time(15, 0),
        "status": "completed",
    },
    {
        "title": "Vendor Call",
        "description": "Discuss service renewal and requirements.",
        "date": date(2026, 9, 15),
        "start_time": time(10, 0),
        "end_time": time(10, 45),
        "status": "cancelled",
    },
    {
        "title": "Weekly Retrospective",
        "description": "Team retrospective and action items.",
        "date": date(2026, 9, 15),
        "start_time": time(16, 0),
        "end_time": time(17, 0),
        "status": "scheduled",
    },
]


def seed_database():
    db = SessionLocal()

    try:
        existing = db.scalar(select(Appointment.id).limit(1))

        if existing is not None:
            print("Seed skipped: appointments already exist.")
            return

        db.add_all(
            [Appointment(**appointment) for appointment in SAMPLE_APPOINTMENTS]
        )
        db.commit()

        print(f"Seeded {len(SAMPLE_APPOINTMENTS)} appointments.")

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
