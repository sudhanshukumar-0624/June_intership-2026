import React, { useState } from 'react';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEdit(task.id, { title: editTitle.trim(), dueDate: editDueDate || null });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDueDate(task.dueDate || '');
    setIsEditing(false);
  };

  const isOverdue = task.dueDate && !task.completed &&
    new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));
  const isDueToday = task.dueDate &&
    new Date(task.dueDate + 'T00:00:00').toDateString() === new Date().toDateString();

  const formatDate = (d) => {
    if (!d) return null;
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric',
    });
  };

  const cardClass = {
    high:   'card-yellow',
    medium: 'card-blue',
    low:    'card-white',
  }[task.priority || 'low'];

  return (
    <div className={`task-card ${cardClass} ${task.completed ? 'card-done' : ''}`}>
      {isEditing ? (
        <div className="card-edit">
          <input
            className="card-edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel(); }}
            autoFocus
            maxLength={120}
          />
          <input
            type="date"
            className="card-edit-date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
          />
          <div className="card-edit-actions">
            <button className="card-btn-save" onClick={handleSave}>Save</button>
            <button className="card-btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          {/* Card top row */}
          <div className="card-top">
            <div className="card-priority-tag">
              {task.priority === 'high' && '↑ High'}
              {task.priority === 'medium' && '→ Mid'}
              {task.priority === 'low' && '↓ Low'}
            </div>
            <div className="card-actions">
              <button
                className="card-icon-btn"
                onClick={() => !task.completed && setIsEditing(true)}
                aria-label="Edit"
                disabled={task.completed}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button
                className="card-icon-btn card-icon-delete"
                onClick={() => onDelete(task.id)}
                aria-label="Delete"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Title */}
          <p className={`card-title ${task.completed ? 'card-title-done' : ''}`}>
            {task.title}
          </p>

          {/* Card bottom row */}
          <div className="card-bottom">
            {task.dueDate && (
              <span className={`card-date-tag ${isOverdue ? 'date-overdue' : isDueToday ? 'date-today' : ''}`}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {isOverdue ? '⚠ ' : ''}{isDueToday ? 'Today' : formatDate(task.dueDate)}
              </span>
            )}

            <button
              className={`card-check-btn ${task.completed ? 'check-done' : ''}`}
              onClick={() => onToggle(task.id)}
              aria-label={task.completed ? 'Mark pending' : 'Mark done'}
            >
              {task.completed ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Done
                </>
              ) : 'Mark done'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
