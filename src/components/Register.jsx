import { useState } from "react";
import { Link } from "react-router-dom";
import show from '../assets/show.png'
import hide from '../assets/hide.png'

export default function Register() {

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        age: ""
    })

    const [message, setMessage] = useState({
        type: "",
        text: ""
    })

    const [isLoading, setIsLoading] = useState(false);
    const [showHidePassword, setShowHidePassword] = useState(false)

    const [strength, setStrength] = useState("");

    




    const handleInput = (e) => {

        e.preventDefault();
        setUserDetails((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
         

  const getStrength = (value) => {
    const weakRegex = /.{1,5}/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/;
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (strongRegex.test(value)) return "strong";
    else if (mediumRegex.test(value)) return "medium";
    else if (weakRegex.test(value)) return "weak";
    else return "";
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setStrength(getStrength(val));
  };

  const getStrengthText = () => {
    switch (strength) {
      case "weak":
        return "Weak Password";
      case "medium":
        return "Medium Password";
      case "strong":
        return "Strong Password";
      default:
        return "Enter Password";
    }
  };

  handleChange();
  getStrengthText();

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        fetch("https://ntl-1.onrender.com/register", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setIsLoading(false)
                setMessage({ type: "success", text: data.message })
                setTimeout(() => {
                    setMessage({ type: "", text: "" })
                    setUserDetails({
                        name: "",
                        email: "",
                        password: "",
                        age: ""})}, 5000)
            })
            .catch((err) => {
                console.log(err)
            })
        }

        
    const togglePassword = () => {
        setShowHidePassword(prev => !prev)
    }

    return (
            <section className="container">
            <form className="form">
                    <h1>Start Your Fitness</h1>
                    <div className="input-group">
                        <input placeholder="" type="email" onChange={handleInput} required name="email" value={userDetails.email} />
                        <label >Email</label>
                    </div>
                    <div className="input-group">
                        <input placeholder="" type={showHidePassword ? "text" : "password"} onChange={handleInput} maxLength={16} required name="password" value={userDetails.password} />
                        <label >Password</label>
                        <img className="pass1" onClick={togglePassword} src={showHidePassword ? show : hide} alt="" />
                        <div className={`strength ${strength}`}>{getStrengthText()}</div>
                    </div>
                    <div className="input-group">
                        <input placeholder="" type="text" onChange={handleInput} required name="name" value={userDetails.name} />
                        <label>Enter Name</label>
                    </div>
                    <div className="input-group">
                        <input placeholder="" type="text" onChange={handleInput} maxLength={12} required name="age" value={userDetails.age} />
                        <label >Enter Age</label>
                    </div>

                    <button onClick={handleSubmit} type="submit" className="btn" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Join"}
                    </button>

                    <p>Already Registered ? <Link to='/login'>Login</Link></p>
                    <p><Link to='/otp'>verify email</Link></p>
                    <p className={message.type}>{message.text}</p>

                </form>
            </section>
        )
}