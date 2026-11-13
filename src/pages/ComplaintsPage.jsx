import { useState, useMemo } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { CategorySelector, COMPLAINT_CATEGORIES } from '../components/complaints/CategorySelector';
import { ComplaintForm } from '../components/complaints/ComplaintForm';
import { ComplaintsList } from '../components/complaints/ComplaintsList';
import { ComplaintStats } from '../components/complaints/ComplaintStats';
import '../components/complaints/Complaints.css';

// Pre-seeded campus complaints baseline
const INITIAL_COMPLAINTS = [
  {
    id: 'CMP-2026-001',
    subject: 'Hostel Block B 3rd Floor Water Cooler Not Cooling',
    description: 'The primary drinking water dispenser has been blowing warm water for 4 days.',
    categoryId: 'hostel',
    categoryName: 'Hostel',
    categoryIcon: '🏢',
    categoryColor: '#6B1E2D',
    location: 'Hostel Block B Wing 3',
    date: '2026-06-02',
    status: 'Pending',
    priority: 'High'
  },
  {
    id: 'CMP-2026-002',
    subject: 'Wi-Fi Captive Portal Login Failure in Central Library',
    description: 'Authentication server drops connection every 5 minutes during research hours.',
    categoryId: 'wifi',
    categoryName: 'Wi-Fi & Network',
    categoryIcon: '📶',
    categoryColor: '#48121E',
    location: 'Central Library 2nd Floor',
    date: '2026-06-03',
    status: 'In Progress',
    priority: 'Urgent'
  },
  {
    id: 'CMP-2026-003',
    subject: 'Classroom JAO 201 Projector HDMI Port Damaged',
    description: 'Students cannot present slides; HDMI pin connector broken.',
    categoryId: 'classroom',
    categoryName: 'Classroom & Labs',
    categoryIcon: '🏫',
    categoryColor: '#6B1E2D',
    location: 'Academic Block A Room 201',
    date: '2026-05-28',
    status: 'Resolved',
    priority: 'Medium'
  },
  {
    id: 'CMP-2026-004',
    subject: 'Mess Lunch Food Quality & Hygiene Inspection Request',
    description: 'Undercooked rice and lukewarm dal served on Monday afternoon.',
    categoryId: 'mess',
    categoryName: 'Mess & Canteen',
    categoryIcon: '🍽️',
    categoryColor: '#B8A08A',
    location: 'Central Mess 1',
    date: '2026-06-05',
    status: 'Pending',
    priority: 'High'
  },
  {
    id: 'CMP-2026-005',
    subject: 'Late Evening Campus Shuttle Bus Not Arriving on Schedule',
    description: 'The 8:30 PM shuttle to North Campus metro was cancelled without prior notification.',
    categoryId: 'transportation',
    categoryName: 'Transportation',
    categoryIcon: '🚌',
    categoryColor: '#06b6d4',
    location: 'Main Gate Bus Stop',
    date: '2026-06-01',
    status: 'Resolved',
    priority: 'Low'
  }
];

