import React from "react";

function ItemCard({
  item,
  expired,
  formatTimeAgo,
  formatDate,
  handleMarkAsFound,
}) {
  return (
    <div className="lostfound-card report-item-card">

      {/* IMAGE */}

      <div className="report-card-media">

        {item.photo ? (

          <img
            src={item.photo}
            alt={item.itemName}
            className="report-card-img"
          />

        ) : (

          <div className="no-photo-placeholder">
            <span>
              No photo provided
            </span>
          </div>

        )}


        <span
          className={`status-pill card-type-pill pill-${item.type}`}
        >
          {item.type.toUpperCase()}
        </span>

      </div>


      {/* CONTENT */}

      <div className="report-card-body">

        <div className="card-status-line">

          {item.status === "resolved" ? (

            <span className="badge-resolved">
              Resolved
            </span>

          ) : expired ? (

            <span className="badge-expired">
              Expired from Map (&gt;3h)
            </span>

          ) : (

            <span className="badge-active">
              Active on Campus Map
            </span>

          )}


          <span className="card-timestamp">
            {formatTimeAgo(
              item.createdAt
            )}
          </span>

        </div>


        <h4 className="report-card-title">
          {item.itemName}
        </h4>


        <p className="report-card-desc">
          {item.description}
        </p>


        {/* DETAILS */}

        <div className="report-card-meta">

          <div className="meta-item">

            <span className="meta-label">
              Location:
            </span>

            <span className="meta-val">
              {item.location}
            </span>

          </div>


          <div className="meta-item">

            <span className="meta-label">
              Date:
            </span>

            <span className="meta-val">
              {formatDate(
                item.createdAt
              )}
            </span>

          </div>


          <div className="meta-item">

            <span className="meta-label">
              Points:
            </span>

            <span
              className={`meta-val ${
                item.pointsAwarded
                  ? "text-green font-semibold"
                  : ""
              }`}
            >
              {item.pointsAwarded
                ? "+100 points"
                : "0 points"}
            </span>

          </div>

        </div>


        {/* NOTE */}

        {item.markerNote && (

          <div className="report-card-note">

            <span>
              Note: {item.markerNote}
            </span>

          </div>

        )}


        {/* BUTTON */}

        <div className="card-footer-action">

          {item.status !== "resolved" ? (

            <button
              className="unisphere-btn unisphere-btn-success w-full"
              onClick={() =>
                handleMarkAsFound(
                  item.id
                )
              }
            >
              {item.type === "lost"
                ? "Mark as Found (+100 Pts)"
                : "Mark as Returned (+100 Pts)"}
            </button>

          ) : (

            <div className="resolved-confirmation-tag">

              <span>
                Item Resolved • 100 Pts Awarded
              </span>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default ItemCard;