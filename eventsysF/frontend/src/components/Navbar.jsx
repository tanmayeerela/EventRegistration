import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };
    return (
        <div className="navbar">
            <h1>Campus Events</h1>

            <div className="nav-links">
                <Link to="/dashboard">Home</Link>
                <Link to="/myevents">My Events</Link>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
        </div>
    );
}