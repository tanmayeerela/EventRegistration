import { useNavigate } from "react-router-dom";

export default function EventCard({ event, user }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (user.role === "STUDENT") {
            navigate(`/event/${event.id}`);
        }
    };

    return (
        <div className="card">

            <h3>{event.name}</h3>

            <p><b>Venue:</b> {event.venue}</p>

            <p><b>Date:</b> {event.dateTime}</p>

            {user.role === "STUDENT" ? (
                <button className="button" onClick={handleClick}>
                    View Details
                </button>
            ) : (
                <p style={{ color: "red", marginTop: "10px" }}>
                    Admin cannot access events
                </p>
            )}

        </div>
    );
}