import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import SIgnup from './pages/SIgnup'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<SIgnup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='*' element={<center>page not found</center>}/>
      </Routes>
    </Router>
  )
}

export default App
