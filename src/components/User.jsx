import React from 'react'
import Service from './Service';
import { Link } from 'react-router-dom';


const User = ({username,service,profilePicture,description,id}) => {
  return(
    <Link to={`/productPage/${id}`}> 
    <div className="flex flex-col max-w-md p-6 ">
    <img src={service.images[0]} alt="" className="flex-shrink-0 object-cover rounded-sm sm:h-60 w-80 dark:bg-gray-500 aspect-square" />
    <div className=' bg-white flex flex-row justify-around pt-3 pb-3 pl-2 pr-2'>
    <img  className="flex-shrink-0 object-cover w-8 h-8 rounded-full sm:h-24 sm:w-24 dark:bg-gray-500 mr-2" src={profilePicture}/> 
      <div className=' flex flex-col pt-5'>
      <h2 className="text-xl font-semibold">{username}</h2>
      <span className="block pb-2 text-sm dark:text-gray-400 ">{description}</span>
      </div>

    </div>
  </div>
  </Link>
  )
};


export default User