import React, {useState} from 'react';
import logo from '../Assets/ShowGoLogo.png';
import 'C:/Users/XSapp/Desktop/react-workspace/showgo-management/src/index.css';
import "@fontsource/sen"; // Defaults to weight 400
import "@fontsource/sen/400.css"; // Specify weight
import "@fontsource/sen/400-italic.css"; // Specify weight and style

const NavBar = () => {
    const [nav, setNav] = useState(false)
    {/*const handleClick = () => setNav(!nav) */}
    
    return (
        <div className="Navbar">
            <div>
                <img src={logo} alt="Logo" style={{width: '50px'}}></img>
            </div>

            <div>
                <ul className="Navbar-options">
                    <li>Home</li>
                    <li>Tickets</li>
                    <li>Login</li>
                    <li>Contact</li>
                </ul>
            </div>

        </div>

        
    )
} 
export default NavBar