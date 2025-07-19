import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"
import { useNavigate,Link } from "react-router-dom"

export default function Header(){

    const loggedData = useContext(UserContext)
    const navigate = useNavigate()

    function logOut(){
        localStorage.removeItem("nutrify-user")
        loggedData.setLoggedUser(null)
        navigate("/login")
    }

    return (


        <div>
            <ul className="lists">
                <Link to='/track'><li>Track</li></Link>
                <Link to='/diet'><li>Diet</li></Link>
                <Link to='/un-register'><li>Un Subscribe</li></Link>
            </ul>
           <button className="btn btn-logout" onClick={logOut}>Log Out</button>
        </div>
    )
}