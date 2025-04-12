
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Profile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import MyAppointment from "./pages/MyAppointments";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import AdminNavbar from "./components/AdminNavbar";
import AdminHome from "./pages/AdminHome";
import AdminDashboard from "./components/AdminDashboard";
import Appointments from "./components/Appointments";
import DoctorList from "./components/DoctorList";
import AdminAddDoctor from "./components/AdminAddDoctor";
import Booking from "./pages/Booking";
import { Card } from 'primereact/card';
import BottomHover from "./components/BottomHover";
import DoctorLogin from "./pages/Doctor/DoctorLogin";
import DoctorHome from "./pages/Doctor/DoctorHome";
import DoctorDashBoard from "./components/DoctorDashBoard";
import DoctorProfile from "./components/DoctorProfile";
import DoctorAppointments from "./components/DoctorAppointments";
        

function App() {
  const userProfile = localStorage.getItem('userProfile') || 'user'
  return (
    <>
    <BottomHover/>
      <Router>
        {
          userProfile==='admin'?<AdminNavbar/>:(userProfile==="user"?<Navbar/>:'')
        }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-home" element={<AdminHome><AdminDashboard/></AdminHome>} />
          <Route path="/appointments" element={<AdminHome><Appointments/></AdminHome>} />
          <Route path="/add-doctor" element={<AdminHome><AdminAddDoctor/></AdminHome>} />
          <Route path="/doctor-list" element={<AdminHome><DoctorList/></AdminHome>} />
          <Route path="/doctor-dashboard" element={<DoctorHome><DoctorDashBoard/></DoctorHome>} />
          <Route path="/doctor-profile" element={<DoctorHome><DoctorProfile/></DoctorHome>} />
          <Route path="/doctor-Appointments" element={<DoctorHome><DoctorAppointments/></DoctorHome>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctorById/:id" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/doctorLogin" element={<DoctorLogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointment/:docID" element={<Appointment />} />
          <Route path="/my-appointments" element={<MyAppointment />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;