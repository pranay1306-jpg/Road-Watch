from sqlalchemy import Column, Integer, String, Text, Float, Date, DateTime
from datetime import datetime
from app.database import Base

class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    issue_type = Column(String, index=True)
    area = Column(String, index=True)
    address = Column(Text)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    status = Column(String, default="New", index=True)
    severity = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    date_observed = Column(Date, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class AreaSpending(Base):
    __tablename__ = "area_spending"

    id = Column(Integer, primary_key=True, index=True)
    area = Column(String, unique=True, index=True)
    budget_allocated = Column(Float)
    budget_spent = Column(Float)
    issues_resolved = Column(Integer)
