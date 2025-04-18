import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom"
import Signup from "./pages/SIgnup"
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/signup"/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='*' element={<center>page not found</center>}/>
      </Routes>
    </Router>
  )
}

export default App
