import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { SingleWorkout } from "./pages/SingleWorkout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path="/workout/:id" element={user ? <SingleWorkout /> : <Navigate to='/login' />} />
          <Route path="/login" element={(!user) ? <Login /> : <Navigate to='/' />} />
          <Route path="/signup" element={(!user) ? <Signup /> : <Navigate to='/' />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
