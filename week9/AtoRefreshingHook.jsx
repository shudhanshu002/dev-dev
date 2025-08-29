import React, { useEffect, useState } from 'react'

function useTodos(n) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);


    function getData() {
        axios.get("")
            .then(res=> {
                setTodos(res.data.todos)
                setLoading(false);
            })
            .catch(error => {
                console.error("Eror laoding todos");
                setLoading(false);
            })
    }

    useEffect(()=> {
        getData();

        const intervalId = setInterval(()=> {
            getData();
        },n*1000);

        return () => clearInterval(intervalId);
    },[n]);

    return {
        todos: todos,
        loading: loading
    };
}

function App() {
  // Using the custom hook to fetch todos with auto-refresh every 5 seconds
  const { todos, loading } = useTodos(5);

  // Rendering loading message if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Rendering Track component for each todo
  return (
    <>
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
