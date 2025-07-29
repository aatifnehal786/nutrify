import { useState } from "react"
import { Link } from "react-router-dom";
import show from '../assets/show.png'
import hide from '../assets/hide.png'

export default function ForgotPassword(){

    const [email,setEmail] = useState("")
    const [message,setMessage] = useState({type:"",text:""})
    const [otp,setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [strength, setStrength] = useState("");
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [showHidePassword, setShowHidePassword] = useState(false);

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

        const togglePassword = () => {
    setShowHidePassword(prev => !prev);
  };

    const Forgotpassword = async ()=>{

        try {
            setIsLoading(true)
           fetch("https://ntl-1.onrender.com/send-otp",{
            method:"POST",
            body:JSON.stringify({email}),
            headers:{
                "Content-Type":"application/json"
            }
           })
           .then((res)=>{
            
            return res.json()
           })
           .then((data)=>{
            console.log(data)
            setIsLoading(false)
            setMessage({type:"success",text:data.message})
            setTimeout(()=>{
                setMessage({type:"",text:""})
                
                
            },5000)
           })
            
        } catch (error) {
            setMessage({type:"error",text:data.error});
            
        }
        
    }

    const handleResetPassword = () => {
        // Ensure password is not empty
        if (!newPassword) {
            setMessage("Password cannot be empty.");
            
        }
        setIsLoading2(true)

        fetch("https://ntl-1.onrender.com/reset-password", {
            method: "POST",
            body: JSON.stringify({ email:email, newPass: newPassword , otp: otp}),
            headers: {
                "Content-Type": "application/json",
            }
             // Correctly send the new password
        })
        .then((res)=>{
            setIsLoading2(false)
            
                return res.json();
        })
        .then((data)=>{
            console.log(data.error)
           if(data.error){
            setMessage({type:"error",text:data.error})
           }
           else
           {
            setMessage({type:"success",text:data.message})
            setTimeout(()=>{
                setMessage({type:"",text:""})
              
                    setEmail("")
                    setNewPassword("")
                    setOtp("")
             
                
            },3000)
           }
        })
        .catch((err) => {
            console.error("Error:", err);
            setMessage({type:"error",text:data.error});
        });
           
    };

    return (

        <section className="container">

            <div className="form">
                <h4>Enter your Email to get OTP</h4>
               <div className="input-group">
                 <input onChange={(e)=>setEmail(e.target.value)} placeholder="" className="inp" type="email" name="email" id="" value={email} />
                 <label>Email</label>
               </div>
                <button type="submit" onClick={Forgotpassword} className="btn btn-2"  disabled={isLoading}>{isLoading ? "Loading..." : "send"}</button>
                <div className="input-group">
                    <input className="input" onChange={(e)=>setOtp(e.target.value)} type="otp" placeholder="" value={otp}/>
                    <label>Enter Otp</label>
                </div>
            
           <div className="input-group">
             <input className="input" type="password" placeholder="" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
             <label>Enter Password</label>
              <img
                         className="pass3"
                         onClick={togglePassword}
                         src={showHidePassword ? show : hide}
                         alt="toggle password"
                       />
           </div>
            <div className={`strength ${strength}`}>{getStrengthText()}</div>
            <button type="submit" className="btn btn-1" onClick={handleResetPassword} disabled={isLoading2}>{isLoading2 ? "Loading..." : "reset"}</button>
            
            <Link to='/login'>Go to Login page</Link>
                {message && <p className={message.type}>{message.text}</p>}
                
            </div>
            

        </section>
    )

}