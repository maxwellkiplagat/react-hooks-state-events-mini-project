import React, { useState } from "react";

function NewTaskForm({ categories, onTaskFormSubmit }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState(categories[1]); // skip "All"
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Task details cannot be empty");
      return;
    }

    setError(""); // Clear error if validation passes
    onTaskFormSubmit({ text, category });
    setText(""); // clear after submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-details">Details</label>
      <input
        type="text"
        id="task-details"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

      <label htmlFor="category">Category</label>
      <select
        id="category"
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories
          .filter((cat) => cat !== "All")
          .map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
      </select>

      <button type="submit" >Add Task</button> 
    </form>
  );
}

export default NewTaskForm;
