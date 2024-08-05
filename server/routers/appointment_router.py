from typing import List
from fastapi import APIRouter
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from schemas.appointment_schema import AppointmentCreate, Appointment
from repository import appointment_repository

router = APIRouter(
    prefix='/appointments',
    tags=['Appointments Routes']
)

@router.get("/", response_model=List[Appointment])
async def read_appointments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    appointments = appointment_repository.get_appointments(db, skip=skip, limit=limit)
    return appointments

@router.post("/", response_model=Appointment, status_code=201)
async def create_new_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    return appointment_repository.create_appointment(db=db, appointment=appointment)

@router.get("/{appointment_id}", response_model=Appointment)
async def read_appointment(appointment_id: int, db: Session = Depends(get_db)):
    db_appointment = appointment_repository.get_appointment(db=db, appointment_id=appointment_id)
    if db_appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return db_appointment

@router.put("/{appointment_id}", response_model=Appointment)
async def update_appointment(appointment_id: int, appointment: AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = appointment_repository.get_appointment(db=db, appointment_id=appointment_id)
    if db_appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment_repository.update_appointment(db=db, appointment_id=appointment_id, appointment=appointment)

@router.delete("/{appointment_id}", response_model=Appointment)
async def delete_appointment(appointment_id: int, db: Session = Depends(get_db)):
    db_appointment = appointment_repository.get_appointment(db=db, appointment_id=appointment_id)
    if db_appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment_repository.delete_appointment(db=db, appointment_id=appointment_id)