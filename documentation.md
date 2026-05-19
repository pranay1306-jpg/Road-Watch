# RoadWatch - Project Documentation

**Project Name:** RoadWatch
**Event:** National Road Safety Hackathon 2026
**Team:** [Your Team Name]

---

## Abstract

Road accidents and structural damage are pressing issues in urban and rural India, often exacerbated by delayed maintenance and a lack of reporting mechanisms. RoadWatch is a citizen-centric web platform that empowers the public to report road hazards—such as potholes, waterlogging, and broken signals—while simultaneously tracking the status of these reports. Furthermore, RoadWatch introduces an innovative transparency dashboard that links municipal road maintenance budgets to actual on-ground issue resolutions, fostering civic engagement and government accountability.

## Problem Background

Despite significant investments in road infrastructure, road quality remains a critical safety concern. The primary challenges include:
1. **Reporting Bottlenecks:** Citizens observe hazards daily but lack a streamlined, accessible tool to notify authorities.
2. **Lack of Transparency:** Budget allocations for ward-wise road maintenance are often opaque. Citizens do not know if funds are being utilized effectively to solve local problems.
3. **Inefficient Prioritization:** Without centralized data, authorities struggle to identify clusters of severe road issues.

Empowering citizens to report issues directly translates to faster response times and safer roads.

## Solution Overview

RoadWatch addresses these challenges through a unified platform featuring:
*   **Issue Reporting:** A simple, no-login form for citizens to log road defects, complete with categorization and location details.
*   **Issue Tracking:** A public ledger of all reported issues, sortable and filterable by status (New, In Progress, Resolved), type, and area.
*   **Transparency Analytics:** A dashboard that aggregates reported data against (mocked) municipal spending data, showcasing how many issues a specific ward has resolved versus its allocated budget.

## System Architecture

The application follows a classic Client-Server architecture:
*   **Client (Frontend):** A responsive, static web interface (HTML/CSS/JS) runs in the user's browser. It communicates with the backend exclusively via asynchronous RESTful HTTP requests (AJAX/Fetch API).
*   **Server (Backend):** A Python-based server handles routing, data validation, and business logic. It exposes REST API endpoints that the frontend consumes.
*   **Database:** A relational database stores issue reports and public spending metrics. The backend communicates with the database using an Object-Relational Mapper (ORM) to ensure secure and structured queries.

## Technology Stack

*   **Frontend:** HTML5, CSS3 (Vanilla, custom modern design with flexbox and CSS variables), Vanilla JavaScript. No heavy frameworks were used to ensure maximum performance and simplicity.
*   **Backend:** **Python 3** with **FastAPI**. FastAPI was selected for its exceptional performance, built-in data validation (via Pydantic), and automatic generation of interactive OpenAPI (Swagger) documentation—ideal for hackathon demonstrations.
*   **Database & ORM:** **SQLite** paired with **SQLAlchemy**. SQLite provides a zero-configuration, file-based database perfect for prototyping, while SQLAlchemy ensures code is easily migratable to PostgreSQL or MySQL in production.

## Data Model

The database comprises two primary tables:

**1. `issues` Table**
*   `id` (Integer, Primary Key): Unique identifier.
*   `title` (String): Short summary of the problem.
*   `description` (Text): Detailed explanation.
*   `issue_type` (String): Categorization (e.g., pothole, broken signal).
*   `area` (String): Locality or ward name.
*   `address` (Text): Specific location details.
*   `status` (String): Current resolution stage (New, In Progress, Resolved). Default is 'New'.
*   `severity` (String): Low, Medium, High.
*   `date_observed` (Date): When the citizen noticed the issue.
*   `created_at` (DateTime): System timestamp of submission.

**2. `area_spending` Table (Mock Data for Transparency)**
*   `id` (Integer, Primary Key).
*   `area` (String): Matches the area in the issues table.
*   `budget_allocated` (Float): Total budget for the ward.
*   `budget_spent` (Float): Budget utilized so far.
*   `issues_resolved` (Integer): Count of successful interventions.

## Implementation Details

**Project Structure:**
The codebase is modular. `main.py` initializes the FastAPI application and defines the routing endpoints. `models.py` contains the SQLAlchemy DB schemas, while `schemas.py` holds the Pydantic models used for strict request/response data validation. Static HTML, CSS, and JS files reside in the `static/` directory and are served directly by FastAPI.

**Key Endpoints:**
*   `POST /api/issues`: Accepts JSON payloads, validates them against Pydantic schemas, and inserts a new row into the DB.
*   `GET /api/issues`: Retrieves all issues, accepting query parameters (`status`, `type`, `area`) to perform server-side filtering via SQLAlchemy.
*   `GET /api/analytics/summary`: Performs SQL aggregation (GROUP BY) to return counts of issues by status and type, alongside the ward spending data.

## How to Run the Project

Follow these steps to run the RoadWatch prototype locally:

1.  **Environment Setup:** Ensure Python 3.8+ is installed on your machine.
2.  **Navigate to Directory:** Open your terminal and navigate to the `RoadWatch` directory.
3.  **Install Dependencies:** Run the following command to install required packages:
    ```bash
    pip install -r requirements.txt
    ```
4.  **Initialize Database:** Run the seed script to create the SQLite database and populate it with mock demo data:
    ```bash
    python app/seed.py
    ```
5.  **Start the Server:** Launch the FastAPI application using Uvicorn:
    ```bash
    uvicorn app.main:app --reload
    ```
6.  **Access the Application:** Open your web browser and go to `http://127.0.0.1:8000`. You can also view the auto-generated API documentation at `http://127.0.0.1:8000/docs`.

## Testing & Limitations

**Testing:** 
Manual end-to-end testing was performed. Forms were tested for correct data submission and validation. API endpoints were tested using the built-in Swagger UI. Filters on the 'View Issues' page were verified to ensure accurate data retrieval.

**Limitations:**
*   **Authentication:** The prototype currently lacks an authentication system for government officials to update issue statuses securely.
*   **Mock Data:** The public spending data is statically mocked to demonstrate the concept.
*   **Image Uploads:** The schema supports image URLs, but the frontend currently does not handle physical image file uploads to cloud storage (e.g., AWS S3).

## Future Work

*   **AI Integration (Computer Vision):** Allow users to upload photos of potholes. An AI model could automatically estimate the size/depth of the pothole and assign a severity score, filtering out fake reports.
*   **Predictive Analytics:** Use historical data to predict which roads are most likely to suffer damage during the monsoon season.
*   **Government API Integration:** Replace mock spending data with live data fetched from municipal open-data portals.
*   **Mobile Application:** Develop a React Native or Flutter mobile app to utilize native device GPS and cameras for frictionless reporting.

## Conclusion

RoadWatch aligns perfectly with the National Road Safety Hackathon's goal of leveraging technology for safer roads. By combining frictionless citizen reporting with powerful transparency metrics, RoadWatch not only identifies hazards before they cause accidents but also promotes a culture of civic responsibility and governmental accountability.
