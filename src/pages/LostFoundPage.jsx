import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Map, PlusCircle, User } from "lucide-react";

import CampusMap from "../components/lostfound/CampusMap";
import ReportItemForm from "../components/lostfound/ReportItemForm";
import ItemCard from "../components/lostfound/ItemCard";
import MyReportsPoints, { POINTS_FOR_REWARD, REWARD_VALID_HOURS } from "../components/lostfound/MyReportsPoints";
import { loadFromStorage, saveToStorage, generateId } from "../utils/storage";

// How long an active report stays visible on the map before it's archived.
// The spec says 2-3 hours — 2.5h splits the difference.
const MAP_VISIBLE_HOURS = 2.5;

const FOOD_OUTLETS = ["Campus Cafe", "Juice Corner", "Pizza Point", "South Indian Mess"];

function LostFoundPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("map"); // map | report | mine

  // All reports ever made. Nothing is ever deleted from here — this is our
  // stand-in "backend" so items stay available for reference even once
  // they've disappeared from the live map. A real backend would just be a
  // database table instead of localStorage.
  const [reports, setReports] = useState(() => loadFromStorage("lostFoundReports", []));
  const [points, setPoints] = useState(() => loadFromStorage("lostFoundPoints", 0));
  const [reward, setReward] = useState(() => loadFromStorage("lostFoundReward", null));

  useEffect(() => saveToStorage("lostFoundReports", reports), [reports]);
  useEffect(() => saveToStorage("lostFoundPoints", points), [points]);
  useEffect(() => saveToStorage("lostFoundReward", reward), [reward]);

  // Only reports younger than MAP_VISIBLE_HOURS, and not yet resolved, show on the map.
  const visibleOnMap = useMemo(() => {
    const cutoff = Date.now() - MAP_VISIBLE_HOURS * 60 * 60 * 1000;
    return reports.filter((r) => r.status !== "resolved" && r.reportedAt >= cutoff);
  }, [reports]);

  // For this demo, "my" reports = every report made from this browser
  // (there's no login system, so everything belongs to "you").
  const myReports = reports;

  const handleNewReport = (formData) => {
    const newItem = {
      id: generateId(),
      ...formData,
      status: "active",
      reportedAt: Date.now(),
    };
    setReports((prev) => [newItem, ...prev]);
    setActiveTab("map");
  };

  const handleResolve = (id) => {
    setReports((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "resolved", resolvedAt: Date.now() } : item))
    );
    setPoints((prev) => prev + 100);
  };

  const handleRedeem = () => {
    const outlet = FOOD_OUTLETS[Math.floor(Math.random() * FOOD_OUTLETS.length)];
    setReward({
      outlet,
      claimedAt: Date.now(),
      expiresAt: Date.now() + REWARD_VALID_HOURS * 60 * 60 * 1000,
    });
    setPoints((prev) => prev - POINTS_FOR_REWARD);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button onClick={() => navigate("/dashboard")} className="mb-6 text-blue-600 font-medium hover:underline">
        ← Back to Dashboard
      </button>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Lost & Found</h1>
        <p className="text-gray-500 mb-6">Report a lost item, mark something as found, and earn points.</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1 border border-gray-200 w-fit">
          {[
            { key: "map", label: "Campus Map", icon: Map },
            { key: "report", label: "Report Item", icon: PlusCircle },
            { key: "mine", label: "My Reports / Points", icon: User },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === key ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {activeTab === "map" && (
          <div className="space-y-6">
            <CampusMap items={visibleOnMap} />
            <div className="flex gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">🔴 Lost item</span>
              <span className="flex items-center gap-1">🟢 Found item</span>
              <span className="ml-auto">Reports auto-hide from the map after ~2.5 hours</span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Active reports ({visibleOnMap.length})</h3>
              {visibleOnMap.length === 0 ? (
                <p className="text-sm text-gray-400">Nothing reported recently. Campus is clear!</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {visibleOnMap.map((item) => (
                    <ItemCard key={item.id} item={item} onResolve={handleResolve} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "report" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <ReportItemForm onSubmit={handleNewReport} />
          </div>
        )}

        {activeTab === "mine" && (
          <MyReportsPoints
            points={points}
            myReports={myReports}
            onResolve={handleResolve}
            reward={reward}
            onRedeem={handleRedeem}
          />
        )}
      </div>
    </div>
  );
}

export default LostFoundPage;
