import React from 'react'
import styles from '../Style'
import {promo} from '../Constants/Index'
import { Skect,icon,PromoImage } from '../assets'

const Promo = () => {
  return (
    <div className={`flex 1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 `}>
    <div className='flex flex-row justify-between items-center w-full'>
      <h1 className='flex-1 font-poppins font-bold italic text-[28px]
       leading-[75px] text-white ' >
         <img alt='skect' className='md:mt-6 ml-0 ' src={Skect}  />

        <ul className='md:mt-4 ml-16 mb-7 '>
          {promo.map(promoText => 
            (
               <li className="flex flex-row"key ={promoText.id}> <img className=" w-[60px] h-auto md:mr-5" src={icon} />{promoText.title} </li>
            ))}
        </ul>
     </h1>
     <img className='w-[550px] h-auto' src= {PromoImage}/>
       </div>
      </div>
  )
}

export default Promo