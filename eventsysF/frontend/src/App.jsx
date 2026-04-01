import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyEvents from "./pages/MyEvents";
import AddEvent from "./pages/AddEvents";
import EventDetails from "./pages/EventDetails";
import RegistrationForm from "./pages/Registrationform"; // ✅ fixed name

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Events */}
        <Route path="/event/:id" element={<EventDetails />} />

        {/* ✅ Registration form (dynamic route) */}
        <Route path="/register-event/:id" element={<RegistrationForm />} />

        {/* My Events */}
        <Route path="/myevents" element={<MyEvents />} />

        {/* Admin */}
        <Route path="/addevent" element={<AddEvent />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;