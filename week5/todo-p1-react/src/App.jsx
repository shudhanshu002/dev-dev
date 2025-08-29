// import './App.css';
// import {useEffect} from 'react';

// function App() {
//     useEffect(()=> {
//         const btn = document.getElementById('addBtn');
//         btn.addEventListener('click',()=>{
//             const title = document.getElementById('title').value;
//             document.getElementById('title').value = '';
//             const description = document.getElementById('description').value;
//             document.getElementById('description').value='';

//             if(title && description) {
//                 const todoDiv = document.createElement('div');
//                 todoDiv.className = `todo-item`;
//                 todoDiv.innerHTML = `
//                     <h3>${title}</h3>
//                     <p>${description}</p>
//                 `;
//                 document.getElementById('todoList').appendChild(todoDiv);
//             }
//         })
//     },[]);

//     return (
//         <>
//             <h1>TODO App (DOMM-based)</h1>
//             <input id='title' type='text' placeholder='Title'/>
//             <input id='description' type='text' placeholder='Description'/>
//             <button id='addBtn' > Add Todo </button>
//             <div id='todoList'></div>
//         </>
//     )
// }


// export default App;











/// NOW REAAct WAY
import { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  function addTodo() {
    if (title && description) {
      const newTodo = { title, description };
      setTodos([...todos, newTodo]);
      setTitle('');
      setDescription('');
    }
  }

  return (
    <div className='App'>
      <h1>TODO App (useState Version)</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>


      <div>
        {todos.map((todo, index) => {
          return (
            <div key={index} className='todo-item'>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App;