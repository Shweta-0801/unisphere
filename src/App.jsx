import React, { useState, useEffect } from "react";
import CampusMap from "./components/lostfound/CampusMap";
import MyReportsPoints from "./components/lostfound/MyReportsPoints";
import ReportItemForm from "./components/lostfound/ReportItemForm";

const CURRENT_STUDENT = {
  name: "Aanvi",
  rollNumber: "CS-2024-0892",
  department: "Computer Science & Engineering",
  semester: "4th Semester",
};

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
    description:
      "Black Casio fx-991EX calculator with custom blue sticker on the back.",
    location: "Turing Block",
    markerNote: "Reported missing in Turing Block Room 204",
    photo: null,
    createdAt: Date.now() - 1.2 * 60 * 60 * 1000,
    status: "active",
    reportedBy: "Aanvi",
    pointsAwarded: false,
  },

  {
    id: "rep-2",
    type: "found",
    itemName: "Stainless Steel Water Bottle",
    description:
      "Silver Milton 750ml insulated bottle found on desk row 3.",
    location: "Library",
    markerNote: "Found near Library 1st Floor Study Hall",
    photo: null,
    createdAt: Date.now() - 0.8 * 60 * 60 * 1000,
    status: "active",
    reportedBy: "Aanvi",
    pointsAwarded: false,
  },

  {
    id: "rep-3",
    type: "lost",
    itemName: "College ID Card & Lanyard",
    description:
      "Blue UniSphere lanyard with CSE student RFID pass.",
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
    description:
      "Black wallet containing student bus pass and metro card.",
    location: "Academic Block",
    markerNote: "Returned to owner via Academic Office",
    photo: null,
    createdAt: Date.now() - 4.5 * 60 * 60 * 1000,
    status: "resolved",
    reportedBy: "Aanvi",
    pointsAwarded: true,
  },
];

