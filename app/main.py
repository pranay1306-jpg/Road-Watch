from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
import os

from app import models, schemas
from app.database import engine, get_db
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="RoadWatch API", description="API for the RoadWatch Hackathon project")

# API Routes
@app.post("/api/issues", response_model=schemas.Issue)
def create_issue(issue: schemas.IssueCreate, db: Session = Depends(get_db)):
    db_issue = models.Issue(**issue.model_dump())
    db.add(db_issue)
    db.commit()
    db.refresh(db_issue)
    return db_issue

@app.get("/api/issues", response_model=List[schemas.Issue])
def get_issues(
    skip: int = 0, 
    limit: int = 100, 
    status: Optional[str] = None,
    issue_type: Optional[str] = None,
    area: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Issue)
    if status:
        query = query.filter(models.Issue.status == status)
    if issue_type:
        query = query.filter(models.Issue.issue_type == issue_type)
    if area:
        # Case insensitive simple match
        query = query.filter(models.Issue.area.ilike(f"%{area}%"))
        
    issues = query.order_by(models.Issue.created_at.desc()).offset(skip).limit(limit).all()
    return issues

@app.get("/api/issues/{issue_id}", response_model=schemas.Issue)
def get_issue(issue_id: int, db: Session = Depends(get_db)):
    db_issue = db.query(models.Issue).filter(models.Issue.id == issue_id).first()
    if db_issue is None:
        raise HTTPException(status_code=404, detail="Issue not found")
    return db_issue

@app.get("/api/analytics/summary")
def get_analytics_summary(db: Session = Depends(get_db)):
    # Group by status
    status_counts = db.query(models.Issue.status, func.count(models.Issue.id)).group_by(models.Issue.status).all()
    status_dict = {status: count for status, count in status_counts}
    
    # Group by type
    type_counts = db.query(models.Issue.issue_type, func.count(models.Issue.id)).group_by(models.Issue.issue_type).all()
    type_dict = {issue_type: count for issue_type, count in type_counts}
    
    # Area spending mock data
    area_spending = db.query(models.AreaSpending).all()
    spending_list = [
        {
            "area": a.area,
            "budget_allocated": a.budget_allocated,
            "budget_spent": a.budget_spent,
            "issues_resolved": a.issues_resolved
        } for a in area_spending
    ]
    
    return {
        "status_summary": status_dict,
        "type_summary": type_dict,
        "spending": spending_list
    }

# Mount static files correctly
static_dir = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir)

app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
