
import './App.css'

import Landing from "./pages/landing/Landing.jsx"
import { BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import Login from './pages/login/Login.jsx'
import Notfound from './pages/login/Notfound.jsx'
import AllClubs from './pages/clubs/AllClubs.jsx'
import ClubProfile from './pages/clubs/ClubProfile.jsx'
import Allevents from './pages/events/Allevents.jsx'
import Event from './pages/events/Event.jsx'
import AllAnnouncements from './pages/Anouncements/AllAnnouncements.jsx'
import Announcement from './pages/Anouncements/Announcement.jsx'
import Admin from './pages/Admin/Admin.jsx'

function App() {
  return(
   <Router>
    <Routes>
     <Route path='/' element={<Landing/>} />
     <Route path='/login' element={<Login/>} />
     <Route path='/admin' element={<Admin/>} />
     <Route path='/clubs' element={<AllClubs/>} />
     <Route path='*' element={<Notfound/>} />
     <Route path='clubs/club' element={<ClubProfile/>} />
     <Route path='/events' element={<Allevents/>} />
     <Route path='/events/event' element={<Event/>} />
     <Route path='/announcements' element={<AllAnnouncements/>} />
     <Route path='/announcements/announcement' element={<Announcement/>} />
    </Routes>
   </Router>
  )
}

export default App
