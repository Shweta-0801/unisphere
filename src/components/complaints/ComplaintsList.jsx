import { Calendar, MapPin } from "lucide-react";

export const STATUS_FLOW = ["Submitted", "Pending", "In Progress", "Resolved"];

const STATUS_STYLES = {
  Submitted: "bg-blue-100 text-blue-600",
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-purple-100 text-purple-600",
  Resolved: "bg-green-100 text-green-600",
};

/**
 * "My Complaints" list.
 *
 * In a real system, status changes would come from an admin/staff panel.
 * Here there's no separate admin UI, so each card includes a small
 * "advance status" control just so the workflow (and the points math in
 * ComplaintStats) is demonstrable end-to-end.
 */
function ComplaintsList({ complaints, onStatusChange }) {
  if (complaints.length === 0) {
    return <p className="text-sm text-gray-400">You haven't filed any complaints yet.</p>;
  }

  return (
    <div className="space-y-3">
      {complaints.map((c) => (
        <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-xs font-medium text-blue-500 uppercase tracking-wide">{c.category}</span>
              <h4 className="font-semibold text-gray-800">{c.subject}</h4>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${STATUS_STYLES[c.status]}`}>
              {c.status}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">{c.description}</p>

          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {c.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {c.date}
            </span>
          </div>

          {c.status !== "Resolved" && (
            <select
              value={c.status}
              onChange={(e) => onStatusChange(c.id, e.target.value)}
              className="mt-3 text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600"
            >
              {STATUS_FLOW.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
}

export default ComplaintsList;
