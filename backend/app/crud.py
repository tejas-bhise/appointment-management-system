from datetime import date, time

from sqlalchemy import select
from sqlalchemy.orm import Session

from .models import Appointment


ALLOWED_STATUSES = {"scheduled", "completed", "cancelled"}


def get_appointments(
    db: Session,
    appointment_date: date | None = None,
    status: str | None = None,
) -> list[Appointment]:
    query = select(Appointment).order_by(
        Appointment.date.asc(),
        Appointment.start_time.asc(),
    )

    if appointment_date is not None:
        query = query.where(Appointment.date == appointment_date)

    if status is not None:
        query = query.where(Appointment.status == status)

    return list(db.scalars(query).all())


def get_appointment(
    db: Session,
    appointment_id: int,
) -> Appointment | None:
    return db.get(Appointment, appointment_id)


def has_conflict(
    db: Session,
    appointment_date: date,
    start_time: time,
    end_time: time,
    exclude_id: int | None = None,
) -> bool:
    query = select(Appointment).where(
        Appointment.date == appointment_date,
        Appointment.status == "scheduled",
        Appointment.start_time < end_time,
        Appointment.end_time > start_time,
    )

    if exclude_id is not None:
        query = query.where(Appointment.id != exclude_id)

    return db.scalar(query) is not None


def create_appointment(
    db: Session,
    title: str,
    description: str | None,
    appointment_date: date,
    start_time: time,
    end_time: time,
) -> Appointment:
    appointment = Appointment(
        title=title,
        description=description,
        date=appointment_date,
        start_time=start_time,
        end_time=end_time,
        status="scheduled",
    )

    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    return appointment


def update_appointment(
    db: Session,
    appointment: Appointment,
    title: str,
    description: str | None,
    appointment_date: date,
    start_time: time,
    end_time: time,
) -> Appointment:
    appointment.title = title
    appointment.description = description
    appointment.date = appointment_date
    appointment.start_time = start_time
    appointment.end_time = end_time

    db.commit()
    db.refresh(appointment)

    return appointment


def complete_appointment(
    db: Session,
    appointment: Appointment,
) -> Appointment:
    appointment.status = "completed"

    db.commit()
    db.refresh(appointment)

    return appointment


def cancel_appointment(
    db: Session,
    appointment: Appointment,
) -> Appointment:
    appointment.status = "cancelled"

    db.commit()
    db.refresh(appointment)

    return appointment
