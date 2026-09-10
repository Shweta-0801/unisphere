import React from "react";

export default function CampusMap({
  activeMapReports,
  mapFilter,
  setMapFilter,
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
            <span>Lost Item (Needs Recovery)</span>
          </div>

          <div className="legend-item">
            <span className="marker-dot-legend green-dot"></span>
            <span>Found Item (Awaiting Owner)</span>
          </div>

          <div className="legend-item expiry-note">
            <span>* Active reports stay on map for 3 hours</span>
          </div>

        </div>

        <div className="map-filter-group">

          <button
            className={`filter-chip ${
              mapFilter === "all" ? "active" : ""
            }`}
            onClick={() => setMapFilter("all")}
          >
            All Active ({activeMapReports.length})
          </button>

          <button
            className={`filter-chip ${
              mapFilter === "lost" ? "active" : ""
            }`}
            onClick={() => setMapFilter("lost")}
          >
            Lost Only
          </button>

          <button
            className={`filter-chip ${
              mapFilter === "found" ? "active" : ""
            }`}
            onClick={() => setMapFilter("found")}
          >
            Found Only
          </button>

        </div>
      </div>


      {/* CAMPUS MAP */}

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

                <span className="building-name">
                  {building.name}
                </span>

                <span className="building-tag">
                  {building.tag}
                </span>

              </div>
            </div>
          ))}


          {/* REPORT MARKERS */}

          {activeMapReports.map((report) => {

            const coords =
              locationCoordinates[report.location] || {
                x: 50,
                y: 50,
              };

            const offset =
              (report.id.length % 5) * 2;

            const posX = Math.min(
              92,
              Math.max(
                8,
                coords.x + offset
              )
            );

            const posY = Math.min(
              88,
              Math.max(
                12,
                coords.y + offset
              )
            );

            return (
              <div
                key={report.id}
                className={`lostfound-map-marker marker-${report.type}`}
                style={{
                  left: `${posX}%`,
                  top: `${posY}%`,
                }}
                onClick={() =>
                  setSelectedMarkerReport(report)
                }
                title={`${report.itemName} (${report.type})`}
              >

                <div className="marker-pulse-ring"></div>

                <div className="marker-core-circle"></div>

                <div className="marker-tooltip">

                  <span className="tooltip-title">
                    {report.itemName}
                  </span>

                  <span className="tooltip-loc">
                    {report.location}
                  </span>

                </div>

              </div>
            );
          })}

        </div>
      </div>


      {/* ACTIVE REPORTS */}

      <div className="map-recent-strip">

        <div className="strip-title-row">

          <h4 className="strip-heading">
            Live Active Campus Reports ({activeMapReports.length})
          </h4>

          <span className="strip-sub">
            Click a pin or button below to resolve an item and earn +100 points!
          </span>

        </div>


        <div className="map-cards-row">

          {activeMapReports.length === 0 ? (

            <div className="empty-state-box">

              <p>
                No active reports currently on the campus map.
              </p>

              <button
                className="unisphere-btn unisphere-btn-outline"
                onClick={() =>
                  setActiveSection("report")
                }
              >
                Submit a New Report
              </button>

            </div>

          ) : (

            activeMapReports.map((item) => (

              <div
                key={item.id}
                className="map-mini-card"
                onClick={() =>
                  setSelectedMarkerReport(item)
                }
              >

                <div className="mini-card-top">

                  <span
                    className={`status-pill pill-${item.type}`}
                  >
                    {item.type.toUpperCase()}
                  </span>

                  <span className="mini-card-time">
                    {formatTimeAgo(item.createdAt)}
                  </span>

                </div>

                <h5 className="mini-card-title">
                  {item.itemName}
                </h5>

                <span className="mini-card-loc">
                  {item.location}
                </span>

                <div className="mini-card-action">

                  <button
                    className="unisphere-btn unisphere-btn-success mini-resolve-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsFound(item.id);
                    }}
                  >
                    {item.type === "lost"
                      ? "Mark as Found (+100 Pts)"
                      : "Mark as Resolved (+100 Pts)"}
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