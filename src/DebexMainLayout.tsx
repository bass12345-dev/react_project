import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios';
import { GoogleUserData } from "./pages/Userdata/GoogleUserData";
import { DBUserData } from "./pages/Userdata/DBUserData";
import { AccesToken, UserData } from "./utils/LocaStorage";
import { DesktopMenu } from "./components/Navigations/DesktopMenu";
import { menu } from "./utils/Menus";
import { UserWelcome } from "./components/UserWelcome";
import { LogoutButton } from "./components/Layout/LogoutButton";
import { MobileMenu, ToggleIcon } from "./components/Navigations/MobileMenu";
import {  useLocation } from "react-router-dom";
function DebexMainLayout() {
  let location_path = useLocation(); 

  const [isNavOpen, setIsNavOpen] = useState(false);

  //<!----- Get User Full Name-------!>
  var userName = '';    
  if (localStorage.getItem(AccesToken) && localStorage.getItem(UserData)) {
      const User = localStorage.getItem(UserData);
      if (User) {
        const { given_name, family_name, id } = JSON.parse(User);
        userName = `${given_name} ${family_name}`;
       
      }
    }
  
  
  //<!----- Navigate to Login  Method-------!>
  const navigate = useNavigate()
  const gotToNewPage = () => {
    navigate("/login");
  }

  //<!----- Logout  Method-------!>
  const logOut = () => {
    localStorage.removeItem(AccesToken);
    localStorage.removeItem(UserData);
    navigate("/login");
    location.reload();
  }


  //<!-----Navigation Close-------!>
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  }

  


  return (
    <>
      <div className="sm:px-28 px-5">
        {/* Navigation Bar */}
        <nav className="py-2 mt-3 flex items-center justify-between border-b border-white-500" >
          <a href="#" className="text-white text-2xl md:text-4xl  font-bold" style={{ fontFamily: 'Sixtyfour' }} >DEBEX</a>
          {/* Desktop Menu */}
          <DesktopMenu location_path={location_path} />
          {/* Mobile Menu */}
          <MobileMenu toggleNav={toggleNav} isNavOpen={isNavOpen} logOut={logOut} location_path={location_path} />
            {/* Mobile Logout */}
          <LogoutButton onClick={logOut}/>
            {/*Open Menu */}
            <ToggleIcon toggleNav={toggleNav} />
        </nav>
        {/* User Welcome */}
        <UserWelcome name={userName}/>
        <Outlet />
      </div>

    </>
  )
}

export default DebexMainLayout
