import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import Display from './components/Display'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Recoil selector eg...</h1>
    <Counter/>
    <Display/>
    </>
  )
}

export default App
