import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CategorySelector from "../components/complaints/CategorySelector";
import ComplaintForm from "../components/complaints/ComplaintForm";
import ComplaintsList from "../components/complaints/ComplaintsList";
import ComplaintStats from "../components/complaints/ComplaintStats";
import { loadFromStorage, saveToStorage, generateId } from "../utils/storage";

function ComplaintsPage() {
  const navigate = useNavigate();

  // null = category not chosen yet -> show CategorySelector
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [complaints, setComplaints] = useState(() => loadFromStorage("complaints", []));

  useEffect(() => saveToStorage("complaints", complaints), [complaints]);

  const handleSubmit = (complaintData) => {
    const newComplaint = {
      id: generateId(),
      ...complaintData,
      status: "Submitted",
      createdAt: Date.now(),
    };
    setComplaints((prev) => [newComplaint, ...prev]);
    setSelectedCategory(null); // back to category picker, form is done
  };

  const handleStatusChange = (id, newStatus) => {
    setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button onClick={() => navigate("/dashboard")} className="mb-6 text-blue-600 font-medium hover:underline">
        ← Back to Dashboard
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Complaint Portal</h1>
        <p className="text-gray-500 mb-6">File a complaint and track it through to resolution.</p>

        {/* Step 1 / 2: pick category, then fill out its form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          {selectedCategory === null ? (
            <CategorySelector onSelect={setSelectedCategory} />
          ) : (
            <ComplaintForm category={selectedCategory} onBack={() => setSelectedCategory(null)} onSubmit={handleSubmit} />
          )}
        </div>

        {/* Stats + My Complaints */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
        <ComplaintStats complaints={complaints} />

        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Complaints</h2>
        <ComplaintsList complaints={complaints} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}

export default ComplaintsPage;
