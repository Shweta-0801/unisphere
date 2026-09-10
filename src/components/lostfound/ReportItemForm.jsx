import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import CampusMap from "./CampusMap";

/**
 * Report a lost or found item.
 * Calls onSubmit(newItem) with a fully-formed item object — the parent
 * page (LostFoundPage) decides how to store it.
 */
function ReportItemForm({ onSubmit }) {
  const [type, setType] = useState("lost");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locationText, setLocationText] = useState("");
  const [note, setNote] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [pickedLocation, setPickedLocation] = useState(null);
  const [error, setError] = useState("");

  const handleMapClick = (x, y) => setPickedLocation({ x, y });

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Store as a local object URL just so we have something to preview.
    // A real backend would upload this file and store a server URL instead.
    setPhotoUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !locationText.trim()) {
      setError("Item name and location are required.");
      return;
    }
    if (!pickedLocation) {
      setError("Tap the map to mark where the item was lost/found.");
      return;
    }

    onSubmit({
      type,
      name: name.trim(),
      description: description.trim(),
      locationText: locationText.trim(),
      note: note.trim() || (type === "lost" ? "Lost item reported" : `Found near ${locationText.trim()}`),
      photoUrl,
      x: pickedLocation.x,
      y: pickedLocation.y,
    });

    // reset form
    setName("");
    setDescription("");
    setLocationText("");
    setNote("");
    setPhotoUrl("");
    setPickedLocation(null);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
      {/* Left: form fields */}
      <div className="space-y-4">
        {/* Lost / Found toggle */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200">
          <button
            type="button"
            onClick={() => setType("lost")}
            className={`flex-1 py-2 text-sm font-semibold ${
              type === "lost" ? "bg-red-500 text-white" : "bg-white text-gray-600"
            }`}
          >
            🔴 I lost something
          </button>
          <button
            type="button"
            onClick={() => setType("found")}
            className={`flex-1 py-2 text-sm font-semibold ${
              type === "found" ? "bg-green-500 text-white" : "bg-white text-gray-600"
            }`}
          >
            🟢 I found something
          </button>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Item name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Blue water bottle"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Any identifying details..."
            rows={3}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Location (text)</label>
          <input
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            placeholder="e.g. Near Library entrance"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Note shown on the map <span className="text-gray-400">(optional)</span>
          </label>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder='e.g. "Collect this from Block A reception"'
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <ImageIcon size={16} /> Photo <span className="text-gray-400">(optional)</span>
          </label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-1 text-sm" />
          {photoUrl && (
            <img src={photoUrl} alt="preview" className="mt-2 h-24 w-24 object-cover rounded-lg border" />
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Submit report
        </button>
      </div>

      {/* Right: map to pick a pin location */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Tap the map to mark the spot</p>
        <CampusMap items={[]} onMapClick={handleMapClick} pickedLocation={pickedLocation} />
      </div>
    </form>
  );
}

export default ReportItemForm;
