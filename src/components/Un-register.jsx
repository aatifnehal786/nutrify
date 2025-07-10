import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Unregister() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const loggedData = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
    const handleSubmit = async () => {
        
        try {
            const response = await fetch("https://ntl-1.onrender.com/un-register", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${loggedData.loggedUser.token}`,
                },
              
                body: JSON.stringify({ email }), // Wrap email in an object
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to unregister");
            }

            const data = await response.json();
            setMessage({ type: "success", text: data.message });
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: err.message });
        }

        setTimeout(()=>{
            localStorage.removeItem("nutrify-user")
        loggedData.setLoggedUser(null)
        navigate("/login")
        },10000)
    };

    return (
        <section className="container form">
            <input
                className="inp"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
                name="email"
                value={email}
            />
            <button onClick={handleSubmit} className="btn">Un-Register</button>
            {message && <p className={message.type}>{message.text}</p>}
        </section>
    );
}
