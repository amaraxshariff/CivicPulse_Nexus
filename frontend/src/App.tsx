import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('m1');

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 className="logo">CivicPulse Nexus</h2>
        <nav>
          <button className={activeTab === 'm1' ? 'active' : ''} onClick={() => setActiveTab('m1')}>Citizen & Grievance (M1)</button>
          <button className={activeTab === 'm2' ? 'active' : ''} onClick={() => setActiveTab('m2')}>Certificates (M2)</button>
          <button className={activeTab === 'm3' ? 'active' : ''} onClick={() => setActiveTab('m3')}>Welfare (M3)</button>
          <button className={activeTab === 'm4' ? 'active' : ''} onClick={() => setActiveTab('m4')}>Governance Analytics (M4)</button>
        </nav>
      </div>
      <div className="main-content">
        <header>
          <h1>Smart Governance Dashboard</h1>
          <div className="user-profile">Admin | Logout</div>
        </header>
        <div className="dashboard-content">
          {activeTab === 'm1' && <Milestone1 />}
          {activeTab === 'm2' && <Milestone2 />}
          {activeTab === 'm3' && <Milestone3 />}
          {activeTab === 'm4' && <Milestone4 />}
        </div>
      </div>
    </div>
  )
}

function Milestone1() {
  return (
    <div className="module">
      <h3>Citizen & Grievance Management</h3>
      <div className="stats">
        <div className="stat-card"><h4>Registered Citizens</h4><p>2.4M</p></div>
        <div className="stat-card"><h4>Grievances/Month</h4><p>12.4K</p></div>
        <div className="stat-card"><h4>Resolution Rate</h4><p>94%</p></div>
      </div>
      <div className="data-table">
        <h4>Recent Grievances</h4>
        <table>
          <thead><tr><th>ID</th><th>Citizen</th><th>Category</th><th>Status</th><th>SLA</th></tr></thead>
          <tbody>
            <tr><td>GRV-2024-847</td><td>Ramesh Kumar</td><td>Water Supply</td><td><span className="status-badge progress">In Progress</span></td><td>2 days</td></tr>
            <tr><td>GRV-2024-848</td><td>Priya Sharma</td><td>Street Light</td><td><span className="status-badge resolved">Resolved</span></td><td>0 days</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Milestone2() {
  return (
    <div className="module">
      <h3>Certificate & Permit Management</h3>
      <div className="stats">
        <div className="stat-card"><h4>Applications/Month</h4><p>24.7K</p></div>
        <div className="stat-card"><h4>Avg Approval Time</h4><p>2.4 days</p></div>
        <div className="stat-card"><h4>Certificates Issued</h4><p>847K</p></div>
      </div>
      <div className="data-table">
        <h4>Recent Applications</h4>
        <table>
          <thead><tr><th>ID</th><th>Applicant</th><th>Type</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>APP-2024-1247</td><td>Priya Sharma</td><td>Birth Certificate</td><td><span className="status-badge approved">Approved</span></td><td><button>View</button></td></tr>
            <tr><td>APP-2024-1248</td><td>Amit Patel</td><td>Trade License</td><td><span className="status-badge pending">Pending</span></td><td><button>Review</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Milestone3() {
  return (
    <div className="module">
      <h3>Welfare & Budget Management</h3>
      <div className="stats">
        <div className="stat-card"><h4>Beneficiaries</h4><p>247K</p></div>
        <div className="stat-card"><h4>Funds Disbursed</h4><p>$24.7M</p></div>
        <div className="stat-card"><h4>Budget Utilized</h4><p>87%</p></div>
      </div>
      <div className="data-table">
        <h4>Welfare Schemes</h4>
        <table>
          <thead><tr><th>Scheme Name</th><th>Beneficiaries</th><th>Allocated</th><th>Disbursed</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>PM Awas Yojana</td><td>2,847</td><td>$2.4M</td><td>$2.1M</td><td><span className="status-badge active">Active</span></td></tr>
            <tr><td>Student Scholarship</td><td>15,000</td><td>$5.0M</td><td>$4.8M</td><td><span className="status-badge active">Active</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const DEPARTMENTS = [
  { name: 'Water', pct: 94 },
  { name: 'Health', pct: 91 },
  { name: 'Education', pct: 89 },
];

const MONTHLY_REVENUE = [0.8, 0.9, 1.0, 0.95, 1.1, 1.05, 1.2, 1.1, 1.0, 1.15, 1.0, 1.1];
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function Milestone4() {
  const [drill, setDrill] = useState(false);
  const [message, setMessage] = useState('');

  const notify = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 2000);
  };

  const exportReport = () => {
    const rows = [
      ['Metric', 'Value'],
      ['Citizen Satisfaction', '4.7/5'],
      ['Service SLA', '94%'],
      ['Revenue Collected', '$12.4M'],
      ['Service Requests', '24.7K'],
      ['Grievances Filed', '12.4K'],
      ['Budget Utilization', '87%'],
      ...DEPARTMENTS.map((d) => [`${d.name} Performance`, `${d.pct}%`]),
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'governance-report.csv';
    link.click();
    URL.revokeObjectURL(url);
    notify('Report exported');
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      notify('Link copied');
    } catch {
      notify('Could not copy the link');
    }
  };

  const maxRevenue = Math.max(...MONTHLY_REVENUE);

  return (
    <div className="module">
      <div className="module-head">
        <h3>Executive Dashboard & Reports</h3>
        <div className="actions">
          {message && <span className="action-message">{message}</span>}
          <button onClick={exportReport}>Export Report</button>
          <button onClick={() => setDrill(!drill)}>{drill ? 'Hide Drill Down' : 'Drill Down'}</button>
          <button onClick={share}>Share</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card"><h4>Citizen Satisfaction</h4><p>4.7/5</p></div>
        <div className="stat-card"><h4>Service SLA</h4><p>94%</p></div>
        <div className="stat-card"><h4>Revenue Collected</h4><p>$12.4M</p></div>
      </div>

      <div className="data-table">
        <h4>Analytics Dashboard: Governance 87%</h4>
        <table>
          <thead><tr><th>Report</th><th>Summary</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Service Metrics</td><td>24.7K requests, 94% resolved</td><td><span className="status-badge resolved">94%</span></td></tr>
            <tr><td>Grievance Analytics</td><td>12.4K filed, 96% resolved, avg 3.4 days</td><td><span className="status-badge resolved">96%</span></td></tr>
            <tr><td>Revenue Tracking</td><td>$12.4M total (Property Tax 67%, Licenses 23%)</td><td><span className="status-badge active">On track</span></td></tr>
            <tr><td>Budget Utilization</td><td>87% of budget used</td><td><span className="status-badge progress">87%</span></td></tr>
            <tr><td>Citizen Satisfaction</td><td>4.7/5, complaints down 23%</td><td><span className="status-badge approved">Improving</span></td></tr>
          </tbody>
        </table>
      </div>

      {drill && (
        <div className="drill-grid">
          <div className="data-table">
            <h4>Department Performance</h4>
            {DEPARTMENTS.map((d) => (
              <div className="bar-row" key={d.name}>
                <span className="bar-label">{d.name}</span>
                <div className="bar-track" role="img" aria-label={`${d.name} ${d.pct}%`}>
                  <div className="bar-fill" style={{ width: `${d.pct}%` }} />
                </div>
                <span className="bar-value">{d.pct}%</span>
              </div>
            ))}
          </div>

          <div className="data-table">
            <h4>Monthly Revenue ($M)</h4>
            <svg viewBox="0 0 260 100" className="revenue-chart" role="img" aria-label="Monthly revenue in millions">
              {MONTHLY_REVENUE.map((v, i) => {
                const h = (v / maxRevenue) * 65;
                return (
                  <g key={i}>
                    <rect x={i * 21 + 4} y={78 - h} width="15" height={h} rx="2" fill="#059669" />
                    <text x={i * 21 + 11.5} y="92" textAnchor="middle" fontSize="7" fill="#64748b">
                      {MONTH_LABELS[i]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
