
import { Route, Routes } from 'react-router-dom'
import { Auth } from './components/Auth'
import { BlogSkeleton } from './components/BlogSkeleton'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'

function App() {

  return (
    
    <Routes >
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      {/* <Route path="/signup" element={<Signup/>} /> */}
      {/* <Route path="/signup" element={<Signup/>} /> */}
    </Routes>
  )
}

export default App
