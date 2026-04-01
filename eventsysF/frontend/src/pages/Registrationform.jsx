import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function RegistrationForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <p>Please login to register for events.</p>;
    }

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        section: ""
    });

    const handleSubmit = async () => {
        try {
            await API.post("/registration/add", {
                userId: user.id,
                eventId: id,
                name: form.name,
                email: form.email,
                phone: form.phone,
                department: form.department,
                section: form.section
            });

            alert("Registration Successful!");
            navigate("/myevents");

        } catch (err) {
            console.error(err);
            alert(err.response?.data || "Registration failed");
        }
    };

    return (
        <>
            <Navbar />

            <div className="form-container">
                <h2>Event Registration</h2>

                <input
                    placeholder="Full Name"
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />

                <input
                    placeholder="Email"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />

                <input
                    placeholder="Phone Number"
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                />

                <input
                    placeholder="Department"
                    onChange={e => setForm({ ...form, department: e.target.value })}
                />

                <input
                    placeholder="Section"
                    onChange={e => setForm({ ...form, section: e.target.value })}
                />

                <button className="button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </>
    );
}