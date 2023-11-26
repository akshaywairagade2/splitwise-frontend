import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Authentication/Login';
import SignUp from "./Authentication/Signup"
import Homepage from './pages/HomePage/homepage';
import MyRequestPage from './pages/MyRequests/MyRequestPage';
import FriendsPage from "./pages/Friends/FriendsPage";
import InviteFriendsPage from "./pages/InviteFriends/InviteFriendsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myrequests" element={<MyRequestPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/invitefriends" element={<InviteFriendsPage />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
