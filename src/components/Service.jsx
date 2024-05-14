import React from 'react'


const Service = ({name,imageUrl}) => {
  
  return (
    <div 
    className='md:pt-20'>
   
            <div className="image-container relative">
              <img className='object-fit h-72 w-full' src={imageUrl} alt={name} />
              <p className="image-name absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-md font-poppins font-bold">
                {name}
              </p>
            </div>
    </div>
  )
}

export default Service