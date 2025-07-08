import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register()
{

    const [userDetails,setUserDetails] = useState({
        name:"",
        email:"",
        password:"",
        age:""
    })

    const [message,setMessage] = useState({
        type:"",
        text:""
    })

    const [isLoading, setIsLoading] = useState(false);


    

    const handleInput = (e)=>{

        e.preventDefault();
        setUserDetails((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })

    }
 
    const handleSubmit = (e)=>{
        e.preventDefault();
       
        fetch("https://ntl-1.onrender.com/register",{
            method:"POST",
            body:JSON.stringify(userDetails),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>{
            
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
        .then((data)=>{
           

            setMessage({type:"success",text:data.message})

            setTimeout(()=>{
                setMessage({type:"",text:""})
                setUserDetails({
                    name:"",
                    email:"",
                    password:"",
                    age:""

                })
            },5000)

        })
        .catch((err)=>{
            console.log(err)
        })

        
       

    }

    
    

    return (
<section className="container">

            
            <form className="form">
            <h1>Start Your Fitness</h1>

<input className="inp" type="text" onChange={handleInput} placeholder="Enter Name" required name="name" value={userDetails.name} />
<input className="inp" type="email" onChange={handleInput} placeholder="Enter Email" required name="email" value={userDetails.email} />
<input className="inp" type="password" onChange={handleInput} placeholder="Enter Password" maxLength={16} required name="password" value={userDetails.password} />
<input className="inp" type="number" onChange={handleInput} placeholder="Enter Age" minLength={12} required name="age" value={userDetails.age} />

<button onClick={handleSubmit} className="btn">Join</button>

<p>Already Registered ? <Link to='/login'>Login</Link></p>
<p><Link to='/otp'>verify email</Link></p>
<p className={message.type}>{message.text}</p>

</form>
</section>
    )
}