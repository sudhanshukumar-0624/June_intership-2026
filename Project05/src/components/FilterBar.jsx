import React from 'react';

const FilterBar = ({ filter, onFilterChange, tasks }) => {
  const counts = {
    all:       tasks.length,
    pending:   tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) =>  t.completed).length,
  };

  const options = [
    { key: 'all',       label: 'All tasks' },
    { key: 'pending',   label: 'Pending' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="filter-row">
      <div className="filter-tabs">
        {options.map(({ key, label }) => (
          <button
            key={key}
            id={`filter-${key}`}
            className={`filter-tab ${filter === key ? 'filter-tab-active' : ''}`}
            onClick={() => onFilterChange(key)}
          >
            {label}
            <span className="filter-tab-count">{counts[key]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
