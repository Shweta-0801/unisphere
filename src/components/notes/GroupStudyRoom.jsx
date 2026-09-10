import { useState } from "react";
import { X, MessageCircle } from "lucide-react";

// Mock online participants. In a real implementation this would come from
// a websocket/presence channel (e.g. Socket.io, Supabase Realtime, etc.)
// keyed by note id — for now it's fixed, just to build out the UI.
const MOCK_USERS = [
  { id: 1, name: "Aditi", color: "bg-pink-500", page: 4, x: 30, y: 40 },
  { id: 2, name: "Rohan", color: "bg-blue-500", page: 4, x: 60, y: 55 },
  { id: 3, name: "Simran", color: "bg-green-500", page: 6, x: 45, y: 70 },
];

const REACTIONS = ["👍", "🔥", "😂", "🤔", "❤️"];

function GroupStudyRoom({ note, onClose }) {
  const [reactions, setReactions] = useState([]);
  const [currentPage] = useState(4);

  const sendReaction = (emoji) => {
    const id = Date.now();
    setReactions((prev) => [...prev, { id, emoji, x: 20 + Math.random() * 60 }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 1500);
  };

  if (!note) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <span className="text-xs font-medium text-orange-500 uppercase tracking-wide">{note.subject}</span>
        <h3 className="text-xl font-semibold text-gray-800 mb-1">Group Study: {note.topic}</h3>
        <p className="text-sm text-gray-500 mb-4">
          Studying together, free of charge. Everyone below is viewing page {currentPage}.
        </p>

        {/* Online users list */}
        <div className="flex flex-wrap gap-3 mb-4">
          {MOCK_USERS.map((user) => (
            <div key={user.id} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full pl-1 pr-3 py-1">
              <span className={`w-2.5 h-2.5 rounded-full ${user.color}`} />
              <span className="text-sm text-gray-700">{user.name}</span>
              <span className="text-xs text-gray-400">Online · pg {user.page}</span>
            </div>
          ))}
        </div>

        {/* Mock shared document view with live cursors */}
        <div className="relative bg-gray-50 border border-gray-200 rounded-xl aspect-[4/3] flex items-center justify-center overflow-hidden">
          <span className="text-gray-300 text-lg">Page {currentPage} of the note</span>

          {MOCK_USERS.map((user) => (
            <div
              key={user.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `${user.x}%`, top: `${user.y}%` }}
            >
              <div className={`w-3 h-3 rounded-full ${user.color} border-2 border-white shadow`} />
              <span className={`mt-1 text-[10px] text-white px-1.5 py-0.5 rounded ${user.color}`}>{user.name}</span>
            </div>
          ))}

          {/* floating reactions */}
          {reactions.map((r) => (
            <span
              key={r.id}
              className="absolute bottom-2 text-2xl animate-bounce"
              style={{ left: `${r.x}%` }}
            >
              {r.emoji}
            </span>
          ))}
        </div>

        {/* Reactions bar */}
        <div className="flex items-center gap-2 mt-4">
          <MessageCircle size={16} className="text-gray-400" />
          {REACTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => sendReaction(emoji)}
              className="text-xl hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-4">
          This is a UI preview with mock participants. Live cursors, real-time page sync, and chat will be wired up
          to a realtime backend later.
        </p>
      </div>
    </div>
  );
}

export default GroupStudyRoom;
