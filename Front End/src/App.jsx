import "./App.css";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import TherapistRequests from "./pages/Requests/mainRequests";
import Users from "./pages/Users/Users";
import DashboardLayout from "./components/Layout";
import ContactMessages from "./pages/contact-us/contact";
function App() {
  return (
    <>
      {" "}
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/therapist-requests" element={<TherapistRequests />} />
            <Route path="/users" element={<Users />} />
            <Route path="/contact" element={<ContactMessages />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
