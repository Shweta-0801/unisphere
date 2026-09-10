import { useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import NoteCard from "./NoteCard";

function NotesList({ subject, notes, ownedIds, onBack, onPreview, onBuy, onJoinGroupStudy }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest | price-low | price-high | rating

  const filtered = useMemo(() => {
    let result = notes.filter((n) => n.subject === subject);

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (n) => n.topic.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        result = [...result].sort((a, b) => b.createdAt - a.createdAt);
    }

    return result;
  }, [notes, subject, query, sortBy]);

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-blue-600 hover:underline mb-4">
        <ArrowLeft size={16} /> All subjects
      </button>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <h2 className="text-xl font-semibold text-gray-800 flex-1">{subject}</h2>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes..."
            className="pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm rounded-lg border border-gray-300 px-3 py-2"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest rated</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400">No notes match your search.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              owned={ownedIds.includes(note.id)}
              onPreview={onPreview}
              onBuy={onBuy}
              onJoinGroupStudy={onJoinGroupStudy}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesList;
