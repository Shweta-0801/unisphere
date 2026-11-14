import "./Attendance.css";

function AttendanceSummary() {
  const attendance = {
    present: 65,
    absent: 15,
    total: 80
  };

  const percentage = Math.round(
    (attendance.present / attendance.total) * 100
  );

  return (
    <div className="att-gauge-card" style={{ padding: "1.75rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--att-text-main)", margin: 0 }}>
          Attendance Summary
        </h2>
        <p style={{ fontSize: "0.875rem", color: "var(--att-text-muted)", marginTop: "0.25rem" }}>
          A quick overview of your attendance record
        </p>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--att-text-muted)" }}>
            Overall Attendance
          </span>
          <span style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--att-success)" }}>
            {percentage}%
          </span>
        </div>

        <div style={{ width: "100%", height: "0.75rem", background: "var(--att-surface-alt)", borderRadius: "9999px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              backgroundColor: "var(--att-primary)",
              borderRadius: "9999px",
              width: `${percentage}%`,
              transition: "width 0.6s ease"
            }}
          />
        </div>
      </div>

      {/* Statistics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
        <div style={{ background: "var(--att-success-light)", border: "1px solid var(--att-success-border)", borderRadius: "var(--att-radius-md)", padding: "1rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--att-success-text)", margin: 0 }}>
            Present
          </p>
          <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--att-success-text)", margin: "0.25rem 0 0 0" }}>
            {attendance.present}
          </p>
        </div>

        <div style={{ background: "var(--att-danger-light)", border: "1px solid var(--att-danger-border)", borderRadius: "var(--att-radius-md)", padding: "1rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--att-danger-text)", margin: 0 }}>
            Absent
          </p>
          <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--att-danger-text)", margin: "0.25rem 0 0 0" }}>
            {attendance.absent}
          </p>
        </div>

        <div style={{ background: "var(--att-primary-light)", border: "1px solid var(--att-primary-border)", borderRadius: "var(--att-radius-md)", padding: "1rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--att-primary)", margin: 0 }}>
            Total Classes
          </p>
          <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--att-primary)", margin: "0.25rem 0 0 0" }}>
            {attendance.total}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AttendanceSummary;