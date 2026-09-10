import { useState } from "react";
import { FileUp } from "lucide-react";

function UploadNoteForm({ onSubmit }) {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [semester, setSemester] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !topic.trim() || !fileName) {
      setError("Subject, topic, and a PDF file are required.");
      return;
    }

    onSubmit({
      subject: subject.trim(),
      topic: topic.trim(),
      description: description.trim(),
      price: Number(price) || 0,
      semester: semester.trim(),
      fileName,
    });

    setSubject("");
    setTopic("");
    setDescription("");
    setPrice("");
    setSemester("");
    setFileName("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Upload notes</h2>
      <p className="text-gray-500 mb-4">Sell your notes to other students. You set the price.</p>

      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
          <FileUp size={16} /> PDF file
        </label>
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mt-1 text-sm" />
        {fileName && <p className="text-xs text-gray-400 mt-1">Selected: {fileName}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Data Structures"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Topic</label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Binary Trees"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="What's covered in these notes?"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Price (₹)</label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0 for free"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Semester / course (optional)</label>
          <input
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder="e.g. Semester 3"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full py-2.5 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
      >
        List these notes
      </button>
    </form>
  );
}

export default UploadNoteForm;
