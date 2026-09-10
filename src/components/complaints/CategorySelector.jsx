import {
  Building2,
  UtensilsCrossed,
  Wifi,
  School,
  Bus,
  Sparkles,
  GraduationCap,
  Wrench,
  MoreHorizontal,
} from "lucide-react";

// Central place to add/remove complaint categories — used by both
// the selector grid and the form (so icons/labels always match).
export const COMPLAINT_CATEGORIES = [
  { key: "Hostel", icon: Building2 },
  { key: "Mess", icon: UtensilsCrossed },
  { key: "Wi-Fi", icon: Wifi },
  { key: "Classroom", icon: School },
  { key: "Transportation", icon: Bus },
  { key: "Cleanliness", icon: Sparkles },
  { key: "Faculty/Academic", icon: GraduationCap },
  { key: "Infrastructure", icon: Wrench },
  { key: "Other", icon: MoreHorizontal },
];

function CategorySelector({ onSelect }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-1">What type of complaint are you here for?</h2>
      <p className="text-gray-500 mb-6">Pick a category to open its complaint form.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {COMPLAINT_CATEGORIES.map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-sm transition"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Icon className="text-blue-600" size={22} />
            </div>
            <span className="text-sm font-medium text-gray-700">{key}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;
