export default function MarksOverview({ marksList }) {
  return (
    <div className="perf-section-box">
      <h3 className="perf-section-title">Subject-Wise Marks & Attendance Overview</h3>
      <p className="perf-section-sub">
        Comparison between student marks and attendance percentage.
      </p>

      <div className="perf-table-wrap">
        <table className="perf-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Attendance %</th>
              <th>Performance Bar</th>
              <th>Academic Status</th>
            </tr>
          </thead>
          <tbody>
            {marksList.map((item) => {
              const needsSupport = item.marks < 40;
              const isLowAtt = item.attendance < 75;

              return (
                <tr key={item.id}>
                  <td className="perf-font-bold">{item.student}</td>
                  <td>{item.subject}</td>
                  <td>
                    <span className={needsSupport ? "text-danger" : "text-dark"}>
                      {item.marks} / 100
                    </span>
                  </td>
                  <td>
                    <span className={isLowAtt ? "text-danger" : "text-success"}>
                      {item.attendance}% {isLowAtt ? "⚠️ Low" : ""}
                    </span>
                  </td>
                  <td style={{ minWidth: "140px" }}>
                    <div className="perf-progress-track">
                      <div
                        className={`perf-progress-fill ${needsSupport ? "fill-danger" : "fill-primary"}`}
                        style={{ width: `${item.marks}%` }}
                      />
                    </div>
                  </td>
                  <td>
                    {needsSupport ? (
                      <span className="perf-badge badge-danger">Needs Support</span>
                    ) : (
                      <span className="perf-badge badge-success">Pass</span>
                    )}
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
