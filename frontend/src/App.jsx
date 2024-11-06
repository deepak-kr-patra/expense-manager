import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import useAuthUser from './zustand/useAuthUser';
import useScreenWidth from './zustand/useScreenwidth';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {

  const { authUser } = useAuthUser();
  const { setScreenWidth } = useScreenWidth();

  window.onresize = function () {
    setScreenWidth(window.innerWidth);
  };

  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path="login/*" element={authUser ? <Navigate to={"/"} /> : <Login />} />
          <Route path="signup/*" element={authUser ? <Navigate to={"/"} /> : <Signup />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  )
}

export default App
