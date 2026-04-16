import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ task, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(task.id, editedText);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditedText(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <div className="todo-item-content">
        <input
          type="checkbox"
          className="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <div className="todo-text-wrapper">
            <span className="todo-text">{task.text}</span>
            <span className="todo-time">{task.createdAt}</span>
          </div>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button
              className="action-btn save-btn"
              onClick={handleEdit}
              title="Save"
            >
              ✅
            </button>
            <button
              className="action-btn cancel-btn"
              onClick={handleCancel}
              title="Cancel"
            >
              ❌
            </button>
          </>
        ) : (
          <>
            <button
              className="action-btn edit-btn"
              onClick={handleEdit}
              title="Edit"
            >
              ✏️
            </button>
            <button
              className="action-btn delete-btn"
              onClick={() => onDelete(task.id)}
              title="Delete"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
