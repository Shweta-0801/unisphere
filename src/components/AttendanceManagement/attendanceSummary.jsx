export default function AttendanceSummary({ classSummary, history, selectedClass }) {
  return (
    <div className="att-summary-stack">
      {/* 8. Class-wise Attendance Report */}
      <div className="att-mgmt-section">
        <h3 className="att-section-title">Class-Wise Attendance Report ({selectedClass})</h3>
        <p className="att-section-sub">
          Summary of student attendance percentages. Students below 75% are highlighted.
        </p>

        <div className="att-table-wrap">
          <table className="att-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Classes Attended</th>
                <th>Total Held</th>
                <th>Attendance %</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {classSummary.map((st) => {
                // Calculate percentage
                const pct = st.total > 0 ? Math.round((st.attended / st.total) * 100) : 0;
                const isBelowCutoff = pct < 75;

                return (
                  <tr key={st.id}>
                    <td className="att-font-bold">{st.name}</td>
                    <td>{st.attended}</td>
                    <td>{st.total}</td>
                    <td>
                      <span className={isBelowCutoff ? "text-danger" : "text-success"}>
                        {pct}%
                      </span>
                    </td>
                    <td>
                      {isBelowCutoff ? (
                        <span className="att-badge badge-danger">⚠️ Below 75%</span>
                      ) : (
                        <span className="att-badge badge-success">Safe</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Attendance History */}
      <div className="att-mgmt-section">
        <h3 className="att-section-title">Attendance History</h3>
        <p className="att-section-sub">
          Audit trail of previously submitted roll calls.
        </p>

        <div className="att-table-wrap">
          <table className="att-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Student</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.slice(0, 10).map((record) => (
                <tr key={record.id}>
                  <td className="att-mono">{record.date}</td>
                  <td>{record.subject}</td>
                  <td className="att-font-bold">{record.student}</td>
                  <td>
                    <span
                      className={`att-badge ${
                        record.status === "Present" ? "badge-success" : "badge-danger"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
