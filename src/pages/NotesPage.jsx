import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Upload } from "lucide-react";

import SubjectGrid from "../components/notes/SubjectGrid";
import NotesList from "../components/notes/NotesList";
import UploadNoteForm from "../components/notes/UploadNoteForm";
import NotePreviewModal from "../components/notes/NotePreviewModal";
import GroupStudyRoom from "../components/notes/GroupStudyRoom";
import { loadFromStorage, saveToStorage, generateId } from "../utils/storage";

// A few sample listings so the marketplace isn't empty on first load.
const SAMPLE_NOTES = [
  {
    id: "sample-1",
    subject: "Data Structures",
    topic: "Binary Trees & Traversals",
    description: "Handwritten notes covering BSTs, AVL trees, and all traversal methods with examples.",
    price: 49,
    semester: "Semester 3",
    seller: "Aditi",
    rating: 4.6,
    reviews: 12,
    totalPages: 18,
    createdAt: Date.now() - 86400000,
  },
  {
    id: "sample-2",
    subject: "Database Management",
    topic: "Normalization (1NF-BCNF)",
    description: "Step-by-step normalization examples with solved problems.",
    price: 0,
    semester: "Semester 4",
    seller: "Rohan",
    rating: 4.2,
    reviews: 7,
    totalPages: 12,
    createdAt: Date.now() - 172800000,
  },
];

function NotesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("marketplace"); // marketplace | upload
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [notes, setNotes] = useState(() => loadFromStorage("notesMarketplace", SAMPLE_NOTES));
  const [ownedIds, setOwnedIds] = useState(() => loadFromStorage("ownedNotes", []));
  const [previewNote, setPreviewNote] = useState(null);
  const [groupStudyNote, setGroupStudyNote] = useState(null);

  useEffect(() => saveToStorage("notesMarketplace", notes), [notes]);
  useEffect(() => saveToStorage("ownedNotes", ownedIds), [ownedIds]);

  const subjects = useMemo(() => {
    const counts = {};
    notes.forEach((n) => {
      counts[n.subject] = (counts[n.subject] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [notes]);

  const handleUpload = (formData) => {
    const newNote = {
      id: generateId(),
      ...formData,
      seller: "You",
      rating: null,
      reviews: 0,
      totalPages: 20,
      createdAt: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveTab("marketplace");
    setSelectedSubject(newNote.subject);
  };

  const handleBuy = (note) => {
    if (!ownedIds.includes(note.id)) {
      setOwnedIds((prev) => [...prev, note.id]);
    }
    setPreviewNote(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button onClick={() => navigate("/dashboard")} className="mb-6 text-blue-600 font-medium hover:underline">
        ← Back to Dashboard
      </button>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Notes Marketplace & Group Study</h1>
        <p className="text-gray-500 mb-6">Buy, sell, and study notes together.</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1 border border-gray-200 w-fit">
          {[
            { key: "marketplace", label: "Marketplace", icon: BookOpen },
            { key: "upload", label: "Sell Notes", icon: Upload },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setSelectedSubject(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === key ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {activeTab === "marketplace" &&
          (selectedSubject ? (
            <NotesList
              subject={selectedSubject}
              notes={notes}
              ownedIds={ownedIds}
              onBack={() => setSelectedSubject(null)}
              onPreview={setPreviewNote}
              onBuy={handleBuy}
              onJoinGroupStudy={setGroupStudyNote}
            />
          ) : (
            <SubjectGrid subjects={subjects} onSelect={setSelectedSubject} />
          ))}

        {activeTab === "upload" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <UploadNoteForm onSubmit={handleUpload} />
          </div>
        )}
      </div>

      <NotePreviewModal
        note={previewNote}
        onClose={() => setPreviewNote(null)}
        onBuy={handleBuy}
        owned={previewNote ? ownedIds.includes(previewNote.id) : false}
      />

      <GroupStudyRoom note={groupStudyNote} onClose={() => setGroupStudyNote(null)} />
    </div>
  );
}

export default NotesPage;
