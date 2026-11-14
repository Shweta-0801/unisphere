import React from "react";
import ItemCard from "./ItemCard";

function MyReportsPoints({
  activeSection,
  reports,
  reportsFilter,
  setReportsFilter,
  resolvedCount,
  isReportExpired,
  formatTimeAgo,
  formatDate,
  handleMarkAsFound,
  points,
  reward,
  isRewardExpired,
  studentName = "Aanvi",
}) {
  return (
    <>
      {/* =====================================================
          MY REPORTS SECTION (SEPARATE VIEW)
          ===================================================== */}
      {activeSection === "my-reports" && (
        <div className="lostfound-section lostfound-reports-section">
          <div className="reports-filter-bar">
            <div className="filter-title-group">
              <h3 className="section-title">
                {studentName}&apos;s Submitted Reports
              </h3>
              <span className="section-subtitle">
                All reports submitted by you. Active reports remain on the campus map for 3 hours; expired reports remain permanently archived in your history.
              </span>
            </div>

            <div className="filter-chips-list">
              <button
                type="button"
                className={`filter-chip ${reportsFilter === "all" ? "active" : ""}`}
                onClick={() => setReportsFilter("all")}
              >
                All Reports ({reports.length})
              </button>

              <button
                type="button"
                className={`filter-chip ${reportsFilter === "active" ? "active" : ""}`}
                onClick={() => setReportsFilter("active")}
              >
                Active on Map (
                {
                  reports.filter(
                    (r) => r.status === "active" && !isReportExpired(r)
                  ).length
                }
                )
              </button>

              <button
                type="button"
                className={`filter-chip ${reportsFilter === "resolved" ? "active" : ""}`}
                onClick={() => setReportsFilter("resolved")}
              >
                Resolved ({resolvedCount})
              </button>

              <button
                type="button"
                className={`filter-chip ${reportsFilter === "expired" ? "active" : ""}`}
                onClick={() => setReportsFilter("expired")}
              >
                Expired &gt; 3h (
                {
                  reports.filter(
                    (r) => isReportExpired(r) && r.status !== "resolved"
                  ).length
                }
                )
              </button>
            </div>
          </div>

          <div className="reports-cards-grid">
            {reports
              .filter((item) => {
                if (reportsFilter === "active") {
                  return item.status === "active" && !isReportExpired(item);
                }
                if (reportsFilter === "resolved") {
                  return item.status === "resolved";
                }
                if (reportsFilter === "expired") {
                  return isReportExpired(item) && item.status !== "resolved";
                }
                return true;
              })
              .map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  expired={isReportExpired(item)}
                  formatTimeAgo={formatTimeAgo}
                  formatDate={formatDate}
                  handleMarkAsFound={handleMarkAsFound}
                />
              ))}

            {reports.filter((item) => {
              if (reportsFilter === "active") return item.status === "active" && !isReportExpired(item);
              if (reportsFilter === "resolved") return item.status === "resolved";
              if (reportsFilter === "expired") return isReportExpired(item) && item.status !== "resolved";
              return true;
            }).length === 0 && (
              <div className="empty-state-box full-width">
                <p>No reports match the selected filter category.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================
          MY POINTS & REWARDS SECTION (SEPARATE VIEW)
          ===================================================== */}
      {activeSection === "my-points" && (
        <div className="lostfound-section lostfound-points-section">
          <div className="lostfound-card points-overview-card">
            <div className="points-header-row">
              <div>
                <span className="points-pre-title">COMMUNITY REWARD BALANCE</span>
                <h3 className="points-main-title">{studentName}&apos;s Points Ledger</h3>
                <p className="points-desc-text">
                  Earn 100 points for every recovered item once the receiver confirms handover. Accumulate 1,000 points to unlock a one-day campus outlet discount voucher!
                </p>
              </div>

              <div className="points-badge-display">
                <span className="points-number">{points}</span>
                <span className="points-label">Total Points</span>
              </div>
            </div>

            <div className="points-progress-block">
              <div className="progress-labels-row">
                <span className="progress-goal-text">
                  Progress to 1,000-Point Food Voucher
                </span>
                <span className="progress-fraction">
                  {points} / 1000 Points
                </span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min(100, (points / 1000) * 100)}%`,
                  }}
                ></div>
              </div>

              <div className="progress-helper-text">
                {points >= 1000 ? (
                  <span className="text-green font-medium">
                    âœ“ 1,000-point threshold reached! Campus outlet discount voucher unlocked below.
                  </span>
                ) : (
                  <span>
                    {1000 - points} more points required to unlock your one-day campus outlet discount voucher.
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="lostfound-card reward-voucher-card">
            <div className="reward-card-header">
              <h4 className="reward-title">Campus Outlet Discount Voucher</h4>
              <span className="reward-sub">
                1-Day Valid Voucher â€¢ Unlocks automatically at 1,000 points threshold
              </span>
            </div>

            {reward ? (
              <div className="unlocked-voucher-content">
                <div className="voucher-highlight-banner">
                  <span className="voucher-outlet">{reward.outlet || "Campus Food Court & Cafe"}</span>
                  <span className="voucher-amount">{reward.discount || "25% OFF Meal Voucher"}</span>
                </div>

                <div className="voucher-details-grid">
                  <div className="voucher-detail-col">
                    <span className="detail-name">Voucher Code</span>
                    <span className="detail-value voucher-code-text">
                      {reward.voucherCode || "UNISPHERE-FOOD-1000"}
                    </span>
                  </div>

                  <div className="voucher-detail-col">
                    <span className="detail-name">Date Issued</span>
                    <span className="detail-value">
                      {formatDate(reward.issuedAt)}
                    </span>
                  </div>

                  <div className="voucher-detail-col">
                    <span className="detail-name">Expiry Date (1-Day Validity)</span>
                    <span className="detail-value">
                      {formatDate(reward.expiresAt)}
                    </span>
                  </div>

                  <div className="voucher-detail-col">
                    <span className="detail-name">Status</span>
                    {isRewardExpired ? (
                      <span className="voucher-status-badge status-expired">
                        Reward Expired (&gt;24h)
                      </span>
                    ) : (
                      <span className="voucher-status-badge status-valid">
                        Active â€¢ Valid for 24 Hours
                      </span>
                    )}
                  </div>
                </div>

                <div className="voucher-rules-footer">
                  <p>
                    Present this voucher code at any campus food outlet counter within 24 hours of issuance to redeem your configured discount voucher.
                  </p>
                </div>
              </div>
            ) : (
              <div className="locked-voucher-state">
                <div className="locked-shield-icon">
                  <span className="shield-symbol">ðŸŽ«</span>
                </div>

                <h5 className="locked-title">Reward Voucher Locked</h5>
                <p className="locked-desc">
                  Report and verify returned belongings to reach 1,000 points. Once achieved, an official 1-day campus outlet discount voucher valid for 24 hours will automatically unlock here.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MyReportsPoints;
