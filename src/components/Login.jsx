import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import show from '../assets/show.png'
import hide from '../assets/hide.png'


export default function Login() {
    const loggedData = useContext(UserContext);
    const [user, setUser] = useState({ email: "", password: "" });
    const [message, setMessage] = useState({ type: "", text: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [showHidePassword, setShowHidePassword] = useState(false)
    const [typingTimeout, setTypingTimeout] = useState(null);



    const navigate = useNavigate();

  const [strength, setStrength] = useState("");

  // ✅ Check password strength on every password change
  useEffect(() => {
    const val = user.password;
    const weakRegex = /.{1,5}/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/;
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (strongRegex.test(val)) setStrength("strong");
    else if (mediumRegex.test(val)) setStrength("medium");
    else if (weakRegex.test(val)) setStrength("weak");
    else setStrength("");
     if (typingTimeout) clearTimeout(typingTimeout);

  // Set timeout to clear strength after 2 seconds of inactivity
  const timeout = setTimeout(() => {
    setStrength("");
  }, 2000);

  setTypingTimeout(timeout);

  // Cleanup on component unmount
  return () => clearTimeout(timeout);
  }, [user.password]);

  const getStrengthText = () => {
    switch (strength) {
      case "weak":
        return "Weak Password";
      case "medium":
        return "Medium Password";
      case "strong":
        return "Strong Password";
      default:
        return "";
    }
  };





    const handleInput = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));


    };

    const togglePassword = () => {
        setShowHidePassword(prev => !prev)
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        fetch("https://ntl-1.onrender.com/login", {
            method: "POST",
            body: JSON.stringify({ email: user.email, password: user.password }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setIsLoading(false);
                // if (!res.ok) {
                //     if (res.status === 404) {
                //         setMessage({ type: "error", text: "User Not Found With this Email, Please Login Again" });
                //     } else if (res.status === 401) {
                //         setMessage({ type: "error", text: "Wrong Password" });
                //     } else {
                //         setMessage({ type: "error", text: "Something went wrong. Please try again later." });
                //     }
                //     throw new Error(`HTTP error! status: ${res.status}`);
                // }
                return res.json();
            })
            .then((data) => {
                setIsLoading(false)

                setMessage({ type: "success", text: data.message });


                if (data.token) {
                    localStorage.setItem("nutrify-user", JSON.stringify(data));
                    loggedData.setLoggedUser(data);
                    navigate("/track");



                }


            })
            .catch((err) => {
                console.error(err);
                setMessage({ type: "error", text: "An error occurred. Please try again later." });
            });

    };



    return (
        <section className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login To Start Your Fitness Training</h1>
                <div className="input-group">
                    <input placeholder="" type="email" onChange={handleInput} required name="email" value={user.email} />
                    <label >Email</label>
                </div>
                <div className="input-group">
                    <input placeholder="" type={showHidePassword ? "text" : "password"} onChange={handleInput} maxLength={16} required name="password" value={user.password} />
                    <label >Password</label>
                </div>
                <img className="pass2" onClick={togglePassword} src={showHidePassword ? show : hide} alt="" />
                <div className={`strength ${strength}`}>{getStrengthText()}</div>
                <button type="submit" className="btn" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Join"}
                </button>
                <p>Don't Have Account? <Link to='/register'>Register Now</Link></p>
                <Link to='/forgot-password'>Forgot Password</Link>
                <p className={message.type}>{message.text}</p>

            </form>

        </section>
    );
}
