import { useState } from "react";
import { Link } from "react-router-dom";
export default function Otp() {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [isLoading, setIsLoading] = useState(false);

    const sendOtp = (e) => {
        setIsLoading(true);
        e.preventDefault();
        fetch("https://ntl-1.onrender.com/send-otp", {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setIsLoading(false);
                setMessage({ type: "success", text: data.message });
                console.log(data);
                setEmail(data.email);
                setTimeout(() => {
                    setMessage({ type: "", text: "" })
                }, 5000)
            })
            .catch((err) => {
                console.log(err);
                setMessage({ type: "error", text: "Failed to send OTP" });
            });
    };

    const verifyOtp = (e) => {
        setIsLoading(true);
        e.preventDefault();
        fetch("https://ntl-1.onrender.com/verify-otp", {
            method: "POST",
            body: JSON.stringify({ email, otp }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setIsLoading(true);
                if (!res.ok) {
                    if (res.status === 404) {
                        setMessage({ type: "error", text: "User Not Found With this Email, Please Login Again" });
                    } else if (res.status === 401) {
                        setMessage({ type: "error", text: "Wrong Password" });
                    } else {
                        setMessage({ type: "error", text: "Something went wrong. Please try again later." });
                    }
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setIsLoading(false);
                if (data) {

                    setMessage({ type: "success", text: "OTP verified successfully" });
                    setTimeout(() => {
                        setMessage({ type: "", text: "" })
                        setEmail("")
                        setOtp("")
                    }, 5000)
                } else {
                    setMessage({ type: "error", text: data.error });
                }
            })
            .catch((err) => {
                console.log(err);
                setMessage({ type: "error", text: "Failed to verify OTP" });
            });
    };

    return (
        <section className="container">
            <form className="form">
               <div className="input-group">
                 <input
                    className="inp"
                    type="text"
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder=""
                    name="otp"
                    value={otp}
                />
                <label>Enter Otp</label>
               </div>
                <button type="submit" className="btn" disabled={isLoading} onClick={sendOtp}>
                    {isLoading ? "Loading..." : "send otp"}
                </button>
                <button type="submit" className="btn" disabled={isLoading} onClick={verifyOtp}>
                    {isLoading ? "Loading..." : "verify otp"}
                </button>
                {message.text && <div><p className={message.type}>{message.text}</p></div>}
                <p><Link to="/login">Go to login page</Link></p>
            </form>
        </section>
    );
}
