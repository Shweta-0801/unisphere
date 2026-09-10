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
}) {
  return (
    <>

      {/* =====================================================
          MY REPORTS
          ===================================================== */}

      {activeSection === "my-reports" && (

        <div className="lostfound-section lostfound-reports-section">

          <div className="reports-filter-bar">

            <div className="filter-title-group">

              <h3 className="section-title">
                Aanvi&apos;s Submitted Reports
              </h3>

              <span className="section-subtitle">
                All reports created by you.
                Items older than 3 hours
                remain saved in history.
              </span>

            </div>


            <div className="filter-chips-list">

              <button
                className={`filter-chip ${
                  reportsFilter === "all"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setReportsFilter("all")
                }
              >
                All ({reports.length})
              </button>


              <button
                className={`filter-chip ${
                  reportsFilter === "active"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setReportsFilter("active")
                }
              >
                Active Map (
                {
                  reports.filter(
                    (r) =>
                      r.status === "active" &&
                      !isReportExpired(r)
                  ).length
                }
                )
              </button>


              <button
                className={`filter-chip ${
                  reportsFilter === "resolved"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setReportsFilter(
                    "resolved"
                  )
                }
              >
                Resolved ({resolvedCount})
              </button>


              <button
                className={`filter-chip ${
                  reportsFilter === "expired"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setReportsFilter(
                    "expired"
                  )
                }
              >
                Expired &gt; 3h (
                {
                  reports.filter(
                    (r) =>
                      isReportExpired(r) &&
                      r.status !== "resolved"
                  ).length
                }
                )
              </button>

            </div>

          </div>


          {/* REPORT CARDS */}

          <div className="reports-cards-grid">

            {reports
              .filter((item) => {

                if (
                  reportsFilter === "active"
                ) {
                  return (
                    item.status === "active" &&
                    !isReportExpired(item)
                  );
                }


                if (
                  reportsFilter === "resolved"
                ) {
                  return (
                    item.status === "resolved"
                  );
                }


                if (
                  reportsFilter === "expired"
                ) {
                  return (
                    isReportExpired(item) &&
                    item.status !== "resolved"
                  );
                }


                return true;

              })
              .map((item) => (

                <ItemCard
                  key={item.id}
                  item={item}
                  expired={
                    isReportExpired(item)
                  }
                  formatTimeAgo={
                    formatTimeAgo
                  }
                  formatDate={
                    formatDate
                  }
                  handleMarkAsFound={
                    handleMarkAsFound
                  }
                />

              ))}

          </div>

        </div>

      )}


      {/* =====================================================
          MY POINTS & REWARDS
          ===================================================== */}

      {activeSection === "my-points" && (

        <div className="lostfound-section lostfound-points-section">


          {/* POINTS */}

          <div className="lostfound-card points-overview-card">

            <div className="points-header-row">

              <div>

                <h3 className="points-heading">
                  Aanvi&apos;s Points
                </h3>

                <p className="points-subheading">
                  You earn 100 points when your
                  reported/contributed item is
                  successfully resolved.
                </p>

              </div>


              <div className="points-counter-badge">

                <span className="points-huge-number">
                  {points}
                </span>

                <span className="points-unit">
                  Points
                </span>

              </div>

            </div>


            {/* PROGRESS */}

            <div className="points-progress-block">

              <div className="progress-labels-row">

                <span className="progress-title">
                  Progress to next reward
                </span>

                <span className="progress-fraction">
                  {points} / 1000
                </span>

              </div>


              <div className="progress-track">

                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min(
                      100,
                      (points / 1000) * 100
                    )}%`,
                  }}
                ></div>

              </div>


              <div className="progress-helper-text">

                {points >= 1000 ? (

                  <span className="text-green font-medium">
                    1000-point threshold
                    reached! Reward unlocked
                    below.
                  </span>

                ) : (

                  <span>
                    {1000 - points} more
                    points needed to unlock
                    your food reward voucher.
                  </span>

                )}

              </div>

            </div>

          </div>


          {/* REWARD */}

          <div className="lostfound-card reward-voucher-card">

            <div className="reward-card-header">

              <h4 className="reward-title">
                Campus Cafe Voucher
              </h4>

              <span className="reward-sub">
                Automatic reward unlocked
                upon reaching 1000 points
              </span>

            </div>


            {reward ? (

              <div className="unlocked-voucher-content">

                <div className="voucher-highlight-banner">

                  <span className="voucher-outlet">
                    {reward.outlet}
                  </span>

                  <span className="voucher-amount">
                    {reward.discount}
                  </span>

                </div>


                <div className="voucher-details-grid">

                  <div className="voucher-detail-col">

                    <span className="detail-name">
                      Voucher Code
                    </span>

                    <span className="detail-value voucher-code-text">
                      {reward.voucherCode}
                    </span>

                  </div>


                  <div className="voucher-detail-col">

                    <span className="detail-name">
                      Date Issued
                    </span>

                    <span className="detail-value">
                      {formatDate(
                        reward.issuedAt
                      )}
                    </span>

                  </div>


                  <div className="voucher-detail-col">

                    <span className="detail-name">
                      Expiry Date
                    </span>

                    <span className="detail-value">
                      {formatDate(
                        reward.expiresAt
                      )}
                    </span>

                  </div>


                  <div className="voucher-detail-col">

                    <span className="detail-name">
                      Status
                    </span>


                    {isRewardExpired ? (

                      <span className="voucher-status-badge status-expired">
                        Reward Expired
                      </span>

                    ) : (

                      <span className="voucher-status-badge status-valid">
                        Active • Valid for 24h
                      </span>

                    )}

                  </div>

                </div>


                <div className="voucher-rules-footer">

                  <p>
                    Present this voucher code
                    at the Campus Cafe counter
                    within 24 hours of generation
                    to redeem your ₹100 discount.
                  </p>

                </div>

              </div>

            ) : (

              <div className="locked-voucher-state">

                <div className="locked-shield-icon">
                  <span className="shield-symbol"></span>
                </div>


                <h5 className="locked-title">
                  Reward Locked
                </h5>


                <p className="locked-desc">
                  Resolve items to reach 1000
                  points. Once achieved, a
                  ₹100 Campus Cafe Food
                  Discount voucher valid for
                  24 hours will automatically
                  generate here.
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