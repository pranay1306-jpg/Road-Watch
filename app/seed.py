import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import engine, SessionLocal
from app import models
from datetime import date, timedelta

def seed_db():
    print("Creating tables...")
    models.Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if we already have data
    if db.query(models.Issue).first():
        print("Database already seeded!")
        return

    print("Seeding issues...")
    issues = [
        models.Issue(
            title="Massive Pothole on Main St",
            description="There is a very deep pothole causing damage to cars. Please fix urgently.",
            issue_type="pothole",
            area="North Ward",
            address="123 Main St, Near Central Park",
            latitude=28.7041,
            longitude=77.1025,
            status="New",
            severity="High",
            date_observed=date.today() - timedelta(days=2)
        ),
        models.Issue(
            title="Broken Traffic Signal",
            description="The traffic signal at the crossing is stuck on red.",
            issue_type="broken signal",
            area="South Ward",
            address="Intersection of 5th Ave and Elm St",
            status="In Progress",
            severity="Medium",
            date_observed=date.today() - timedelta(days=5)
        ),
        models.Issue(
            title="Severe Waterlogging",
            description="Drain is blocked, causing flooding after rain.",
            issue_type="waterlogging",
            area="East Ward",
            address="Market Road",
            status="Resolved",
            severity="High",
            date_observed=date.today() - timedelta(days=10)
        ),
        models.Issue(
            title="Street Light Not Working",
            description="Entire street is dark at night, causing safety concerns.",
            issue_type="poor lighting",
            area="North Ward",
            address="Oakwood Drive",
            status="New",
            severity="Low",
            date_observed=date.today() - timedelta(days=1)
        ),
    ]
    
    for issue in issues:
        db.add(issue)
        
    print("Seeding area spending data...")
    spendings = [
        models.AreaSpending(area="North Ward", budget_allocated=5000000, budget_spent=3200000, issues_resolved=145),
        models.AreaSpending(area="South Ward", budget_allocated=4500000, budget_spent=1500000, issues_resolved=89),
        models.AreaSpending(area="East Ward", budget_allocated=3000000, budget_spent=2800000, issues_resolved=210),
        models.AreaSpending(area="West Ward", budget_allocated=6000000, budget_spent=5000000, issues_resolved=302),
    ]
    
    for spending in spendings:
        db.add(spending)
        
    db.commit()
    db.close()
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_db()
