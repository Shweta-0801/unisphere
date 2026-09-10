import { MapPin } from "lucide-react";

/**
 * A lightweight "campus map".
 *
 * Instead of depending on a real maps API (Google Maps etc. need an API
 * key + billing), this renders a simple campus layout as a grid of
 * blocks, and places pins on it using x/y percentages (0-100).
 *
 * Swap the background grid for a real <img> of the campus map later —
 * the pin positioning logic (percentage based) will keep working.
 *
 * Props:
 * - items: array of { id, name, note, type: "lost" | "found", x, y }
 * - onMapClick(x, y): optional. If provided, the map becomes "pickable"
 *   and clicking it reports back the % coordinates (used by the report form)
 * - pickedLocation: { x, y } optional, shows a preview pin while picking
 */
function CampusMap({ items = [], onMapClick, pickedLocation }) {
  const handleClick = (e) => {
    if (!onMapClick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onMapClick(Number(x.toFixed(1)), Number(y.toFixed(1)));
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 bg-[linear-gradient(135deg,#eef2ff,#f0fdf4)] ${
        onMapClick ? "cursor-crosshair" : ""
      }`}
    >
      {/* Fake campus blocks, just for visual context */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-2 p-4 opacity-70 pointer-events-none">
        {["Library", "Block A", "Block B", "Cafeteria", "Hostel 1", "Hostel 2", "Sports Complex", "Admin Block", "Auditorium", "Block C", "Parking", "Main Gate"].map(
          (label) => (
            <div
              key={label}
              className="bg-white/70 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-[10px] sm:text-xs text-gray-400 font-medium text-center px-1"
            >
              {label}
            </div>
          )
        )}
      </div>

      {/* Reported items */}
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute -translate-x-1/2 -translate-y-full group"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
        >
          <MapPin
            size={28}
            className={`drop-shadow ${
              item.type === "lost" ? "text-red-500 fill-red-200" : "text-green-500 fill-green-200"
            }`}
          />
          {/* Tooltip note, e.g. "Found near Library" */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block whitespace-nowrap bg-gray-900 text-white text-xs rounded-md px-2 py-1 z-10">
            <p className="font-semibold">{item.name}</p>
            <p className="text-gray-300">{item.note}</p>
          </div>
        </div>
      ))}

      {/* Preview pin while the user is picking a location on the form */}
      {pickedLocation && (
        <div
          className="absolute -translate-x-1/2 -translate-y-full animate-bounce"
          style={{ left: `${pickedLocation.x}%`, top: `${pickedLocation.y}%` }}
        >
          <MapPin size={28} className="text-blue-600 fill-blue-200" />
        </div>
      )}
    </div>
  );
}

export default CampusMap;
