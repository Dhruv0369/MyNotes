import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';  // Import default
import About from './components/About';  // Ensure About has a default export
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';  // Ensure Signup has a default export
import Login from './components/Login';  // Ensure Login has a default export
import { Toaster } from 'sonner';
import Profile from './components/Profile';




function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Toaster richColors position="top-center" />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
