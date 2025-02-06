//import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../index.css';
import './Navbar.css';



const Navbar = () => {

   const logoImage = new URL("../images/North-Star-Logo.JPG", import.meta.url);
  
  return(

   
      <nav className="bg-indigo-400 border-gray-200 sticky top-0">
        
          <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-12">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img className="logo "  alt="North Star Logo" src={logoImage} />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
          </Link>
            <li>
              <Link to="/about" className="text-white hover:underline to-blue-200" aria-current="page">About Us</Link>
            </li>
            <li>
              <Link to="/players" className="text-white dark:text-white hover:underline">Our Players</Link>
            </li>
            <li>
              <Link to="/parents" className="text-white dark:text-white hover:underline">Parents</Link>
            </li>
            <li>
              <Link to="/matches" className="text-white dark:text-white hover:underline">Matches</Link>
            </li>
            <li>
              <Link to="/contacts" className="text-white dark:text-white hover:underline">Contacts</Link>
            </li>
            <li>
              <Link to="/login" className="text-white dark:text-white hover:underline" id="login">Login</Link>
            </li>
            
          </ul>
          {/* </div> */}
        </nav>
    
    
      
      
       
    
    
  )
}


export default Navbar;