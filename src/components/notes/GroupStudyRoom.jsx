import React, { useState, useEffect } from "react";

export default function GroupStudyRoom({
  rooms,
  activeRoomId,
  onSelectRoom,
  onCreateRoomClick,
  onTriggerToast
}) {
  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];
  const [currentPage, setCurrentPage] = useState(activeRoom?.currentPage || 7);
  const [chatInput, setChatInput] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
  const [highlightedTextIndex, setHighlightedTextIndex] = useState(null);

  useEffect(() => {
    if (activeRoom) {
      setCurrentPage(activeRoom.currentPage || 7);
    }
  }, [activeRoomId]);

  useEffect(() => {
    let interval = null;
    if (isPomodoroRunning && pomodoroSeconds > 0) {
      interval = setInterval(() => {
        setPomodoroSeconds((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroSeconds === 0) {
      setIsPomodoroRunning(false);
      onTriggerToast("⏰ Pomodoro session complete! Take a 5-minute break.");
    }
    return () => clearInterval(interval);
  }, [isPomodoroRunning, pomodoroSeconds, onTriggerToast]);

  const formatTimer = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "Alex Sharma (You)",
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      avatar: "YOU",
      color: "#6B1E2D"
    };

    activeRoom.chat = [...(activeRoom.chat || []), newMsg];
    setChatInput("");

    setTimeout(() => {
      const peerResponses = [
        "Great point! I was just reviewing that formula.",
        "Got it! That clarifies the doubt for the semester viva.",
        "Let's move to the next page once we finish this section 🚀",
        "Added this definition to my exam revision cheat sheet!"
      ];
      const randomResponse = peerResponses[Math.floor(Math.random() * peerResponses.length)];
      const botMsg = {
        id: Date.now() + 1,
        sender: activeRoom.activeStudents[1]?.name || "Study Peer",
        text: randomResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        avatar: "PEER",
        color: "#10B981"
      };
      activeRoom.chat = [...(activeRoom.chat || []), botMsg];
    }, 2000);
  };

  const handleReaction = (emoji) => {
    onTriggerToast(`Reacted ${emoji} in ${activeRoom.title}`);
  };

  return (
    <div className="group-study-container">
      {/* Active Rooms Bar */}
      <div className="active-rooms-bar">
        <span className="rooms-bar-label">Active Campus Rooms:</span>
        <div className="rooms-list-scroll">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className={`room-tab-pill ${room.id === activeRoomId ? "active" : ""}`}
            >
              <span className="room-code">{room.code}</span>
              <span className="room-name">{room.subject} · {room.title.substring(0, 26)}...</span>
              <span className="room-members">👥 {room.activeStudents?.length || 2}</span>
            </button>
          ))}

          <button onClick={onCreateRoomClick} className="btn-add-room-pill">
            <span>➕ New Room</span>
          </button>
        </div>
      </div>

      {/* Workspace Grid */}
      <div className="study-room-workspace">
        <div className="canvas-column">
          <div className="room-header-strip">
            <div className="room-meta">
              <span className="room-badge">{activeRoom.code}</span>
              <div>
                <h3 className="room-title">{activeRoom.title}</h3>
                <p className="room-subtitle">🎯 Goal: {activeRoom.topic}</p>
              </div>
            </div>

            <div className="room-toolbelt">
              <div className="pomo-widget" title="Pomodoro Focus Timer">
                <span className="pomo-icon">⏳</span>
                <span className="pomo-digits">{formatTimer(pomodoroSeconds)}</span>
                <button
                  onClick={() => setIsPomodoroRunning(!isPomodoroRunning)}
                  className="pomo-toggle"
                >
                  {isPomodoroRunning ? "⏸️" : "▶️"}
                </button>
                <button
                  onClick={() => {
                    setIsPomodoroRunning(false);
                    setPomodoroSeconds(25 * 60);
                  }}
                  className="pomo-reset"
                >
                  🔄
                </button>
              </div>

              <button
                onClick={() => {
                  setIsMusicPlaying(!isMusicPlaying);
                  onTriggerToast(!isMusicPlaying ? "🎵 Playing Lo-Fi Beats" : "🔇 Music Paused");
                }}
                className={`btn-tool-pill ${isMusicPlaying ? "active" : ""}`}
              >
                {isMusicPlaying ? "🎧 Lo-Fi (On)" : "🎵 Lo-Fi Beats"}
              </button>

              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  onTriggerToast(isMuted ? "🎤 Mic unmuted" : "🔇 Mic muted");
                }}
                className={`btn-tool-pill ${isMuted ? "muted" : ""}`}
              >
                {isMuted ? "🔇 Muted" : "🎙️ Mic"}
              </button>
            </div>
          </div>

          <div className="room-presence-row">
            <span className="presence-title">
              👥 Study Circle ({activeRoom.activeStudents?.length || 3} Online):
            </span>
            <div className="presence-chips">
              {activeRoom.activeStudents?.map((student) => (
                <div key={student.id} className="student-presence-chip">
                  <span className="chip-avatar">
                    {student.avatar}
                  </span>
                  <div className="chip-details">
                    <span className="chip-name">{student.name}</span>
                    <span className="chip-sub">Pg {currentPage} · {student.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="synchronized-document-box">
            <div className="doc-page-controls">
              <div className="nav-buttons">
                <button
                  disabled={currentPage <= 6}
                  onClick={() => {
                    const newP = Math.max(6, currentPage - 1);
                    setCurrentPage(newP);
                    onTriggerToast(`Synced room to Page ${newP}`);
                  }}
                  className="btn-doc-nav"
                >
                  ◀ Prev
                </button>
                <span className="doc-page-counter">
                  Page <strong>{currentPage}</strong> of {activeRoom.totalPages}
                </span>
                <button
                  disabled={currentPage >= 8 && !activeRoom.pagesData[currentPage + 1]}
                  onClick={() => {
                    const newP = currentPage + 1;
                    if (activeRoom.pagesData[newP]) {
                      setCurrentPage(newP);
                      onTriggerToast(`Synced room to Page ${newP}`);
                    }
                  }}
                  className="btn-doc-nav"
                >
                  Next ▶
                </button>
              </div>

              <span className="sync-status-indicator">
                📡 Live Page Sync Active (All members view together)
              </span>
            </div>

            <div className="document-sheet">
              {activeRoom.pagesData && activeRoom.pagesData[currentPage] ? (
                <div className="sheet-inner">
                  <h4 className="sheet-unit-heading">{activeRoom.pagesData[currentPage].title}</h4>
                  <h5 className="sheet-section-title">{activeRoom.pagesData[currentPage].heading}</h5>
                  <div className="sheet-paragraphs">
                    {activeRoom.pagesData[currentPage].content.map((para, idx) => (
                      <p
                        key={idx}
                        onClick={() => {
                          setHighlightedTextIndex(highlightedTextIndex === idx ? null : idx);
                          onTriggerToast(
                            highlightedTextIndex === idx
                              ? "Removed highlight"
                              : "✨ Highlighted line for everyone in room!"
                          );
                        }}
                        className={`sheet-para ${highlightedTextIndex === idx ? "highlighted-para" : ""}`}
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  {activeRoom.pagesData[currentPage].diagram && (
                    <div className="sheet-formula-box">
                      <span className="box-tag">📊 Key Diagram & Formula:</span>
                      <code>{activeRoom.pagesData[currentPage].diagram}</code>
                    </div>
                  )}

                  {activeRoom.pagesData[currentPage].callout && (
                    <div className="sheet-callout-box">
                      <span className="callout-icon">💡</span>
                      <span>{activeRoom.pagesData[currentPage].callout}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="sheet-inner">
                  <h4 className="sheet-unit-heading">{activeRoom.title}</h4>
                  <p className="sheet-para">Live collaborative revision session active for <strong>{activeRoom.subject}</strong>.</p>
                </div>
              )}

              {/* Collaborative Pointers */}
              <div className="live-cursor cursor-peer-1">
                <span className="cursor-arrow cursor-color-purple">▲</span>
                <span className="cursor-label cursor-bg-purple">Aanya (Reading)</span>
              </div>
              <div className="live-cursor cursor-peer-2">
                <span className="cursor-arrow cursor-color-emerald">▲</span>
                <span className="cursor-label cursor-bg-emerald">Rahul (Highlighting)</span>
              </div>
            </div>

            <div className="room-reactions-strip">
              <span className="reaction-prompt">Quick Reactions:</span>
              <div className="reactions-row">
                {["🔥 Understood", "💡 Great Point", "👏 Nice Note", "❓ Confused", "🚀 Ready for Exam"].map((r) => (
                  <button key={r} onClick={() => handleReaction(r)} className="btn-reaction">
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Discussion Chat */}
        <div className="chat-column">
          <div className="chat-head">
            <div>
              <h4>💬 Room Discussion</h4>
              <span className="chat-sub">Room {activeRoom.code}</span>
            </div>
            <span className="chat-badge">{activeRoom.chat?.length || 0} msgs</span>
          </div>

          <div className="chat-body-scroll">
            {activeRoom.chat?.map((m) => (
              <div key={m.id} className={`chat-bubble ${m.avatar === "YOU" || m.avatar === "ME" ? "mine" : "peer"}`}>
                <div className="bubble-head">
                  <span className="bubble-sender">{m.sender}</span>
                  <span className="bubble-time">{m.time}</span>
                </div>
                <div className="bubble-text">{m.text}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="chat-form">
            <input
              type="text"
              placeholder="Ask a question or explain a point..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="chat-input"
            />
            <button type="submit" className="btn-chat-send">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}