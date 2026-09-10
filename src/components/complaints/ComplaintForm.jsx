import { useState } from "react";
import { ArrowLeft, Paperclip } from "lucide-react";

/**
 * Complaint form for a single category.
 * category is passed in from the parent (already chosen in step 1).
 * onSubmit(complaint) hands a fully-formed complaint back to the page.
 */
function ComplaintForm({ category, onBack, onSubmit }) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [attachmentName, setAttachmentName] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setAttachmentName(file ? file.name : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim() || !location.trim()) {
      setError("Subject, description, and location are required.");
      return;
    }

    onSubmit({
      category,
      subject: subject.trim(),
      description: description.trim(),
      location: location.trim(),
      date,
      attachmentName,
    });
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-blue-600 hover:underline mb-4">
        <ArrowLeft size={16} /> Change category
      </button>

      <h2 className="text-xl font-semibold text-gray-800 mb-1">{category} complaint</h2>
      <p className="text-gray-500 mb-6">Give us the details so it can be routed correctly.</p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="text-sm font-medium text-gray-700">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Short summary of the issue"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Describe the issue in detail"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Hostel Block B, Room 204"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Paperclip size={16} /> Image / document <span className="text-gray-400">(optional)</span>
          </label>
          <input type="file" onChange={handleFileChange} className="mt-1 text-sm" />
          {attachmentName && <p className="text-xs text-gray-400 mt-1">Attached: {attachmentName}</p>}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Submit complaint
        </button>
      </form>
    </div>
  );
}

export default ComplaintForm;
