import {useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useMemo } from 'react';

function App() {
  const [input, setInput] = useState(0);

  const expensiveValue = useMemo(() => {
    let value = 1;
    for(let i=1;i<5;i++) {
      value *= i;
    }
    return value;
  },[input]);

  return (
    <div>
      <input
        type='number'
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
      />
      <p>Calculated value : {expensiveValue}</p>
    </div>
  )
}

export default App
