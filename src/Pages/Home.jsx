import React from 'react'
import styles from '../Style'
import {  Hero, Promo, WorkServices, Footer, Users } from '../components';
import { Skect } from '../assets';

const Home = () => {
  return (
    <div className="bg-white w-full overflow-hidden">
        <div className={` bg-blue-300 ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <Hero />
                </div>
                </div>
                <div className={`  ${styles.flexStart} ${styles.paddingX}`}>
                    <div className={`${styles.boxWidth}`}>
                        <WorkServices />
                        </div>
                    </div>
                    <div className={` md:mt-20 bg-blue-950 ${styles.flexStart} ${styles.paddingX}`}>
                    <div className={`${styles.boxWidth}`}>
                      <Promo />
                      </div>
                    </div>
                    <div className={` bg-red-300 ${styles.flexStart} ${styles.paddingX}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Users />
                        </div>
                    </div>
                     
                </div>
  )
}

export default Home