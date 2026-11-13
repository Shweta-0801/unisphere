import React, { useState, useEffect } from "react";
import "../components/lostfound/LostFound.css";

import CampusMap from "../components/lostfound/CampusMap";
import MyReportsPoints from "../components/lostfound/MyReportsPoints";
import ReportItemForm from "../components/lostfound/ReportItemForm";

// Campus Building Map Coordinates
const CAMPUS_BUILDINGS = [
  {
    id: "main-gate",
    name: "Main Gate",
    x: 12,
    y: 78,
    width: 14,
    height: 14,
    tag: "Campus Entry",
  },
  {
    id: "academic-block",
    name: "Academic Block",
    x: 20,
    y: 25,
    width: 18,
    height: 20,
    tag: "Lectures & Labs",
  },
  {
    id: "library",
    name: "Library",
    x: 44,
    y: 40,
    width: 16,
    height: 18,
    tag: "Central Study",
  },
  {
    id: "turing-block",
    name: "Turing Block",
    x: 68,
    y: 20,
    width: 18,
    height: 20,
    tag: "CS & Tech Labs",
  },
  {
    id: "cafeteria",
    name: "Cafeteria",
    x: 38,
    y: 74,
    width: 16,
    height: 15,
    tag: "Food & Dining",
  },
  {
    id: "hostel",
    name: "Hostel",
    x: 74,
    y: 68,
    width: 16,
    height: 18,
    tag: "Student Residence",
  },
  {
    id: "sports-ground",
    name: "Sports Ground",
    x: 80,
    y: 40,
    width: 14,
    height: 18,
    tag: "Athletics Turf",
  },
];

const LOCATION_COORDINATES = {
  Library: { x: 50, y: 48 },
  "Turing Block": { x: 74, y: 28 },
  "Academic Block": { x: 28, y: 34 },
  Cafeteria: { x: 45, y: 80 },
  Hostel: { x: 80, y: 76 },
  "Main Gate": { x: 18, y: 84 },
  "Sports Ground": { x: 86, y: 48 },
};

const DEFAULT_REPORTS = [
  {
    id: "rep-1",
    type: "lost",
    itemName: "Casio Scientific Calculator",
    description: "Black Casio fx-991EX calculator with blue sticker on the back. Left on desk row 4.",
    location: "Turing Block",
    markerNote: "Reported missing in Turing Block Room 204",
    photo: null,
    createdAt: Date.now() - 1.2 * 60 * 60 * 1000,
    status: "active",
    reportedBy: "Aanvi Palia",
    pointsAwarded: false,
  },
  {
    id: "rep-2",
    type: "found",
    itemName: "Stainless Steel Water Bottle",
    description: "Silver Milton 750ml insulated bottle found on study desk.",
    location: "Library",
    markerNote: "Found near Library 1st Floor Study Hall",
    photo: null,
    createdAt: Date.now() - 0.8 * 60 * 60 * 1000,
    status: "active",
    reportedBy: "Aanvi Palia",
    pointsAwarded: false,
  },
  {
    id: "rep-3",
    type: "lost",
    itemName: "College ID Card & Lanyard",
    description: "Blue UniSphere lanyard with CSE student RFID pass.",
    location: "Cafeteria",
    markerNote: "Lost near counter 2 during lunch hour",
    photo: null,
    createdAt: Date.now() - 2.1 * 60 * 60 * 1000,
    status: "active",
    reportedBy: "Rohan Sharma",
    pointsAwarded: false,
  },
  {
    id: "rep-4",
    type: "found",
    itemName: "Black Leather Wallet",
    description: "Black wallet containing student bus pass and metro card.",
    location: "Academic Block",
    markerNote: "Returned to owner via Academic Office",
    photo: null,
    createdAt: Date.now() - 4.5 * 60 * 60 * 1000,
    status: "resolved",
    reportedBy: "Aanvi Palia",
    pointsAwarded: true,
    receiverName: "Simran Kaur",
    receiverRollNo: "2024-CSE-112",
  },
];

