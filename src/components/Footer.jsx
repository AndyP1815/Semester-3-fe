import React from 'react';
import styles from '../Style';
import { Logo } from '../assets';
import { footerLinks } from '../Constants/Index';

const Footer = () => {
  return (
    <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
      <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
        <div className='flex flex-col justify-start items-center mr-32'>
          <img
            src={Logo}
            alt="skect"
            className='w-[200px] h-auto object-contain'
          />
          <div className='mt-4'>
            <p className={`${styles.paragraph} max-w-[310px]`}>
              The world opens up here
            </p>
          </div>
        </div>
        <div  className='flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10'>
          {footerLinks.map((footerlink) => (
            <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
              <h4 className='font-poppins font-medium text-[18px] leading-[27px] text-black'>
                {footerlink.title}
              </h4>
              <ul className='list-none mt-4'>
                {footerlink.links.map((link) => (
                  <li
                    key={link.name}
                    className={`font-poppins font-normal text-[16px] leading-[24px] text-gray-600 hover:text-secondary cursor-pointer`}
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;
