# RoadWatch - Hackathon Presentation Slides

*(You can copy and paste the text below into your PowerPoint slides.)*

---

## Slide 1 – Welcome

**Title:** RoadWatch – Citizen-Powered Road Quality and Transparency Platform
**Team:** [Your Team Name]
**Event:** National Road Safety Hackathon 2026 – AI in Road Safety
**Organizer:** IIT Madras – RBG Labs (Centre of Excellence for Road Safety)

---

## Slide 2 – Problem Statement

**Title:** The Challenge of Road Safety & Transparency

*   **Hazardous Conditions:** Poor road quality (potholes, waterlogging, poor lighting) directly contributes to severe accidents and daily inconvenience in India.
*   **Reporting Friction:** Citizens lack a simple, unified platform to report localized road issues to the correct municipal authorities.
*   **Opaque Maintenance:** There is limited transparency regarding public spending on road maintenance, leaving citizens unaware of how budgets are allocated and utilized.
*   **Delayed Action:** Without a centralized tracking system, many severe issues remain unresolved for months.

---

## Slide 3 – Proposed Solution

**Title:** Introducing RoadWatch

*   **Citizen Reporting:** A simple web interface for citizens to instantly report road issues with descriptions, categories, and specific locations.
*   **Live Tracking:** An interactive dashboard where users can view all reported issues in their area and track resolution statuses (New, In Progress, Resolved).
*   **Spending Transparency:** A dedicated analytics page bridging the gap between municipal budgets and actual on-ground repairs, displaying ward-wise budget allocations vs. issues resolved.
*   **Accessible to All:** No complex logins required for reporting, ensuring maximum civic participation.

---

## Slide 4 – System Architecture & Tech Stack

**Title:** Technical Architecture

*   **Frontend Layer:** Built with HTML5, modern CSS3 (Custom Variables & Flexbox), and Vanilla JavaScript for a lightweight, responsive, and accessible user interface.
*   **Backend API Layer:** Powered by **Python & FastAPI**, providing high-performance RESTful endpoints and automatic interactive documentation (Swagger UI).
*   **Database Layer:** **SQLite** paired with **SQLAlchemy ORM** for robust data modeling and easy deployment without complex infrastructure.
*   **Architecture Flow:** Client Browser ↔ REST APIs (JSON) ↔ FastAPI Router ↔ SQLAlchemy DB Session.

---

## Slide 5 – Demo Flow / User Journey

**Title:** How RoadWatch Works

*   **Step 1:** The citizen lands on the home page and learns about the platform's mission.
*   **Step 2:** They click "Report an Issue" and seamlessly submit details about a hazard (e.g., a deep pothole) using our streamlined form.
*   **Step 3:** The citizen browses the "View Issues" page, using built-in filters to find their report and monitor its status alongside community reports.
*   **Step 4:** Citizens and authorities access the "Analytics" dashboard to review total resolution rates and ward-level budget expenditures.

---

## Slide 6 – Impact & Future Scope

**Title:** Future Vision & Impact

*   **Immediate Impact:** Improves civic engagement, holds authorities accountable, and ultimately saves lives by highlighting critical road hazards faster.
*   **Future Scope 1 - AI Prioritization:** Implement Machine Learning to automatically categorize and prioritize issues based on severity and historical accident data.
*   **Future Scope 2 - Computer Vision:** Allow users to upload photos, using AI to verify the issue (e.g., pothole dimensions) before flagging authorities.
*   **Future Scope 3 - Open Gov Integration:** Connect directly with real municipal treasury APIs for live spending data.
*   **Future Scope 4 - Mobile App:** Launch native iOS and Android apps with GPS and push notifications.

---

## Slide 7 – Thank You

**Title:** Thank You!

*   "Making our roads safer, together."
*   **Contact Us:** [Your Email / LinkedIn Profile]
*   **Live Demo:** [Link to Demo or QR Code Placeholder]
*   *We are happy to take your questions!*
