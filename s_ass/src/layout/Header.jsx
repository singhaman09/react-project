import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>

            <nav className='w-full bg-blue-500'>
                <div className=' flex gap-8 border px-4 py-5'>
                    <div className='flex flex-1'>
                        <Link to="/"> 
                        <h2>LOGO</h2></Link>
                    </div>
                    <ul className='flex gap-8'>
                        <li>
                            <Link to="/login">Login</Link>

                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default React.memo(Header);