// Base URL for API
const API_URL = '/api';

// DOM Elements
const issueForm = document.getElementById('issueForm');
const issuesTableBody = document.getElementById('issuesTableBody');
const filterStatus = document.getElementById('filterStatus');
const filterType = document.getElementById('filterType');
const filterArea = document.getElementById('filterArea');
const loader = document.getElementById('loader');
const toast = document.getElementById('toast');

// Utility to show toast
function showToast(message, isError = false) {
    toast.textContent = message;
    toast.style.backgroundColor = isError ? 'var(--danger)' : 'var(--success)';
    toast.className = "show";
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

// Utility to show/hide loader
function toggleLoader(show) {
    if (loader) {
        loader.style.display = show ? 'block' : 'none';
    }
}

// Format Date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Get Badge Class
function getBadgeClass(status) {
    switch(status.toLowerCase()) {
        case 'new': return 'badge-new';
        case 'in progress': return 'badge-progress';
        case 'resolved': return 'badge-resolved';
        default: return 'badge-new';
    }
}

// Submit Issue Form
if (issueForm) {
    issueForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = issueForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        const formData = new FormData(issueForm);
        const data = Object.fromEntries(formData.entries());
        
        // Handle optional dates
        if(!data.date_observed) {
            data.date_observed = new Date().toISOString().split('T')[0];
        }

        try {
            const response = await fetch(`${API_URL}/issues`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to submit issue');
            
            showToast('Issue reported successfully!');
            issueForm.reset();
        } catch (error) {
            console.error('Error:', error);
            showToast('Error reporting issue', true);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Report';
        }
    });
}

// Load Issues
async function loadIssues() {
    if (!issuesTableBody) return;
    
    toggleLoader(true);
    issuesTableBody.innerHTML = '';
    
    let url = `${API_URL}/issues?`;
    
    if (filterStatus && filterStatus.value) url += `status=${encodeURIComponent(filterStatus.value)}&`;
    if (filterType && filterType.value) url += `issue_type=${encodeURIComponent(filterType.value)}&`;
    if (filterArea && filterArea.value) url += `area=${encodeURIComponent(filterArea.value)}&`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch issues');
        
        const issues = await response.json();
        
        if (issues.length === 0) {
            issuesTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-light)">No issues found matching your criteria.</td></tr>';
            return;
        }
        
        issues.forEach(issue => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>#${issue.id}</td>
                <td><strong>${issue.title}</strong><br><small style="color: var(--text-light)">${issue.area}</small></td>
                <td style="text-transform: capitalize">${issue.issue_type}</td>
                <td><span class="badge ${getBadgeClass(issue.status)}">${issue.status}</span></td>
                <td>${formatDate(issue.date_observed)}</td>
                <td><button class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.875rem;" onclick="viewIssue(${issue.id})">Details</button></td>
            `;
            issuesTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        issuesTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--danger)">Error loading issues.</td></tr>';
    } finally {
        toggleLoader(false);
    }
}

// Attach listeners for filters
if (filterStatus || filterType || filterArea) {
    [filterStatus, filterType].forEach(el => {
        if(el) el.addEventListener('change', loadIssues);
    });
    if(filterArea) {
        // debounce text input
        let timeout;
        filterArea.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(loadIssues, 500);
        });
    }
}

// Initial load if on issues page
if (document.getElementById('issuesTableBody')) {
    loadIssues();
}

function viewIssue(id) {
    alert(`In a full implementation, this would open a modal with details for issue #${id}.`);
}

// Load Analytics
async function loadAnalytics() {
    const analyticsContainer = document.getElementById('analyticsData');
    const spendingContainer = document.getElementById('spendingData');
    if (!analyticsContainer || !spendingContainer) return;
    
    toggleLoader(true);
    
    try {
        const response = await fetch(`${API_URL}/analytics/summary`);
        if (!response.ok) throw new Error('Failed to fetch analytics');
        
        const data = await response.json();
        
        // Render Summary Stats
        let resolved = data.status_summary['Resolved'] || 0;
        let total = Object.values(data.status_summary).reduce((a, b) => a + b, 0);
        let resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;
        
        analyticsContainer.innerHTML = `
            <div class="stat-card card">
                <div class="stat-value">${total}</div>
                <div class="stat-label">Total Issues Reported</div>
            </div>
            <div class="stat-card card">
                <div class="stat-value">${resolved}</div>
                <div class="stat-label">Issues Resolved</div>
            </div>
            <div class="stat-card card">
                <div class="stat-value">${resolutionRate}%</div>
                <div class="stat-label">Resolution Rate</div>
            </div>
        `;
        
        // Render Spending Table
        let spendingHtml = `
            <table style="width: 100%;">
                <thead>
                    <tr>
                        <th>Area / Ward</th>
                        <th>Budget Allocated</th>
                        <th>Budget Spent</th>
                        <th>Issues Resolved</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        data.spending.forEach(item => {
            // Format currency loosely
            let alloc = '₹' + item.budget_allocated.toLocaleString('en-IN');
            let spent = '₹' + item.budget_spent.toLocaleString('en-IN');
            
            spendingHtml += `
                <tr>
                    <td><strong>${item.area}</strong></td>
                    <td>${alloc}</td>
                    <td>${spent}</td>
                    <td>${item.issues_resolved}</td>
                </tr>
            `;
        });
        
        spendingHtml += `</tbody></table>`;
        spendingContainer.innerHTML = spendingHtml;
        
    } catch (error) {
        console.error('Error:', error);
        analyticsContainer.innerHTML = '<p style="color: var(--danger)">Error loading analytics.</p>';
    } finally {
        toggleLoader(false);
    }
}

// Initial load if on analytics page
if (document.getElementById('analyticsData')) {
    loadAnalytics();
}
