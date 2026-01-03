import React, {useState, useEffect} from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  // Server-side log
  if (__NODE__) console.log('HOME COMPONENT RENDERED (SERVER)');

  // Client-side: load todos
  useEffect(() => {
    if (__BROWSER__) {
      console.log('HOME COMPONENT RENDERED (CLIENT)');

      const stored = localStorage.getItem('todos');
      if (stored) {
        setTodos(JSON.parse(stored));
        console.log('Loaded todos:', JSON.parse(stored));
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTodo = {id: Date.now(), text};
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setText('');

    if (__BROWSER__) console.log('Added new todo:', newTodo);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    if (__BROWSER__) console.log('Deleted todo with id:', id);
  };

  // Inline styles
  const containerStyle = {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '24px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center',
  };

  const formStyle = {
    display: 'flex',
    marginBottom: '16px',
  };

  const inputStyle = {
    flex: 1,
    border: '1px solid #ccc',
    borderRadius: '4px 0 0 4px',
    padding: '8px 12px',
    outline: 'none',
  };

  const buttonStyle = {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    padding: '8px 0',
  };

  const deleteButtonStyle = {
    color: '#dc3545',
    fontWeight: 'bold',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Fusion Todo App</h1>

      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add todo"
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Add
        </button>
      </form>

      <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
        {todos.map(todo => (
          <li key={todo.id} style={listItemStyle}>
            <span>{todo.text}</span>
            <button
              onClick={() => handleDelete(todo.id)}
              style={deleteButtonStyle}
              onMouseOver={(e) => e.currentTarget.style.color = '#a71d2a'}
              onMouseOut={(e) => e.currentTarget.style.color = '#dc3545'}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
