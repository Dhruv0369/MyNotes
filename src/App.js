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
import Alert from './components/Alert';  // Import default
import Signup from './components/Signup';  // Ensure Signup has a default export
import Login from './components/Login';  // Ensure Login has a default export
// import { ToastContainer } from 'react-toastify';
import { Toaster, toast } from 'sonner';




function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Toaster richColors position="top-center" />
        <Alert message="This is amazing React course" />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
