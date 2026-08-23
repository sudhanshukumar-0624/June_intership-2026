import { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";

// Palette of note colours
const NOTE_COLORS = [
  { bg: "#a8c4e0", border: "#8aa8c8", label: "Sky Blue" },
  { bg: "#f0a090", border: "#d8857a", label: "Coral" },
  { bg: "#c5b8e8", border: "#a89dd0", label: "Lavender" },
  { bg: "#f5d98a", border: "#d4bc70", label: "Sunny Yellow" },
  { bg: "#98d4b0", border: "#78b894", label: "Mint Green" },
  { bg: "#f0c0a0", border: "#d4a080", label: "Peach" },
  { bg: "#b8d8b0", border: "#98bc90", label: "Sage" },
  { bg: "#e8c8a0", border: "#cca878", label: "Warm Sand" },
];

const randomBetween = (a, b) => Math.random() * (b - a) + a;
const randomRotation = () => randomBetween(-8, 8);

const getInitialPosition = (index) => {
  const cols = 4;
  const col = index % cols;
  const row = Math.floor(index / cols);
  return {
    x: 80 + col * 230 + randomBetween(-30, 30),
    y: 180 + row * 240 + randomBetween(-20, 20),
  };
};

// Single Note Component
function StickyNote({ note, onDelete, onUpdate, onBringToFront }) {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState(note.position);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const dragOffset = useRef({ x: 0, y: 0 });
  const color = NOTE_COLORS[note.colorIndex % NOTE_COLORS.length];

  const handleMouseDown = useCallback(
    (e) => {
      if (isEditing) return;
      if (e.target.closest(".note-actions")) return;
      e.preventDefault();
      onBringToFront(note.id);
      dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      setIsDragging(true);
    },
    [pos, isEditing, note.id, onBringToFront]
  );

  useEffect(() => {
    if (!isDragging) return;
    const move = (e) =>
      setPos({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    const up = () => {
      setIsDragging(false);
      onUpdate(note.id, { position: pos });
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [isDragging, note.id, onUpdate, pos]);

  const saveEdit = () => {
    onUpdate(note.id, { title: editTitle, content: editContent });
    setIsEditing(false);
  };

  const now = new Date(note.createdAt);
  const dateStr = `${now.getDate().toString().padStart(2, "0")} / ${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")} / ${now.getFullYear()}`;

  return (
    <div
      className={`sticky-note ${isDragging ? "dragging" : ""}`}
      style={{
        left: pos.x,
        top: pos.y,
        transform: `rotate(${note.rotation}deg)`,
        zIndex: note.zIndex,
        "--note-bg": color.bg,
        "--note-border": color.border,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={() => {
        if (!isEditing) {
          setIsEditing(true);
          onBringToFront(note.id);
        }
      }}
    >
      <div className="note-pin" />
      <div className="note-inner">
        {isEditing ? (
          <div className="note-edit-mode">
            <input
              className="edit-title-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="title..."
              autoFocus
              onMouseDown={(e) => e.stopPropagation()}
            />
            <textarea
              className="edit-content-input"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="write your note here..."
              onMouseDown={(e) => e.stopPropagation()}
            />
            <div className="edit-buttons" onMouseDown={(e) => e.stopPropagation()}>
              <button className="btn-save" onClick={saveEdit}>
                Save
              </button>
              <button className="btn-cancel-note" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="note-header">
              {note.title && <p className="note-title">{note.title}</p>}
              <div className="note-title-line" />
            </div>
            <div className="note-body">
              <p className="note-content">
                {note.content || (
                  <span className="placeholder-text">double-click to edit...</span>
                )}
              </p>
            </div>
            <div className="note-footer">
              <span className="note-date">date: {dateStr}</span>
            </div>
          </>
        )}
      </div>
      {!isEditing && (
        <div className="note-actions">
          <button
            className="action-btn edit-btn"
            title="Edit note"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
              onBringToFront(note.id);
            }}
          >
            ✏
          </button>
          <button
            className="action-btn delete-btn"
            title="Delete note"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

// Add Note Modal
function AddNoteModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [colorIndex, setColorIndex] = useState(
    Math.floor(Math.random() * NOTE_COLORS.length)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAdd({ title: title.trim(), content: content.trim(), colorIndex });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">✦ new memo</h2>
        <form onSubmit={handleSubmit}>
          <label className="modal-label">
            title <span>(optional)</span>
          </label>
          <input
            className="modal-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="today, i feel..."
            autoFocus
          />
          <label className="modal-label">note</label>
          <textarea
            className="modal-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="write something meaningful..."
            required
            rows={5}
          />
          <label className="modal-label">colour</label>
          <div className="color-picker">
            {NOTE_COLORS.map((c, i) => (
              <button
                key={i}
                type="button"
                className={`color-swatch ${colorIndex === i ? "selected" : ""}`}
                style={{ background: c.bg, borderColor: c.border }}
                title={c.label}
                onClick={() => setColorIndex(i)}
              />
            ))}
          </div>
          <div
            className="note-preview"
            style={{
              "--note-bg": NOTE_COLORS[colorIndex].bg,
              "--note-border": NOTE_COLORS[colorIndex].border,
            }}
          >
            <div className="note-pin" />
            <div className="note-inner preview-inner">
              {title && <p className="note-title">{title}</p>}
              <div className="note-title-line" />
              <p
                className="note-content"
                style={{ marginTop: 8, whiteSpace: "pre-wrap" }}
              >
                {content || (
                  <span className="placeholder-text">
                    your note will appear here...
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel-modal" onClick={onClose}>
              cancel
            </button>
            <button type="submit" className="btn-add-modal">
              add note ✦
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main App
const STORAGE_KEY = "sticky_notes_v1";

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [notes, setNotes] = useState(() => loadNotes());
  const [showModal, setShowModal] = useState(false);
  const [maxZ, setMaxZ] = useState(10);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const bringToFront = useCallback((id) => {
    setMaxZ((z) => {
      const newZ = z + 1;
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, zIndex: newZ } : n))
      );
      return newZ;
    });
  }, []);

  const addNote = ({ title, content, colorIndex }) => {
    const newZ = maxZ + 1;
    setMaxZ(newZ);
    setNotes((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        content,
        colorIndex,
        rotation: randomRotation(),
        position: getInitialPosition(prev.length),
        zIndex: newZ,
        createdAt: Date.now(),
      },
    ]);
  };

  const deleteNote = (id) =>
    setNotes((prev) => prev.filter((n) => n.id !== id));

  const updateNote = (id, changes) =>
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...changes } : n))
    );

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <span className="header-star">✦</span>
          <h1 className="header-title">which memo should i fill in today?</h1>
          <span className="header-star">✦</span>
        </div>
        <button
          className="add-note-btn"
          id="add-note-button"
          onClick={() => setShowModal(true)}
        >
          <span className="plus-icon">+</span>
          new note
        </button>
      </header>

      <main className="board">
        {notes.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">✦</div>
            <p>your board is empty.</p>
            <p className="empty-sub">
              click <strong>new note</strong> to add your first memo.
            </p>
          </div>
        )}
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onUpdate={updateNote}
            onBringToFront={bringToFront}
          />
        ))}
      </main>

      {showModal && (
        <AddNoteModal onClose={() => setShowModal(false)} onAdd={addNote} />
      )}
    </div>
  );
}
