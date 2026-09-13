from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from .. import crud
from ..database import get_db
from ..schemas import (
    AppointmentCreate,
    AppointmentListResponse,
    AppointmentResponse,
    AppointmentUpdate,
)


router = APIRouter(
    prefix="/api/appointments",
    tags=["appointments"],
)


@router.get("", response_model=AppointmentListResponse)
def list_appointments(
    appointment_date: date | None = Query(default=None, alias="date"),
    appointment_status: str | None = Query(default=None, alias="status"),
    db: Session = Depends(get_db),
):
    if appointment_status is not None:
        allowed_statuses = {"scheduled", "completed", "cancelled"}

        if appointment_status not in allowed_statuses:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid appointment status.",
            )

    appointments = crud.get_appointments(
        db=db,
        appointment_date=appointment_date,
        status=appointment_status,
    )

    return {"appointments": appointments}


@router.post(
    "",
    response_model=AppointmentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_appointment(
    appointment_data: AppointmentCreate,
    db: Session = Depends(get_db),
):
    if crud.has_conflict(
        db=db,
        appointment_date=appointment_data.date,
        start_time=appointment_data.start_time,
        end_time=appointment_data.end_time,
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This time slot conflicts with an existing appointment.",
        )

    return crud.create_appointment(
        db=db,
        title=appointment_data.title,
        description=appointment_data.description,
        appointment_date=appointment_data.date,
        start_time=appointment_data.start_time,
        end_time=appointment_data.end_time,
    )


@router.put(
    "/{appointment_id}",
    response_model=AppointmentResponse,
)
def update_appointment(
    appointment_id: int,
    appointment_data: AppointmentUpdate,
    db: Session = Depends(get_db),
):
    appointment = crud.get_appointment(
        db=db,
        appointment_id=appointment_id,
    )

    if appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found.",
        )

    if crud.has_conflict(
        db=db,
        appointment_date=appointment_data.date,
        start_time=appointment_data.start_time,
        end_time=appointment_data.end_time,
        exclude_id=appointment_id,
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This time slot conflicts with an existing appointment.",
        )

    return crud.update_appointment(
        db=db,
        appointment=appointment,
        title=appointment_data.title,
        description=appointment_data.description,
        appointment_date=appointment_data.date,
        start_time=appointment_data.start_time,
        end_time=appointment_data.end_time,
    )


@router.patch(
    "/{appointment_id}/complete",
    response_model=AppointmentResponse,
)
def complete_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
):
    appointment = crud.get_appointment(
        db=db,
        appointment_id=appointment_id,
    )

    if appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found.",
        )

    if appointment.status != "scheduled":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only scheduled appointments can be completed.",
        )

    return crud.complete_appointment(
        db=db,
        appointment=appointment,
    )


@router.patch(
    "/{appointment_id}/cancel",
    response_model=AppointmentResponse,
)
def cancel_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
):
    appointment = crud.get_appointment(
        db=db,
        appointment_id=appointment_id,
    )

    if appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found.",
        )

    if appointment.status != "scheduled":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only scheduled appointments can be cancelled.",
        )

    return crud.cancel_appointment(
        db=db,
        appointment=appointment,
    )
