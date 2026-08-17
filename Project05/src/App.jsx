import React, { useState, useEffect } from 'react';
import Navbar from './components/Header';
import AddTask from './components/AddTask';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import './App.css';

const STORAGE_KEY = 'taskflow_v2_tasks';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = (msg, type = 'success') => setToast({ msg, type });

  const handleAddTask = (task) => {
    setTasks((prev) => [task, ...prev]);
    showToast('Task added! ✦');
  };

  const handleToggle = (id) => {
    const task = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
    showToast(task?.completed ? 'Marked as pending.' : 'Task completed! 🎉', task?.completed ? 'info' : 'success');
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('Task removed.', 'error');
  };

  const handleEdit = (id, updates) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, ...updates } : t));
    showToast('Task updated! ✏️', 'info');
  };

  const handleClearCompleted = () => {
    const count = tasks.filter((t) => t.completed).length;
    if (!count) return;
    setTasks((prev) => prev.filter((t) => !t.completed));
    showToast(`Cleared ${count} completed task${count > 1 ? 's' : ''}.`, 'info');
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-root">
      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <span>{toast.msg}</span>
          <button className="toast-x" onClick={() => setToast(null)}>✕</button>
        </div>
      )}

      {/* Add Task Modal */}
      <AddTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />

      {/* Navbar + Hero */}
      <Navbar
        totalTasks={tasks.length}
        completedTasks={completedCount}
        onOpenAdd={() => setIsModalOpen(true)}
      />

      {/* Main content */}
      <main className="page-content">
        <div className="content-header">
          <FilterBar filter={filter} onFilterChange={setFilter} tasks={tasks} />
          {completedCount > 0 && (
            <button className="clear-done-btn" onClick={handleClearCompleted} id="clear-completed-btn">
              Clear done ({completedCount})
            </button>
          )}
        </div>

        <TaskList
          tasks={tasks}
          filter={filter}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </main>

      <footer className="page-footer">
        <span>TaskFlow © {new Date().getFullYear()}</span>
        <span className="footer-dot">·</span>
        <span>Tasks saved to your browser</span>
      </footer>
    </div>
  );
};

export default App;
