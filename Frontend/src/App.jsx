
import './App.css'

import Landing from "./pages/landing/Landing.jsx"
import { BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import Login from './pages/login/Login.jsx'
import Notfound from './pages/login/Notfound.jsx'
import AllClubs from './pages/clubs/AllClubs.jsx'

function App() {
  return(
   <Router>
    <Routes>
     <Route path='/' element={<Landing/>} />
     <Route path='/login' element={<Login/>} />
     <Route path='/clubs' element={<AllClubs/>} />
     <Route path='*' element={<Notfound/>} />
    </Routes>
   </Router>
  )
}

export default App
