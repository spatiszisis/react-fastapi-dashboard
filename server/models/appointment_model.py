from sqlalchemy import Column, ForeignKey, Integer, String, Text, Boolean, DateTime
from sqlalchemy.orm import relationship
from db.database import Base
from .mixins_model import Timestamp

class Appointment(Timestamp, Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    date = Column(DateTime, nullable=False)
    is_active = Column(Boolean, default=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="appointments")