function formatTimeAgo(timestamp) {
  const diff = Math.floor(
    (Date.now() - timestamp) / (60 * 1000)
  );

  if (diff < 2) {
    return "Just now";
  }

  if (diff < 60) {
    return `${diff} mins ago`;
  }

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  if (hours < 24) {
    return minutes > 0
      ? `${hours}h ${minutes}m ago`
      : `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);

  return days === 1
    ? "1 day ago"
    : `${days} days ago`;
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("map");

  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem(
      "unisphere_lostfound_reports"
    );

    return saved
      ? JSON.parse(saved)
      : DEFAULT_REPORTS;
  });

  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem(
      "unisphere_aanvi_points"
    );

    return saved !== null
      ? parseInt(saved, 10)
      : 900;
  });

  const [reward, setReward] = useState(() => {
    const saved = localStorage.getItem(
      "unisphere_food_reward"
    );

    return saved
      ? JSON.parse(saved)
      : null;
  });

  const [mapFilter, setMapFilter] = useState("all");

  const [
    selectedMarkerReport,
    setSelectedMarkerReport,
  ] = useState(null);

  const [reportsFilter, setReportsFilter] = useState("all");

  const [formType, setFormType] = useState("lost");

  const [formItemName, setFormItemName] = useState("");

  const [formDescription, setFormDescription] = useState("");

  const [formLocation, setFormLocation] = useState("Library");

  const [formMarkerNote, setFormMarkerNote] = useState("");

  const [formPhoto, setFormPhoto] = useState(null);

  const [formError, setFormError] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "unisphere_lostfound_reports",
      JSON.stringify(reports)
    );
  }, [reports]);

  useEffect(() => {
    localStorage.setItem(
      "unisphere_aanvi_points",
      points.toString()
    );
  }, [points]);

  useEffect(() => {
    if (reward) {
      localStorage.setItem(
        "unisphere_food_reward",
        JSON.stringify(reward)
      );
    }
  }, [reward]);

  const THREE_HOURS = 3 * 60 * 60 * 1000;

  const isReportExpired = (item) => {
    return Date.now() - item.createdAt > THREE_HOURS;
  };

  const activeMapReports = reports.filter((item) => {
    if (item.status === "resolved") {
      return false;
    }

    if (isReportExpired(item)) {
      return false;
    }

    if (mapFilter === "lost") {
      return item.type === "lost";
    }

    if (mapFilter === "found") {
      return item.type === "found";
    }

    return true;
  });

  const handleMarkAsFound = (reportId) => {
    const target = reports.find(
      (item) => item.id === reportId
    );

    if (!target) {
      return;
    }

    const shouldAward = !target.pointsAwarded;

    setReports((current) =>
      current.map((item) =>
        item.id === reportId
          ? {
              ...item,
              status: "resolved",
              pointsAwarded: true,
            }
          : item
      )
    );

    setSelectedMarkerReport((current) => {
      if (
        !current ||
        current.id !== reportId
      ) {
        return current;
      }

      return {
        ...current,
        status: "resolved",
        pointsAwarded: true,
      };
    });

    if (shouldAward) {
      setPoints(
        (current) => current + 100
      );
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleCreateReport = (e) => {
    e.preventDefault();

    if (!formItemName.trim()) {
      setFormError(
        "Please provide an item name."
      );
      return;
    }

    if (!formDescription.trim()) {
      setFormError(
        "Please provide a description."
      );
      return;
    }

    setFormError("");

    const newReport = {
      id: `rep-${Date.now()}`,
      type: formType,
      itemName: formItemName.trim(),
      description: formDescription.trim(),
      location: formLocation,
      markerNote: formMarkerNote.trim(),
      photo: formPhoto,
      createdAt: Date.now(),
      status: "active",
      reportedBy: CURRENT_STUDENT.name,
      pointsAwarded: false,
    };

    setReports((current) => [
      newReport,
      ...current,
    ]);

    setFormItemName("");
    setFormDescription("");
    setFormMarkerNote("");
    setFormPhoto(null);

    setActiveSection("map");
  };

  const resolvedCount = reports.filter(
    (item) => item.status === "resolved"
  ).length;

  const activeCount = activeMapReports.length;

  const totalReportsCount = reports.length;

  const isRewardExpired = reward
    ? Date.now() > reward.expiresAt
    : false;

  useEffect(() => {
    if (points >= 1000 && !reward) {
      const issuedAt = Date.now();

      const newReward = {
        outlet: "Campus Cafe",
        discount: "₹100 Food Discount",
        voucherCode: "UNIS-CAFE-100",
        issuedAt,
        expiresAt:
          issuedAt +
          24 * 60 * 60 * 1000,
        validityHours: 24,
      };

      setReward(newReward);
    }
  }, [points, reward]);

  return (
    <div className="lostfound-container">

      <div className="lostfound-tabs-nav">

        <button
          className={`lostfound-tab-btn ${
            activeSection === "map"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveSection("map")
          }
        >
          Campus Map
        </button>

        <button
          className={`lostfound-tab-btn ${
            activeSection === "report"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveSection("report")
          }
        >
          Report Item
        </button>

        <button
          className={`lostfound-tab-btn ${
            activeSection === "my-reports"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveSection("my-reports")
          }
        >
          My Reports
        </button>

        <button
          className={`lostfound-tab-btn ${
            activeSection === "my-points"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveSection("my-points")
          }
        >
          My Points & Rewards
        </button>

      </div>

      {activeSection === "map" && (
        <CampusMap
          activeMapReports={activeMapReports}
          mapFilter={mapFilter}
          setMapFilter={setMapFilter}
          setSelectedMarkerReport={
            setSelectedMarkerReport
          }
          handleMarkAsFound={
            handleMarkAsFound
          }
          campusBuildings={
            CAMPUS_BUILDINGS
          }
          locationCoordinates={
            LOCATION_COORDINATES
          }
          formatTimeAgo={
            formatTimeAgo
          }
          setActiveSection={
            setActiveSection
          }
        />
      )}

      {activeSection === "report" && (
        <ReportItemForm
          formType={formType}
          setFormType={setFormType}
          formItemName={formItemName}
          setFormItemName={setFormItemName}
          formDescription={formDescription}
          setFormDescription={
            setFormDescription
          }
          formLocation={formLocation}
          setFormLocation={setFormLocation}
          formMarkerNote={formMarkerNote}
          setFormMarkerNote={
            setFormMarkerNote
          }
          formPhoto={formPhoto}
          setFormPhoto={setFormPhoto}
          formError={formError}
          setFormError={setFormError}
          handlePhotoUpload={
            handlePhotoUpload
          }
          handleCreateReport={
            handleCreateReport
          }
        />
      )}

      {activeSection === "my-reports" && (
        <MyReportsPoints
          activeSection={activeSection}
          reports={reports}
          reportsFilter={reportsFilter}
          setReportsFilter={
            setReportsFilter
          }
          resolvedCount={resolvedCount}
          isReportExpired={
            isReportExpired
          }
          formatTimeAgo={
            formatTimeAgo
          }
          formatDate={formatDate}
          handleMarkAsFound={
            handleMarkAsFound
          }
          points={points}
          reward={reward}
          isRewardExpired={
            isRewardExpired
          }
        />
      )}

      {activeSection === "my-points" && (
        <MyReportsPoints
          activeSection={activeSection}
          reports={reports}
          reportsFilter={reportsFilter}
          setReportsFilter={
            setReportsFilter
          }
          resolvedCount={resolvedCount}
          isReportExpired={
            isReportExpired
          }
          formatTimeAgo={
            formatTimeAgo
          }
          formatDate={formatDate}
          handleMarkAsFound={
            handleMarkAsFound
          }
          points={points}
          reward={reward}
          isRewardExpired={
            isRewardExpired
          }
        />
      )}

    </div>
  );
}

export default App;