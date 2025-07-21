import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import show from '../assets/show.png'
import hide from '../assets/hide.png'
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    age: ""
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showHidePassword, setShowHidePassword] = useState(false);
  const [strength, setStrength] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [reCaptchaValue,setReCaptchaValue] = useState()

  // ✅ Check password strength on every password change
  useEffect(() => {
    const val = userDetails.password;
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
  }, 3000);

  setTypingTimeout(timeout);

  // Cleanup on component unmount
  return () => clearTimeout(timeout);
  }, [userDetails.password]);

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
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePassword = () => {
    setShowHidePassword(prev => !prev);
  };


    const recapchafunc = (value)=>{
        setReCaptchaValue(value)

    }
  const handleSubmit = (e) => {
    e.preventDefault();
        if (!reCaptchaValue) {
      alert("Please complete the reCAPTCHA");
      return;
    }
    setIsLoading(true);

    fetch("https://ntl-1.onrender.com/register", {
      method: "POST",
      body: JSON.stringify(userDetails,re,{reCaptchaValue:reCaptchaValue}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setMessage({ type: "success", text: data.message });
        setTimeout(() => {
          setMessage({ type: "", text: "" });
          setUserDetails({
            name: "",
            email: "",
            password: "",
            age: ""
          });
        }, 5000);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setMessage({ type: "error", text: "Registration failed" });
      });
  };

  return (
    <section className="container">
      <form className="form">
        <h1>Start Your Fitness</h1>

        <div className="input-group">
          <input
            placeholder=""
            type="email"
            onChange={handleInput}
            required
            name="email"
            value={userDetails.email}
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            placeholder=""
            type={showHidePassword ? "text" : "password"}
            onChange={handleInput}
            maxLength={16}
            required
            name="password"
            value={userDetails.password}
          />
          <label>Password</label>
          <img
            className="pass1"
            onClick={togglePassword}
            src={showHidePassword ? show : hide}
            alt="toggle password"
          />
          <div className={`strength ${strength}`}>{getStrengthText()}</div>
        </div>

        <div className="input-group">
          <input
            placeholder=""
            type="text"
            onChange={handleInput}
            required
            name="name"
            value={userDetails.name}
          />
          <label>Enter Name</label>
        </div>

        <div className="input-group">
          <input
            placeholder=""
            type="text"
            onChange={handleInput}
            maxLength={12}
            required
            name="age"
            value={userDetails.age}
          />
          <label>Enter Age</label>
        </div>
         <div className="captcha">
                <ReCAPTCHA
                    sitekey="6LdsmokrAAAAAEVuKeVughwS581XoP-aPNLH8Cpb"
                    onChange={recapchafunc}
                />
                </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Join"}
        </button>

        <p>Already Registered? <Link to='/login'>Login</Link></p>
        <p><Link to='/otp'>Verify email</Link></p>
        <p className={message.type}>{message.text}</p>
      </form>
    </section>
  );
}
