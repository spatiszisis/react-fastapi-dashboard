from sqlalchemy.orm import Session
from models.appointment_model import Appointment
from schemas.appointment_schema import AppointmentCreate, AppointmentUpdate
import datetime

def get_appointment(db: Session, appointment_id: int):
    return db.query(Appointment).filter(Appointment.id == appointment_id).first()

def get_appointments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Appointment).offset(skip).limit(limit).all()

def create_appointment(db: Session, appointment: AppointmentCreate):
    db_appointment = Appointment(
        title=appointment.title, 
        description=appointment.description, 
        is_active=appointment.is_active,
        start_time=appointment.start_time,
        end_time=appointment.end_time,
        user_id=appointment.user_id,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

def update_appointment(db: Session, appointment_id: int, appointment: AppointmentUpdate):
    db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    db_appointment.title = appointment.title
    db_appointment.description = appointment.description
    db_appointment.is_active = appointment.is_active
    db_appointment.start_time = appointment.start_time
    db_appointment.end_time = appointment.end_time
    db_appointment.user_id = appointment.user_id
    db_appointment.updated_at = datetime.datetime.now()
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

def delete_appointment(db: Session, appointment_id: int):
    db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    db.delete(db_appointment)
    db.commit()
    return db_appointment