export function ComplaintsPage() {
  const { user } = useAuth();
  const { t } = useLanguage();

  // Initialize from localStorage key 'unisphere_complaints'
  const [complaints, setComplaints] = useState(() => {
    try {
      const saved = localStorage.getItem('unisphere_complaints');
      return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
    } catch {
      return INITIAL_COMPLAINTS;
    }
  });

  const [activeTab, setActiveTab] = useState('file'); // 'file' | 'list' | 'stats'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Points and Metrics Calculation
  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((c) => c.status === 'Pending').length;
    const resolved = complaints.filter((c) => c.status === 'Resolved').length;
    const inProgress = complaints.filter((c) => c.status === 'In Progress').length;
    const submitted = complaints.filter((c) => c.status === 'Submitted').length;

    const pendingPoints = pending * 1;
    const resolvedPoints = resolved * -1;
    const netPoints = pendingPoints + resolvedPoints;
    const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

    const categoryCounts = COMPLAINT_CATEGORIES.map((cat) => {
      const count = complaints.filter((c) => c.categoryId === cat.id).length;
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
      return { ...cat, count, percentage };
    });

    return {
      total,
      pending,
      resolved,
      inProgress,
      submitted,
      pendingPoints,
      resolvedPoints,
      netPoints,
      resolutionRate,
      categoryCounts
    };
  }, [complaints]);

  // Genuinely unique ticket ID generator that prevents collisions
  const generateUniqueTicketId = (list) => {
    const year = new Date().getFullYear();
    const existingIds = new Set(list.map((c) => c.id));
    const maxNum = list.reduce((max, c) => {
      const match = (c.id || '').match(/CMP-\d+-(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        return num > max ? num : max;
      }
      return max;
    }, 0);

    let nextNum = maxNum + 1;
    let candidate = `CMP-${year}-${String(nextNum).padStart(3, '0')}`;
    while (existingIds.has(candidate)) {
      nextNum += 1;
      candidate = `CMP-${year}-${String(nextNum).padStart(3, '0')}`;
    }
    return candidate;
  };

  const handleAddComplaint = (formData) => {
    const newTicket = {
      ...formData,
      studentName: formData.studentName || user?.name || 'Student',
      studentRoll: user?.rollNo || '2024-CSE-042',
      id: generateUniqueTicketId(complaints),
      status: 'Submitted',
      createdAt: new Date().toISOString()
    };
    const updated = [newTicket, ...complaints];
    setComplaints(updated);
    try {
      localStorage.setItem('unisphere_complaints', JSON.stringify(updated));
    } catch (e) {
      console.warn('Unable to persist complaint to localStorage:', e);
    }
    setSelectedCategory(null);
    setActiveTab('list');
    showToast(`Complaint registered successfully as #${newTicket.id}`);
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = complaints.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    setComplaints(updated);
    try {
      localStorage.setItem('unisphere_complaints', JSON.stringify(updated));
    } catch (e) {
      console.warn('Unable to update complaint status in localStorage:', e);
    }
    showToast(`Status updated to ${newStatus}`);
  };

  const handleDeleteComplaint = (id) => {
    if (!window.confirm('Are you sure you want to delete this complaint record?')) return;
    const updated = complaints.filter((c) => c.id !== id);
    setComplaints(updated);
    try {
      localStorage.setItem('unisphere_complaints', JSON.stringify(updated));
    } catch (e) {
      console.warn('Unable to delete complaint from localStorage:', e);
    }
    showToast('Complaint removed');
  };

  return (
    <AppLayout activePath="/complaints">
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="animate-fade-in complaint-toast">
          {toastMessage}
        </div>
      )}

      {/* Top Header Bar */}
      <header className="app-top-header">
        <div className="app-top-header-left">
          <div className="app-top-header-icon">
            <span className="complaint-header-emoji">📢</span>
          </div>
          <div>
            <h1 className="app-top-header-title">{t("complaints.title", "Grievances & Redressal Portal")}</h1>
            <p className="app-top-header-subtitle">{t("complaints.subtitle", "Campus Facilities, Labs, Hostels & Administration")}</p>
          </div>
        </div>

        <div className="app-top-header-right">
          <span className="unisphere-badge unisphere-badge-success">
            <span className="complaint-status-dot" />
            <span>{t("complaints.pendingBadge", `${stats.pending} Pending • ${stats.resolved} Resolved`)}</span>
          </span>
          <div className="complaint-user-summary">
            <div className="complaint-user-initials">
              {user?.initials || 'ST'}
            </div>
            <span>{user?.name || 'Student'}</span>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="app-content-container">
        {/* Navigation Tabs Bar */}
        <div className="complaint-page-toolbar">
          <div className="unisphere-tabs-bar">
            <button
              onClick={() => {
                setActiveTab('file');
                setSelectedCategory(null);
              }}
              className={`unisphere-tab-pill ${activeTab === 'file' ? 'active' : ''}`}
            >
              <span>✍️ {t("complaints.fileTab", "File a Complaint")}</span>
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`unisphere-tab-pill ${activeTab === 'list' ? 'active' : ''}`}
            >
              <span>📋 {t("complaints.listTab", "Track Complaints")} ({complaints.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`unisphere-tab-pill ${activeTab === 'stats' ? 'active' : ''}`}
            >
              <span>📊 {t("complaints.statsTab", "Resolution Analytics")}</span>
            </button>
          </div>

          <button
            onClick={() => {
              setSelectedCategory(null);
              setActiveTab('file');
            }}
            className="unisphere-btn unisphere-btn-primary"
          >
            <span>+ New Complaint</span>
          </button>
        </div>

        {/* Tab 1: File Complaint View */}
        {activeTab === 'file' && (
          <div className="complaint-file-view">
            {!selectedCategory ? (
              <CategorySelector
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
              />
            ) : (
              <ComplaintForm
                category={selectedCategory}
                onSubmit={handleAddComplaint}
                onCancel={() => setSelectedCategory(null)}
                onChangeCategory={() => setSelectedCategory(null)}
              />
            )}
          </div>
        )}

        {/* Tab 2: Complaints List */}
        {activeTab === 'list' && (
          <ComplaintsList
            complaints={complaints}
            onStatusChange={handleStatusChange}
            onDeleteComplaint={handleDeleteComplaint}
            onNewComplaintClick={() => setActiveTab('file')}
          />
        )}

        {/* Tab 3: Analytics & Stats */}
        {activeTab === 'stats' && <ComplaintStats stats={stats} />}
      </main>
    </AppLayout>
  );
}

export default ComplaintsPage;
