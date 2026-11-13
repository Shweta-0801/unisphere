import React from "react";

export default function CampusMap({
  activeMapReports,
  mapFilter,
  setMapFilter,
  selectedMarkerReport,
  setSelectedMarkerReport,
  handleMarkAsFound,
  campusBuildings,
  locationCoordinates,
  formatTimeAgo,
  setActiveSection,
}) {
  return (
    <div className="lostfound-section lostfound-map-section">
      <div className="map-controls-header">
        <div className="map-legend">
          <div className="legend-item">
            <span className="marker-dot-legend red-dot"></span>
            <span>Red: Lost Item (Needs Recovery)</span>
          </div>

          <div className="legend-item">
            <span className="marker-dot-legend green-dot"></span>
            <span>Green: Found Item (Awaiting Owner)</span>
          </div>

          <div className="legend-item expiry-note">
            <span>* Active reports expire from map after 3 hours (archived in My Reports)</span>
          </div>
        </div>

        <div className="map-filter-group">
          <button
            type="button"
            className={`filter-chip ${mapFilter === "all" ? "active" : ""}`}
            onClick={() => setMapFilter("all")}
          >
            All Active ({activeMapReports.length})
          </button>

          <button
            type="button"
            className={`filter-chip ${mapFilter === "lost" ? "active" : ""}`}
            onClick={() => setMapFilter("lost")}
          >
            Lost Only ({activeMapReports.filter((r) => r.type === "lost").length})
          </button>

          <button
            type="button"
            className={`filter-chip ${mapFilter === "found" ? "active" : ""}`}
            onClick={() => setMapFilter("found")}
          >
            Found Only ({activeMapReports.filter((r) => r.type === "found").length})
          </button>
        </div>
      </div>

      {/* CAMPUS MAP CANVAS */}
      <div className="campus-map-wrapper">
        <div className="campus-map-canvas">
          <div className="map-pathway path-horizontal"></div>
          <div className="map-pathway path-vertical"></div>

          <div className="map-central-plaza">
            <span>University Plaza</span>
          </div>

          {/* BUILDINGS */}
          {campusBuildings.map((building) => (
            <div
              key={building.id}
              className={`map-building building-${building.id}`}
              style={{
                left: `${building.x}%`,
                top: `${building.y}%`,
                width: `${building.width}%`,
                height: `${building.height}%`,
              }}
            >
              <div className="building-header">
                <span className="building-name">{building.name}</span>
                <span className="building-tag">{building.tag}</span>
              </div>
            </div>
          ))}

          {/* REPORT MARKERS (RED FOR LOST, GREEN FOR FOUND) */}
          {activeMapReports.map((report) => {
            const coords = locationCoordinates[report.location] || {
              x: 50,
              y: 50,
            };

            const offset = (report.id.length % 5) * 2;
            const posX = Math.min(92, Math.max(8, coords.x + offset));
            const posY = Math.min(88, Math.max(12, coords.y + offset));

            const isSelected = selectedMarkerReport?.id === report.id;

            return (
              <div
                key={report.id}
                className={`lostfound-map-marker marker-${report.type} ${
                  isSelected ? "marker-active-selected" : ""
                }`}
                style={{
                  left: `${posX}%`,
                  top: `${posY}%`,
                }}
                onClick={() => setSelectedMarkerReport(report)}
                title={`${report.itemName} (${report.type.toUpperCase()}) - ${report.location}`}
              >
                <div className="marker-pulse-ring"></div>
                <div className="marker-core-circle"></div>

                <div className="marker-tooltip">
                  <span className="tooltip-title">{report.itemName}</span>
                  <span className="tooltip-loc">
                    {report.type === "lost" ? "ðŸ”´ Lost at " : "ðŸŸ¢ Found at "}
                    {report.location}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SELECTED MARKER POPUP / DETAILS */}
      {selectedMarkerReport && (
        <div className="map-selected-popup-card">
          <div className="popup-card-header">
            <div className="popup-header-left">
              <span className={`status-pill pill-${selectedMarkerReport.type}`}>
                {selectedMarkerReport.type === "lost" ? "ðŸ”´ LOST ITEM" : "ðŸŸ¢ FOUND ITEM"}
              </span>
              <h4 className="popup-item-title">{selectedMarkerReport.itemName}</h4>
            </div>
            <button
              type="button"
              className="popup-close-btn"
              onClick={() => setSelectedMarkerReport(null)}
            >
              âœ•
            </button>
          </div>

          <p className="popup-item-desc">{selectedMarkerReport.description}</p>

          <div className="popup-meta-grid">
            <div>
              <span className="meta-label">Location:</span>
              <span className="meta-val">{selectedMarkerReport.location}</span>
            </div>
            <div>
              <span className="meta-label">Reported:</span>
              <span className="meta-val">{formatTimeAgo(selectedMarkerReport.createdAt)}</span>
            </div>
            <div>
              <span className="meta-label">Reporter:</span>
              <span className="meta-val">{selectedMarkerReport.reportedBy || "Student"}</span>
            </div>
            {selectedMarkerReport.markerNote && (
              <div className="full-col">
                <span className="meta-label">Note:</span>
                <span className="meta-val">{selectedMarkerReport.markerNote}</span>
              </div>
            )}
          </div>

          <div className="popup-actions-bar">
            {selectedMarkerReport.status !== "resolved" ? (
              <button
                type="button"
                className="unisphere-btn unisphere-btn-success"
                onClick={() => handleMarkAsFound(selectedMarkerReport.id, selectedMarkerReport)}
              >
                {selectedMarkerReport.type === "lost"
                  ? "Confirm Found & Return (+100 Pts)"
                  : "Confirm Handover to Owner (+100 Pts)"}
              </button>
            ) : (
              <span className="badge-resolved">Item Resolved â€¢ 100 Pts Awarded</span>
            )}
            <button
              type="button"
              className="unisphere-btn unisphere-btn-outline"
              onClick={() => setSelectedMarkerReport(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE REPORTS STRIP */}
      <div className="map-recent-strip">
        <div className="strip-title-row">
          <h4 className="strip-heading">
            Live Active Campus Reports ({activeMapReports.length})
          </h4>
          <span className="strip-sub">
            Click any pin on the map or an item below to inspect details and initiate return handover.
          </span>
        </div>

        <div className="map-cards-row">
          {activeMapReports.length === 0 ? (
            <div className="empty-state-box">
              <p>No active reports currently on the campus map.</p>
              <button
                type="button"
                className="unisphere-btn unisphere-btn-outline"
                onClick={() => setActiveSection("report")}
              >
                Submit a New Report
              </button>
            </div>
          ) : (
            activeMapReports.map((item) => (
              <div
                key={item.id}
                className={`map-mini-card ${
                  selectedMarkerReport?.id === item.id ? "mini-card-selected" : ""
                }`}
                onClick={() => setSelectedMarkerReport(item)}
              >
                <div className="mini-card-top">
                  <span className={`status-pill pill-${item.type}`}>
                    {item.type.toUpperCase()}
                  </span>
                  <span className="mini-card-time">
                    {formatTimeAgo(item.createdAt)}
                  </span>
                </div>

                <h5 className="mini-card-title">{item.itemName}</h5>
                <span className="mini-card-loc">ðŸ“  {item.location}</span>

                <div className="mini-card-action">
                  <button
                    type="button"
                    className="unisphere-btn unisphere-btn-success mini-resolve-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsFound(item.id, item);
                    }}
                  >
                    {item.type === "lost" ? "Mark Found (+100)" : "Mark Returned (+100)"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
