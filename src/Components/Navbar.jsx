import React, {useState} from 'react'
import logo from '../Assets/ShowGoLogo.png'



const NavBar = () => {
    const [nav, setNav] = useState(false)
    {/*const handleClick = () => setNav(!nav) */}
    
    return (
        <div className="fixed w-full h-[80px] flex justify-between items-center px-10 bg-black text-white-300">
            <div>
                <img src={logo} alt="Logo" style={{width: '50px'}}></img>
            </div>

            <div>
                <ul className='hidden md:flex'>
                    <li>Home</li>
                    <li>Tickets</li>
                    <li>Login</li>
                    <li>Contact</li>
                </ul>
            </div>

            
            {/*Mobile Menu*/}
            <ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-full bg-black flex flex-col justify-center items-center'}>
                <li className='py-6 text-4xl'>Home</li>
                <li className='py-6 text-4xl'>Tickets</li>
            </ul>

        </div>

        
    )
} 
export default NavBar