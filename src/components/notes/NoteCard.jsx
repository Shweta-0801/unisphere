import { Star, User, Eye, ShoppingCart, Users } from "lucide-react";

/**
 * A single note listing.
 * onPreview / onBuy / onJoinGroupStudy are all optional callbacks —
 * NotesPage wires them up to modals / the group-study room.
 */
function NoteCard({ note, owned, onPreview, onBuy, onJoinGroupStudy }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
      {/* Fake PDF thumbnail */}
      <div className="h-32 bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center text-4xl">
        📄
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <span className="text-xs font-medium text-orange-500 uppercase tracking-wide">{note.subject}</span>
        <h4 className="font-semibold text-gray-800">{note.topic}</h4>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">{note.description}</p>

        <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
          <User size={12} /> {note.seller}
          {note.semester && <span className="ml-2">· {note.semester}</span>}
        </div>

        {note.rating && (
          <div className="flex items-center gap-1 text-xs text-yellow-500 mt-1">
            <Star size={12} className="fill-yellow-400" /> {note.rating.toFixed(1)}
            <span className="text-gray-400">({note.reviews} reviews)</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-gray-800">{note.price === 0 ? "Free" : `₹${note.price}`}</span>
          <button onClick={() => onPreview(note)} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
            <Eye size={14} /> Preview
          </button>
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onBuy(note)}
            disabled={owned}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-semibold transition ${
              owned ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <ShoppingCart size={14} /> {owned ? "Owned" : note.price === 0 ? "Get for free" : "Buy"}
          </button>
          <button
            onClick={() => onJoinGroupStudy(note)}
            className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50"
            title="Study this with others"
          >
            <Users size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
