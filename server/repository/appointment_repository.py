from sqlalchemy.orm import Session
from models.appointment_model import Appointment
from schemas.appointment_schema import AppointmentCreate, AppointmentUpdate
import datetime
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError

def get_appointment(db: Session, appointment_id: int):
    return db.query(Appointment).filter(Appointment.id == appointment_id).first()

def get_appointments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Appointment).offset(skip).limit(limit).all()

def create_appointment(db: Session, appointment: AppointmentCreate):
    db_appointment = Appointment(
        title=appointment.title, 
        description=appointment.description, 
        is_active=appointment.is_active,
        date=appointment.date,
        user_id=appointment.user_id,
        created_at=datetime.datetime.now().date(),
        updated_at=datetime.datetime.now().date()
    )
    try:
        db.add(db_appointment)
        db.commit()
        db.refresh(db_appointment)
    except (Exception, IntegrityError) as e:
        db.rollback()
        if e.orig.pgcode == '23503':
            raise HTTPException(status_code=400, detail="Choose another customer")
        raise HTTPException(status_code=400, detail="Error")
    
    return db_appointment

def update_appointment(db: Session, appointment_id: int, appointment: AppointmentUpdate):
    db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    db_appointment.title = appointment.title
    db_appointment.description = appointment.description
    db_appointment.is_active = appointment.is_active
    db_appointment.date = appointment.date
    db_appointment.user_id = appointment.user_id
    db_appointment.updated_at = datetime.datetime.now()
    try:
        db.commit()
        db.refresh(db_appointment)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=401, detail=e)
    
    return db_appointment

def delete_appointment(db: Session, appointment_id: int):
    db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    db.delete(db_appointment)
    db.commit()
    return db_appointment