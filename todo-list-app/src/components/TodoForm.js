import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(inputValue);
    setInputValue('');
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="todo-input"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={handleChange}
          autoFocus
        />
        <button type="submit" className="add-btn">
          ➕ Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
