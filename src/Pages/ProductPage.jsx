import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useWorkProvider from '../api-layer/api-workProviders';
import styles from '../Style';
import Images from '../components/Images.jsx';
import Offers from '../components/Offers.jsx';
import ReviewCarousel from '../components/ReviewCarousel.jsx';
import ReviewList from '../components/ReviewList.jsx';
import Users from '../components/Users.jsx';


const ProductPage = ({sendOrderNotificationMessage }) => {
  const { productId } = useParams();
  const [Service, setService] = useState(null);


  const [price, setPrice] = useState(125.0);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await useWorkProvider.getWebWorkProvidersById(productId);
        setService(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };

    fetchData();

  }, [productId]);

  useEffect(() => {
    console.log(Service);

  }, [Service]);

  // Conditional rendering based on Service being null or not
  return (
    <div>
      {Service ? (
        <>
          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth} `}>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h1 className='font-poppins font-bold text-black text-3xl mb-4'>
                  {Service.service.name}
                </h1>
                <div className="flex ">
                  <img
                    src={Service.profilePicture}
                    alt="Profile"
                    className="rounded-full h-20 w-20 object-cover "
                  />
                  <Link to="/">
                    <h1
                      className='font-poppins font-bold text-black text-xl hover:underline cursor-pointer mt-6 ml-3'
                    >
                      {Service.username}
                    </h1>
                  </Link>
                </div>
                <div className="main-wrapper flex flex-col md:flex-row md:px-[200px] md:py-[100px] relative">
                  <Images price={price} qty={qty} images={Service.service.images} setQty={setQty} />
                  <Offers offers={Service.service.offers} workProviderId={Service.id} send={sendOrderNotificationMessage}  />
                </div>
                <ReviewCarousel reviews={Service.service.reviews} />
                <h1
                  className='font-poppins font-bold text-black text-xl hover:underline cursor-pointer mt-6 ml-3'
                >
                  Description
                </h1>
                <p>
                  {Service.service.description}
                </p>
                <div className="mx-auto text-center">
                  <ReviewList items={Service.service.reviews} />
                </div>
                
              </div>
             
            </div>
          </div>
          <div className={` bg-gray-300 mt-7 ${styles.flexStart} ${styles.paddingX}`}>
                  <div className={`${styles.boxWidth}`}>
                    <Users />
                  </div>
                </div>
        </>
      ) : (
        <p>Loading...</p>
        // You can replace "Loading..." with any other content or loading indicator
      )}
    </div>
  );

};

export default ProductPage;
