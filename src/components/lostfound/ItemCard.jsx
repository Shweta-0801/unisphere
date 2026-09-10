import { MapPin, Clock, CheckCircle2 } from "lucide-react";

function timeAgo(timestamp) {
  const minutes = Math.floor((Date.now() - timestamp) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

/**
 * A single lost/found report shown as a card.
 * onResolve is only passed in for reports the current user owns —
 * that's what triggers the +100 points reward.
 */
function ItemCard({ item, onResolve }) {
  const isLost = item.type === "lost";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4">
      {item.photoUrl ? (
        <img src={item.photoUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
      ) : (
        <div
          className={`w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl ${
            isLost ? "bg-red-50" : "bg-green-50"
          }`}
        >
          {isLost ? "🔴" : "🟢"}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-gray-800 truncate">{item.name}</h4>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              item.status === "resolved"
                ? "bg-gray-100 text-gray-500"
                : isLost
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {item.status === "resolved" ? "Resolved" : isLost ? "Lost" : "Found"}
          </span>
        </div>

        {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}

        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {item.locationText}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {timeAgo(item.reportedAt)}
          </span>
        </div>

        {onResolve && item.status !== "resolved" && (
          <button
            onClick={() => onResolve(item.id)}
            className="mt-3 flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            <CheckCircle2 size={16} /> Mark as found / resolved (+100 points)
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
