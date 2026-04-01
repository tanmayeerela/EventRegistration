import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("STUDENT");

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await API.post("/auth/register", {
                username,
                email,
                password,
                role
            });

            alert("Registered successfully");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Registration failed");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Create Account</h2>
                <p className="subtitle">Join the campus events platform</p>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="STUDENT">Student</option>
                    <option value="ADMIN">Admin</option>
                </select>

                <button className="primary-btn full-width" onClick={handleRegister}>
                    Register
                </button>

                <p className="switch-auth">
                    Already have an account? <Link to="/">Login here</Link>
                </p>
            </div>
        </div>
    );
}