import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = async () => {
        const res = await API.post("/auth/login", data);
        if (res.data) {
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/dashboard");
        } else {
            alert("Invalid credentials");
        }
    };
    const [role, setRole] = useState("STUDENT");

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="subtitle">Login to access your campus events</p>
                <div className="input-group">
                    <input placeholder="Email" onChange={e => setData({ ...data, email: e.target.value })} />
                </div>
                <div className="input-group">
                    <input placeholder="Password" type="password" onChange={e => setData({ ...data, password: e.target.value })} />
                </div>
                <select onChange={(e) => setRole(e.target.value)}>
                    <option value="STUDENT">Student</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <button className="primary-btn full-width" onClick={handleLogin}>Login</button>
                <p className="switch-auth">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}