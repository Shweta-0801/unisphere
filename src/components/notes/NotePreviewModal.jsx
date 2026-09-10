import { X } from "lucide-react";

/**
 * Mock preview: real page thumbnails would come from rendering the PDF
 * (e.g. with pdf.js) on the backend and returning image URLs. We don't
 * have an actual PDF to render here, so this shows placeholder "pages"
 * to demonstrate the first-3 / last-3 UX the spec asks for.
 */
function NotePreviewModal({ note, onClose, onBuy, owned }) {
  if (!note) return null;

  const totalPages = note.totalPages || 20;
  const firstThree = [1, 2, 3];
  const lastThree = [totalPages - 2, totalPages - 1, totalPages];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <span className="text-xs font-medium text-orange-500 uppercase tracking-wide">{note.subject}</span>
        <h3 className="text-xl font-semibold text-gray-800">{note.topic}</h3>
        <p className="text-sm text-gray-500 mt-1">{note.description}</p>

        <p className="text-sm font-medium text-gray-700 mt-5 mb-2">First 3 pages</p>
        <div className="grid grid-cols-3 gap-3">
          {firstThree.map((p) => (
            <div key={p} className="aspect-[3/4] bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Page {p}
            </div>
          ))}
        </div>

        <p className="text-sm font-medium text-gray-700 mt-5 mb-2">Last 3 pages</p>
        <div className="grid grid-cols-3 gap-3">
          {lastThree.map((p) => (
            <div key={p} className="aspect-[3/4] bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Page {p}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6">
          <span className="font-bold text-lg text-gray-800">
            {note.price === 0 ? "Free" : `₹${note.price}`}
          </span>
          <button
            onClick={() => onBuy(note)}
            disabled={owned}
            className={`px-5 py-2 rounded-lg text-sm font-semibold ${
              owned ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {owned ? "Already owned" : "Buy full notes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotePreviewModal;
