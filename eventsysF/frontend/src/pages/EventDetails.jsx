import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <p>Please login to see event details.</p>;
    }

    useEffect(() => {
        API.get(`/events/${id}`)
            .then(res => setEvent(res.data))
            .catch(err => console.error(err));
    }, [id]);

    // ✅ Navigate to registration form
    const handleRegister = () => {
        if (user.role === "ADMIN") {
            alert("Admin cannot register for events");
            return;
        }

        navigate(`/register-event/${id}`);
    };

    return (
        <div className="page-container">
            <Navbar />

            <div className="container" style={{ flex: 1 }}>
                <div className="details">
                    <h2>{event.name}</h2>

                    <div className="meta">
                        <span>📍 {event.venue}</span>
                        <span>
                            🕒 {event.dateTime
                                ? new Date(event.dateTime).toLocaleString()
                                : "TBD"}
                        </span>
                    </div>

                    <div className="description">
                        <p>{event.description}</p>
                    </div>

                    {/* ✅ Only student can see register button */}
                    {user.role === "STUDENT" && (
                        <button className="button" onClick={handleRegister}>
                            Register Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}