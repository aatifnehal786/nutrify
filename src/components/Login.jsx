import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import show from '../assets/show.png'
import hide from '../assets/hide.png'
import ReCAPTCHA from "react-google-recaptcha";


export default function Login() {
    const loggedData = useContext(UserContext);
    const [user, setUser] = useState({ email: "", password: "" });
    const [message, setMessage] = useState({ type: "", text: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [showHidePassword, setShowHidePassword] = useState(false)
    const [reCaptchaValue,setReCaptchaValue] = useState()
    const [keepSignedIn, setKeepSignedIn] = useState(false);



    const navigate = useNavigate();






    const handleInput = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));


    };

    const togglePassword = () => {
        setShowHidePassword(prev => !prev)
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        if (!reCaptchaValue) {
      setMessage({ type: "error", text: "Please verify captcha" });
      return;
    }
        setIsLoading(true);

        fetch("https://ntl-1.onrender.com/login", {
            method: "POST",
            body: JSON.stringify({ email: user.email, password: user.password , reCaptchaValue:reCaptchaValue ,keepSignedIn:keepSignedIn}),
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


               if (data.accessToken) {
    loggedData.setLoggedUser(data);

    if (keepSignedIn) {
        localStorage.setItem("nutrify-user", JSON.stringify(data));
        navigate("/track");
    } else {
        sessionStorage.setItem("nutrify-user", JSON.stringify(data));
        navigate("/track"); // or "/track", depending on your design
    }
}



            })
            .catch((err) => {
                console.error(err);
                setMessage({ type: "error", text: "An error occurred. Please try again later." });
            });

    };

 


    const recapchafunc = (value)=>{
        setReCaptchaValue(value)

    }



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
                    <img className="pass2" onClick={togglePassword} src={showHidePassword ? show : hide} alt="" />
                </div>
                
                
                <div className="captcha">
                <ReCAPTCHA className="captcha-child"
                    sitekey="6LdsmokrAAAAAEVuKeVughwS581XoP-aPNLH8Cpb"
                    onChange={recapchafunc}
                />
                </div>
                <div className="keep-signedin">
                    <label>
        <input type="checkbox" checked={keepSignedIn} onChange={(e) => setKeepSignedIn(e.target.checked)} />
        Keep me signed in
      </label>
                </div>
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
