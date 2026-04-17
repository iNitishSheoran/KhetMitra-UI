import './App.css';
import { Routes, Route } from "react-router-dom";

// ✅ Pages
import Body from './pages/Body';
import Signup from './pages/Signup';
import Login from './pages/Login';
import HelpForm from './pages/HelpForm';
import MyRequests from './pages/MyRequests';
import CropPage from './pages/CropPage';
import AdminAllHelp from './pages/AdminAllHelp';
import About from './pages/About';
import Diagnose from './pages/Diagnose';
import UserProfile from './pages/UserProfile';
import EditProfile from "./pages/EditProfile";
import Daam from "./pages/Daam";
import KMStudio from './pages/KM-Studio';
import Shop from './pages/Shop';
import WeatherPage from "./pages/WeatherPage";
import Forecast from "./pages/Forecast";
import Dashboard from "./pages/Dashboard";
import FarmDetail from "./pages/FarmDetail";

// ✅ Components
import WeatherButton from "./components/WeatherButton";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/help" element={<HelpForm />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/cropData" element={<CropPage />} />
        <Route path="/allHelp" element={<AdminAllHelp />} />
        <Route path="/about" element={<About />} />
        <Route path="/diagnose" element={<Diagnose />} />
        <Route path="/myProfile" element={<UserProfile />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/daam" element={<Daam />} />
        <Route path="/kmstudio" element={<KMStudio />} />
        <Route path="/shopping" element={<Shop />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/forecast" element={<Forecast />} /> 
        <Route path="/" element={<Dashboard />} />
        <Route path="/farm-detail" element={<FarmDetail />} />
      </Routes>
    </div>
  );
}

export default App;
