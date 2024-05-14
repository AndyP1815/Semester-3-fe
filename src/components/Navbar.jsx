import React, { useEffect, useState } from 'react';
import { Skect } from '../assets';
import { navLinks } from '../Constants/Index';
import { Link } from 'react-router-dom';
import TokenManager from '../Token/TokenManager';
import { useLocation } from 'react-router-dom';
import { LogOut } from '../components';


const Navbar = ({ notifications }) => {
  const [hasNotification, setHasNotification] = useState(false);
  const claim = TokenManager.getClaims();

  const handleLogout = () => 
  {
    TokenManager.clear()
  }

  const notificationSeen = () => 
  {
    setHasNotification(false)
  }
  useEffect(() => {
    
    console.log(claim)
  }, [claim]);

 
  useEffect(() => {
    console.log( "notification",Notification)
    if(notifications.length != 0)
    {
      setHasNotification(true)
      
    }
   
  }, [notifications]);

  const location = useLocation();

  
  



  return (
    <nav className='w-full flex py-6 justify-between items-center navbar'>
      <Link to={''}><img src={Skect} alt='skect' className='w-[124px] h-[32px]' /></Link>
      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer ${index === navLinks.length - 1 ^ nav.id === 'join' ? 'mr-0' : 'mr-10'
              } text-[16px] `}
          >
            <Link to={nav.id === 'home' ? '' : (nav.id === 'join' ? (claim ? '/profile' : '/join') : `/${nav.id}`)}>
              {nav.id === 'join' && claim !== null ? 'Profile' : nav.id}
            </Link>

          </li>


        ))}
        {claim !== null && (
          <li
            key={"Notifications"}
            className={`font-poppins font-normal cursor-pointer 
    mr-10
    text-[16px] relative`}
          >
            <Link onClick={notificationSeen} to="/notifications" className="flex items-center">
              Notifications
              {hasNotification && (
                <span className="ml-1 h-3 w-3 bg-red-500 rounded-full"></span>
              )}
            </Link>
          </li>
          
        )}
          {claim && claim !== null && claim.roles && claim.roles.includes("WORKPROVIDER") && (
          <li
            key={"Orders"}
            className={`font-poppins font-normal cursor-pointer 
    mr-10
    text-[16px] relative`}
          >
            <Link to="/providersOrders" className="flex items-center">
              Orders
            </Link>
          </li>
          
        )}
         {claim && claim !== null && claim.roles && claim.roles.includes("USER") && (
          <li
            key={"Orders"}
            className={`font-poppins font-normal cursor-pointer 
    mr-10
    text-[16px] relative`}
          >
            <Link  to="/becomeSeller" className="flex items-center">
              Become Seller
            </Link>
          </li>
          
        )}



        <li key={"logOut"}
          className={`font-poppins font-normal cursor-pointer 
               mr-0
             text-[16px] `}>
          {claim !== null ? (
            <LogOut handleLogout={handleLogout} />

          ) : null}

        </li>
      </ul>
      {/* mobile */}
      <div></div>
    </nav>
  );
};

export default Navbar;
