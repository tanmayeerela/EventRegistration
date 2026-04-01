import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AddEvent() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        venue: "",
        dateTime: "",
        description: ""
    });

    const handleAdd = async () => {
        await API.post("/events/add", data);
        alert("Event Added Successfully!");
        navigate("/dashboard");
    };

    return (
        <>
            <Navbar />

            <div className="details">
                <h2>Add Event</h2>

                <input placeholder="Event Name"
                    onChange={e => setData({ ...data, name: e.target.value })} />

                <input placeholder="Venue"
                    onChange={e => setData({ ...data, venue: e.target.value })} />

                <input type="datetime-local"
                    onChange={e => setData({ ...data, dateTime: e.target.value })} />

                <textarea placeholder="Description"
                    onChange={e => setData({ ...data, description: e.target.value })} />

                <button className="button" onClick={handleAdd}>
                    Add Event
                </button>
            </div>
        </>
    );
}