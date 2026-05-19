from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class IssueBase(BaseModel):
    title: str
    description: str
    issue_type: str
    area: str
    address: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    severity: Optional[str] = None
    image_url: Optional[str] = None
    date_observed: Optional[date] = None

class IssueCreate(IssueBase):
    pass

class Issue(IssueBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class AreaSpending(BaseModel):
    id: int
    area: str
    budget_allocated: float
    budget_spent: float
    issues_resolved: int

    class Config:
        from_attributes = True
