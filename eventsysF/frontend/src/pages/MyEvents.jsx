import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function MyEvents() {
    const [registrations, setRegistrations] = useState([]);
    const [eventsMap, setEventsMap] = useState({});
    const user = JSON.parse(localStorage.getItem("user")) || {};

    useEffect(() => {
        if (!user?.id) return;

        if (user.role === "ADMIN") {
            // ADMIN → get all registrations
            API.get("/registration/all")
                .then(res => setRegistrations(res.data || []));
        } else {
            // STUDENT → get their registrations
            API.get(`/registration/user/${user.id}`)
                .then(res => setRegistrations(res.data || []));
        }

        // Get all events (for names/details)
        API.get("/events/all")
            .then(res => {
                const map = {};
                res.data.forEach(e => map[e.id] = e);
                setEventsMap(map);
            });

    }, []);

    if (!user?.id) {
        return <p>Please login to see your events.</p>;
    }

    return (
        <>
            <Navbar />

            <div className="dashboard">

                {/* ================= ADMIN ================= */}
                {user.role === "ADMIN" ? (
                    <>
                        <h2>Registered Students</h2>

                        {registrations.length > 0 ? (
                            <div className="table-container">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Event</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Dept</th>
                                            <th>Section</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {registrations.map(reg => (
                                            <tr key={reg.id}>
                                                <td>{eventsMap[reg.eventId]?.name}</td>
                                                <td>{reg.name}</td>
                                                <td>{reg.email}</td>
                                                <td>{reg.phone}</td>
                                                <td>{reg.department}</td>
                                                <td>{reg.section}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No registrations found</p>
                        )}
                    </>
                ) : (
                    /* ================= STUDENT ================= */
                    <>
                        <h2>My Events</h2>

                        {registrations.length > 0 ? (
                            registrations.map(reg => {
                                const event = eventsMap[reg.eventId];
                                return (
                                    <div className="card" key={reg.id}>
                                        <h3>{event?.name}</h3>
                                        <p>{event?.description}</p>
                                        <p><b>Venue:</b> {event?.venue}</p>
                                        <p><b>Date:</b> {event?.dateTime}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <p>You have not registered for any events</p>
                        )}
                    </>
                )}

            </div>
        </>
    );
}