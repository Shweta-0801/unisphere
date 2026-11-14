export default function AttendanceTable({
  students,
  classSummary,
  statusMap,
  onStatusChange,
  onMarkAll
}) {
  return (
    <div className="att-mgmt-section">
      <div className="att-mgmt-section-head">
        <div>
          <h3 className="att-section-title">Mark Students Present / Absent</h3>
          <p className="att-section-sub">
            Toggle status for each student. Automated attendance percentage updates below.
          </p>
        </div>
        <div className="att-batch-actions">
          <button
            type="button"
            onClick={() => onMarkAll("Present")}
            className="att-batch-btn btn-batch-present"
          >
            Mark All Present
          </button>
          <button
            type="button"
            onClick={() => onMarkAll("Absent")}
            className="att-batch-btn btn-batch-absent"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      <div className="att-table-wrap">
        <table className="att-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student</th>
              <th>Cumulative Attendance</th>
              <th>Status Flag</th>
              <th style={{ textAlign: "right" }}>Mark Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              // Find cumulative student attendance
              const record = classSummary.find((s) => s.id === student.id);
              const attended = record ? record.attended : 0;
              const total = record ? record.total : 0;

              // Automatic percentage calculation: (attended / total) * 100
              const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;
              const isBelowCutoff = percentage < 75;
              const currentStatus = statusMap[student.id] || "Present";

              return (
                <tr key={student.id}>
                  <td className="att-mono">{student.rollNo}</td>
                  <td className="att-font-bold">{student.name}</td>
                  <td>
                    <span className={isBelowCutoff ? "text-danger" : "text-success"}>
                      {attended} / {total} ({percentage}%)
                    </span>
                  </td>
                  <td>
                    {isBelowCutoff ? (
                      <span className="att-badge badge-danger">⚠️ Below 75%</span>
                    ) : (
                      <span className="att-badge badge-success">✓ Compliant</span>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div className="att-toggle-buttons">
                      <button
                        type="button"
                        onClick={() => onStatusChange(student.id, "Present")}
                        className={`att-status-btn ${currentStatus === "Present" ? "active-present" : ""}`}
                      >
                        Present
                      </button>
                      <button
                        type="button"
                        onClick={() => onStatusChange(student.id, "Absent")}
                        className={`att-status-btn ${currentStatus === "Absent" ? "active-absent" : ""}`}
                      >
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
