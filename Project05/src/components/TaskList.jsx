import React from 'react';
import TaskItem from './TaskItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faTrophy, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const TaskList = ({ tasks, filter, onToggle, onDelete, onEdit }) => {
  const filtered = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  const emptyStates = {
    all: {
      icon: faBullseye,
      iconClass: 'empty-icon-bullseye',
      title: 'No tasks yet',
      sub: 'Click "Add task" above to get started.',
    },
    completed: {
      icon: faTrophy,
      iconClass: 'empty-icon-trophy',
      title: 'Nothing completed yet',
      sub: 'Finish some tasks to see them here.',
    },
    pending: {
      icon: faCircleCheck,
      iconClass: 'empty-icon-check',
      title: 'All caught up!',
      sub: 'You have no pending tasks right now.',
    },
  };

  if (filtered.length === 0) {
    const { icon, iconClass, title, sub } = emptyStates[filter];
    return (
      <div className="empty-state">
        <div className={`empty-fa-icon ${iconClass}`}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <p className="empty-title">{title}</p>
        <p className="empty-sub">{sub}</p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {filtered.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
