import { AlertCircle, CheckCircle2, ListChecks, TrendingUp } from "lucide-react";

/**
 * Score rule from the spec:
 *   pending complaint  -> +1
 *   resolved complaint -> -1
 * ("Pending" here means anything not yet resolved: Submitted, Pending, In Progress)
 */
function ComplaintStats({ complaints }) {
  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const pending = total - resolved;
  const score = pending * 1 + resolved * -1;

  const stats = [
    { label: "Total complaints", value: total, icon: ListChecks, color: "text-blue-600 bg-blue-50" },
    { label: "Pending", value: pending, icon: AlertCircle, color: "text-yellow-600 bg-yellow-50" },
    { label: "Resolved", value: resolved, icon: CheckCircle2, color: "text-green-600 bg-green-50" },
    { label: "Outstanding score", value: score, icon: TrendingUp, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${color}`}>
            <Icon size={18} />
          </div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      ))}
    </div>
  );
}

export default ComplaintStats;
