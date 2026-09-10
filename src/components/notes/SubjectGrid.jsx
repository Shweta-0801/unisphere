import { BookOpen } from "lucide-react";

/**
 * subjects: array of { name, count } computed by the parent from all notes.
 */
function SubjectGrid({ subjects, onSelect }) {
  if (subjects.length === 0) {
    return <p className="text-sm text-gray-400">No notes uploaded yet — be the first!</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {subjects.map(({ name, count }) => (
        <button
          key={name}
          onClick={() => onSelect(name)}
          className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-400 hover:shadow-sm transition"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
            <BookOpen className="text-orange-500" size={22} />
          </div>
          <span className="text-sm font-medium text-gray-700 text-center">{name}</span>
          <span className="text-xs text-gray-400">{count} note{count !== 1 ? "s" : ""}</span>
        </button>
      ))}
    </div>
  );
}

export default SubjectGrid;
