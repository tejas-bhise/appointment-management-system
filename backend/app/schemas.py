from datetime import date, datetime, time

from pydantic import BaseModel, ConfigDict, Field, field_validator


ALLOWED_STATUSES = {"scheduled", "completed", "cancelled"}


class AppointmentBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str | None = None
    date: date
    start_time: time
    end_time: time

    @field_validator("title")
    @classmethod
    def validate_title(cls, value: str) -> str:
        value = value.strip()

        if not value:
            raise ValueError("Title is required.")

        return value

    @field_validator("description")
    @classmethod
    def normalize_description(cls, value: str | None) -> str | None:
        if value is None:
            return None

        value = value.strip()
        return value if value else None

    @field_validator("end_time")
    @classmethod
    def validate_end_time(
        cls,
        end_time: time,
        info,
    ) -> time:
        start_time = info.data.get("start_time")

        if start_time is not None and end_time <= start_time:
            raise ValueError("End time must be after start time.")

        return end_time


class AppointmentCreate(AppointmentBase):
    pass


class AppointmentUpdate(AppointmentBase):
    pass


class AppointmentResponse(AppointmentBase):
    id: int
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AppointmentListResponse(BaseModel):
    appointments: list[AppointmentResponse]
