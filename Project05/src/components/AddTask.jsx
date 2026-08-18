import React, { useState, useEffect, useRef } from 'react';

const AddTask = ({ onAddTask, isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a task title.');
      return;
    }
    onAddTask({
      id: Date.now(),
      title: title.trim(),
      completed: false,
      dueDate: dueDate || null,
      priority,
      createdAt: new Date().toISOString(),
    });
    setTitle('');
    setDueDate('');
    setPriority('medium');
    setError('');
    onClose();
  };

  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">New Task</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-field">
            <label className="form-label" htmlFor="task-title">Task title</label>
            <input
              ref={inputRef}
              id="task-title"
              type="text"
              className={`form-input ${error ? 'form-input-error' : ''}`}
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError(''); }}
              maxLength={120}
            />
            {error && <span className="form-error">{error}</span>}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label" htmlFor="task-due">Due date</label>
              <input
                id="task-due"
                type="date"
                className="form-input form-date"
                value={dueDate}
                min={today}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Priority</label>
              <div className="priority-pills">
                {[
                  { key: 'low',    label: '↓ Low' },
                  { key: 'medium', label: '→ Medium' },
                  { key: 'high',   label: '↑ High' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    className={`priority-pill priority-pill-${key} ${priority === key ? 'priority-pill-active' : ''}`}
                    onClick={() => setPriority(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-create" id="create-task-btn">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
