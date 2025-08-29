import { useEffect, useState } from 'react';
import axios from 'axios';

// Custom hook for fetching todos
function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching todos using Axios
    axios.get("<https://sum-server.100xdevs.com/todos>")
      .then(res => {
        setTodos(res.data.todos);
        setLoading(false);
      })
      .catch(error=> {
        console.error("Error fetching todos");
        setLoading(false);
      })
  }, []);

  // Return the todos state
  return {
    todos : todos,
    loading: loading
  };
}

// Main App component
function App() {
  // Using the custom hook to fetch todos
  const {todos, loading} = useTodos();

  if(loading){
    return <div>loading...</div>
  }

  return (
    <>
      {/* Rendering Track component for each todo */}
      {todos.map(todo => <Track key={todo.id} todo={todo} />)}
    </>
  );
}

// Track component for rendering individual todo
function Track({ todo }) {
  return (
    <div>
      {todo.title}
      <br />
      {todo.description}
    </div>
  );
}

export default App;