function formatTimeAgo(timestamp) {
  const diff = Math.floor((Date.now() - timestamp) / (60 * 1000));
  if (diff < 2) return "Just now";
  if (diff < 60) return `${diff} mins ago`;
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  if (hours < 24) {
    return minutes > 0 ? `${hours}h ${minutes}m ago` : `${hours} hours ago`;
  }
  const days = Math.floor(hours / 24);
  return days === 1 ? "1 day ago" : `${days} days ago`;
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function LostFoundPage({ currentUser }) {
  const currentStudent = {
    name: currentUser?.name || "Aanvi Palia",
    rollNumber: currentUser?.rollNo || "2024-CSE-0892",
    department: currentUser?.department || "Computer Science & Engineering",
    semester: currentUser?.semester || "4th Semester",
  };

  const [activeSection, setActiveSection] = useState("map");

  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem("unisphere_lostfound_reports");
      return saved ? JSON.parse(saved) : DEFAULT_REPORTS;
    } catch {
      return DEFAULT_REPORTS;
    }
  });

  const [points, setPoints] = useState(() => {
    try {
      const saved = localStorage.getItem("unisphere_aanvi_points") || localStorage.getItem("unisphere_alex_points");
      return saved !== null ? parseInt(saved, 10) : 900;
    } catch {
      return 900;
    }
  });

  const [reward, setReward] = useState(() => {
    try {
      const saved = localStorage.getItem("unisphere_food_reward");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [mapFilter, setMapFilter] = useState("all");
  const [selectedMarkerReport, setSelectedMarkerReport] = useState(null);
  const [reportsFilter, setReportsFilter] = useState("all");

  // Form State
  const [formType, setFormType] = useState("lost");
  const [formItemName, setFormItemName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLocation, setFormLocation] = useState("Library");
  const [formMarkerNote, setFormMarkerNote] = useState("");
  const [formPhoto, setFormPhoto] = useState(null);
  const [formError, setFormError] = useState("");

  // Receiver Confirmation Workflow State
  const [confirmingItem, setConfirmingItem] = useState(null);
  const [receiverName, setReceiverName] = useState("");
  const [receiverRollNo, setReceiverRollNo] = useState("");
  const [receiverNote, setReceiverNote] = useState("");
  const [receiverAcknowledged, setReceiverAcknowledged] = useState(false);
  const [confirmationError, setConfirmationError] = useState("");

  // Toast State
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("unisphere_lostfound_reports", JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem("unisphere_aanvi_points", points.toString());
  }, [points]);

  useEffect(() => {
    if (reward) {
      localStorage.setItem("unisphere_food_reward", JSON.stringify(reward));
    }
  }, [reward]);

  // Automatic Reward Unlock at 1,000 Points
  useEffect(() => {
    if (points >= 1000 && !reward) {
      const issuedAt = Date.now();
      const newReward = {
        id: "rew-" + Date.now().toString(36),
        outlet: "Campus Food Court & Cafe",
        discount: "25% OFF Meal Voucher (Max â‚¹100)",
        voucherCode: "UNIS-FOOD-" + Math.floor(1000 + Math.random() * 9000),
        issuedAt,
        expiresAt: issuedAt + 24 * 60 * 60 * 1000, // Exactly 1-day (24 hours) validity
        validityHours: 24,
      };
      setReward(newReward);
      showToast("ðŸŽ‰ Congratulations! You reached 1,000 points and unlocked a 1-day Campus Food Voucher!");
    }
  }, [points, reward]);

  const THREE_HOURS = 3 * 60 * 60 * 1000;
  const isReportExpired = (item) => Date.now() - item.createdAt > THREE_HOURS;
  const isRewardExpired = reward ? Date.now() > reward.expiresAt : false;

  const activeMapReports = reports.filter((item) => {
    if (item.status === "resolved") return false;
    if (isReportExpired(item)) return false;
    if (mapFilter === "lost") return item.type === "lost";
    if (mapFilter === "found") return item.type === "found";
    return true;
  });

  const resolvedCount = reports.filter((r) => r.status === "resolved").length;

  // Open Receiver Confirmation Modal
  const handleInitiateResolve = (reportId, reportItem) => {
    const target = reportItem || reports.find((item) => item.id === reportId);
    if (!target) return;
    setConfirmingItem(target);
    setReceiverName("");
    setReceiverRollNo("");
    setReceiverNote("");
    setReceiverAcknowledged(false);
    setConfirmationError("");
  };

  // Confirm Receiver & Handover Action -> Awards 100 Points
  const handleConfirmHandover = (e) => {
    e.preventDefault();
    if (!receiverName.trim()) {
      setConfirmationError("Please enter the receiver student's name.");
      return;
    }
    if (!receiverRollNo.trim()) {
      setConfirmationError("Please enter the receiver's student roll / ID number.");
      return;
    }
    if (!receiverAcknowledged) {
      setConfirmationError("Please check the verification acknowledgment box.");
      return;
    }

    const reportId = confirmingItem.id;
    const shouldAward = !confirmingItem.pointsAwarded;

    setReports((current) =>
      current.map((item) =>
        item.id === reportId
          ? {
              ...item,
              status: "resolved",
              pointsAwarded: true,
              receiverName: receiverName.trim(),
              receiverRollNo: receiverRollNo.trim(),
              handoverNote: receiverNote.trim() || "Item verified and handed over successfully.",
              resolvedAt: Date.now(),
            }
          : item
      )
    );

    if (selectedMarkerReport && selectedMarkerReport.id === reportId) {
      setSelectedMarkerReport({
        ...selectedMarkerReport,
        status: "resolved",
        pointsAwarded: true,
        receiverName: receiverName.trim(),
        receiverRollNo: receiverRollNo.trim(),
      });
    }

    if (shouldAward) {
      setPoints((current) => current + 100);
      showToast(`âœ“ Receiver verified! +100 Points awarded to ${currentStudent.name}.`);
    } else {
      showToast("Item marked as resolved.");
    }

    setConfirmingItem(null);
  };

  // Photo Upload Handler
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  // Create Report Handler
  const handleCreateReport = (e) => {
    e.preventDefault();
    if (!formItemName.trim()) {
      setFormError("Please enter the item name.");
      return;
    }
    if (!formDescription.trim()) {
      setFormError("Please enter an item description.");
      return;
    }
    if (!formMarkerNote.trim()) {
      setFormError("Please add a short note for the map marker.");
      return;
    }

    const newReport = {
      id: "rep-" + Date.now().toString(36),
      type: formType,
      itemName: formItemName.trim(),
      description: formDescription.trim(),
      location: formLocation,
      markerNote: formMarkerNote.trim(),
      photo: formPhoto,
      createdAt: Date.now(),
      status: "active",
      reportedBy: currentStudent.name,
      pointsAwarded: false,
    };

    setReports((current) => [newReport, ...current]);
    setFormItemName("");
    setFormDescription("");
    setFormMarkerNote("");
    setFormPhoto(null);
    setFormError("");
    setActiveSection("map");
    showToast(`âœ“ ${formType === "lost" ? "Lost" : "Found"} report published! Marker active on campus map.`);
  };

  return (
    <div className="lostfound-portal-wrapper">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="lostfound-toast">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="lostfound-top-bar">
        <div className="lostfound-top-left">
          <div className="lostfound-top-icon">
            <span>ðŸ“ </span>
          </div>
          <div>
            <h1 className="lostfound-top-title">Lost &amp; Found Portal</h1>
            <p className="lostfound-top-subtitle">
              Campus Belongings Network â€¢ Red Pins for Lost, Green for Found
            </p>
          </div>
        </div>

        <div className="lostfound-top-right">
          <div className="lostfound-top-user">
            <div className="lostfound-top-avatar">
              {currentStudent.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="lostfound-user-details">
              <span className="lostfound-user-name">{currentStudent.name}</span>
              <span className="lostfound-user-role">{currentStudent.rollNumber}</span>
            </div>
          </div>
          <div className="points-pill-badge">
            <span className="points-star">â­ </span>
            <span className="points-count">{points} Pts</span>
          </div>
        </div>
      </header>

      <div className="lostfound-container">
        {/* Navigation Tabs */}
        <div className="lostfound-tabs-nav">
          <button
            type="button"
            className={`lostfound-tab-btn ${activeSection === "map" ? "active" : ""}`}
            onClick={() => setActiveSection("map")}
          >
            ðŸ—ºï¸  Campus Map &amp; Listings
          </button>

          <button
            type="button"
            className={`lostfound-tab-btn ${activeSection === "report" ? "active" : ""}`}
            onClick={() => setActiveSection("report")}
          >
            âž• Report Item
          </button>

          <button
            type="button"
            className={`lostfound-tab-btn ${activeSection === "my-reports" ? "active" : ""}`}
            onClick={() => setActiveSection("my-reports")}
          >
            ðŸ“‹ My Reports ({reports.length})
          </button>

          <button
            type="button"
            className={`lostfound-tab-btn ${activeSection === "my-points" ? "active" : ""}`}
            onClick={() => setActiveSection("my-points")}
          >
            ðŸŽ  My Points &amp; Rewards ({points} Pts)
          </button>
        </div>

        {/* Section 1: Campus Map & Listings */}
        {activeSection === "map" && (
          <CampusMap
            activeMapReports={activeMapReports}
            mapFilter={mapFilter}
            setMapFilter={setMapFilter}
            selectedMarkerReport={selectedMarkerReport}
            setSelectedMarkerReport={setSelectedMarkerReport}
            handleMarkAsFound={handleInitiateResolve}
            campusBuildings={CAMPUS_BUILDINGS}
            locationCoordinates={LOCATION_COORDINATES}
            formatTimeAgo={formatTimeAgo}
            setActiveSection={setActiveSection}
          />
        )}

        {/* Section 2: Report Item Form */}
        {activeSection === "report" && (
          <ReportItemForm
            formType={formType}
            setFormType={setFormType}
            formItemName={formItemName}
            setFormItemName={setFormItemName}
            formDescription={formDescription}
            setFormDescription={setFormDescription}
            formLocation={formLocation}
            setFormLocation={setFormLocation}
            formMarkerNote={formMarkerNote}
            setFormMarkerNote={setFormMarkerNote}
            formPhoto={formPhoto}
            setFormPhoto={setFormPhoto}
            formError={formError}
            setFormError={setFormError}
            handlePhotoUpload={handlePhotoUpload}
            handleCreateReport={handleCreateReport}
          />
        )}

        {/* Section 3: My Reports (Separate View) */}
        {activeSection === "my-reports" && (
          <MyReportsPoints
            activeSection={activeSection}
            reports={reports}
            reportsFilter={reportsFilter}
            setReportsFilter={setReportsFilter}
            resolvedCount={resolvedCount}
            isReportExpired={isReportExpired}
            formatTimeAgo={formatTimeAgo}
            formatDate={formatDate}
            handleMarkAsFound={handleInitiateResolve}
            points={points}
            reward={reward}
            isRewardExpired={isRewardExpired}
            studentName={currentStudent.name}
          />
        )}

        {/* Section 4: My Points & Rewards (Separate View) */}
        {activeSection === "my-points" && (
          <MyReportsPoints
            activeSection={activeSection}
            reports={reports}
            reportsFilter={reportsFilter}
            setReportsFilter={setReportsFilter}
            resolvedCount={resolvedCount}
            isReportExpired={isReportExpired}
            formatTimeAgo={formatTimeAgo}
            formatDate={formatDate}
            handleMarkAsFound={handleInitiateResolve}
            points={points}
            reward={reward}
            isRewardExpired={isRewardExpired}
            studentName={currentStudent.name}
          />
        )}
      </div>

      {/* =======================================================
          RECEIVER CONFIRMATION & VERIFICATION MODAL
          Points are awarded ONLY AFTER receiver confirmation!
          ======================================================= */}
      {confirmingItem && (
        <div className="unisphere-modal-overlay">
          <div className="unisphere-modal-box">
            <div className="modal-top-bar">
              <div className="modal-type-wrap">
                <span className={`status-pill pill-${confirmingItem.type}`}>
                  {confirmingItem.type === "lost" ? "LOST ITEM RECOVERY" : "FOUND ITEM RETURN"}
                </span>
                <span className="modal-loc-tag">ðŸ“  {confirmingItem.location}</span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setConfirmingItem(null)}
              >
                âœ•
              </button>
            </div>

            <div className="receiver-modal-content">
              <h3 className="modal-heading">Receiver Confirmation &amp; Verification</h3>
              <p className="modal-subtitle">
                To prevent false claims and award the <strong>+100 Points</strong> reward, please record receiver verification details confirming the item was returned.
              </p>

              <div className="modal-item-summary">
                <div className="summary-field">
                  <span className="summary-label">Item:</span>
                  <span className="summary-val font-semibold">{confirmingItem.itemName}</span>
                </div>
                <div className="summary-field">
                  <span className="summary-label">Description:</span>
                  <span className="summary-val">{confirmingItem.description}</span>
                </div>
                <div className="summary-field">
                  <span className="summary-label">Original Reporter:</span>
                  <span className="summary-val">{confirmingItem.reportedBy}</span>
                </div>
              </div>

              {confirmationError && (
                <div className="form-error-alert" style={{ marginBottom: "1rem" }}>
                  <span>{confirmationError}</span>
                </div>
              )}

              <form onSubmit={handleConfirmHandover} className="receiver-confirmation-form">
                <div className="form-group">
                  <label className="form-label">
                    Receiver Full Name <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Sharma"
                    className="form-text-input"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Receiver Student Roll / ID No <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2024-CSE-089"
                    className="form-text-input"
                    value={receiverRollNo}
                    onChange={(e) => setReceiverRollNo(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Handover Location &amp; Remarks (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Handed over at Central Library Desk 14"
                    className="form-text-input"
                    value={receiverNote}
                    onChange={(e) => setReceiverNote(e.target.value)}
                  />
                </div>

                <div className="form-checkbox-group" style={{ margin: "1rem 0" }}>
                  <label className="checkbox-label" style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", cursor: "pointer", fontSize: "13px" }}>
                    <input
                      type="checkbox"
                      checked={receiverAcknowledged}
                      onChange={(e) => setReceiverAcknowledged(e.target.checked)}
                      style={{ marginTop: "3px" }}
                    />
                    <span>
                      I confirm that the owner/receiver has verified the item and confirmed its safe return. Award <strong>100 community points</strong> to the reporter.
                    </span>
                  </label>
                </div>

                <div className="modal-buttons-row">
                  <button
                    type="submit"
                    className="unisphere-btn unisphere-btn-success"
                    style={{ flex: 1 }}
                  >
                    Confirm Handover &amp; Award 100 Pts
                  </button>
                  <button
                    type="button"
                    className="unisphere-btn unisphere-btn-outline"
                    onClick={() => setConfirmingItem(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
