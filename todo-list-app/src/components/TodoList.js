import React, { useState } from 'react';
import './TodoList.css';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // all, completed, pending

  // Add new task
  const addTask = (taskText) => {
    if (taskText.trim() === '') {
      alert('Please enter a task!');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };

    setTasks([newTask, ...tasks]);
  };

  // Delete task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Edit task
  const editTask = (id, newText) => {
    if (newText.trim() === '') {
      alert('Task cannot be empty!');
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  // Clear all completed tasks
  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  // Get filtered tasks
  const getFilteredTasks = () => {
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    } else if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="todo-container">
      <div className="todo-wrapper">
        <header className="todo-header">
          <h1>📝 My To-Do List</h1>
          <p className="subtitle">Stay organized and productive</p>
        </header>

        {/* Statistics */}
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Total Tasks:</span>
            <span className="stat-value">{tasks.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completed:</span>
            <span className="stat-value completed">{completedCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Pending:</span>
            <span className="stat-value pending">{pendingCount}</span>
          </div>
        </div>

        {/* Add Task Form */}
        <TodoForm onAddTask={addTask} />

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Tasks ({tasks.length})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({pendingCount})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Tasks List */}
        <div className="tasks-section">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                {filter === 'all' && '📋'}
                {filter === 'pending' && '✅'}
                {filter === 'completed' && '🎉'}
              </div>
              <p>
                {filter === 'all' && 'No tasks yet. Add one to get started!'}
                {filter === 'pending' && 'All tasks are completed! 🎊'}
                {filter === 'completed' && 'No completed tasks yet.'}
              </p>
            </div>
          ) : (
            <div className="tasks-list">
              {filteredTasks.map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  onDelete={deleteTask}
                  onToggle={toggleTaskCompletion}
                  onEdit={editTask}
                />
              ))}
            </div>
          )}
        </div>

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <button className="clear-btn" onClick={clearCompletedTasks}>
            🗑️ Clear Completed Tasks
          </button>
        )}

        {/* Progress Bar */}
        {tasks.length > 0 && (
          <div className="progress-section">
            <div className="progress-label">
              Progress: {completedCount} of {tasks.length} completed
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(completedCount / tasks.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
