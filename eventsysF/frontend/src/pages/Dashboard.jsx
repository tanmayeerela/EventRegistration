import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";

export default function Dashboard() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        API.get("/events/all").then(res => setEvents(res.data));
    }, []);

    return (
        <>
            <Navbar />

            <div className="dashboard">

                {user.role === "ADMIN" ? (
                    // ✅ ADMIN VIEW
                    <div style={{ textAlign: "center", marginTop: "50px" }}>
                        <h2>Admin Dashboard</h2>

                        <button
                            className="button"
                            onClick={() => navigate("/addevent")}
                        >
                            Add Event
                        </button>
                    </div>

                ) : (
                    // ✅ STUDENT VIEW (existing)
                    <>
                        <h2>All Events</h2>

                        <div className="events">
                            {events.map(event => (
                                <EventCard key={event.id} event={event} user={user} />
                            ))}
                        </div>
                    </>
                )}

            </div>
        </>
    );
}