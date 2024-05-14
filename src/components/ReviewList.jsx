import React from 'react';
import { useState } from 'react';
import Review from './Review';

const ReviewList = ({ items  }) => {
  const [visibleItems, setVisibleItems] = useState(3);

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 3);
  };

  return (
    <div className="slider-container">
         <h1 className='font-poppins font-bold text-black md:mt-6 text-3xl mb-5'>
        Reviews
      </h1>
      <ul>
        {items.slice(0, visibleItems).map((item, index) => (
          <li className=" mt-4" key={index}><Review content={item}/></li>
        ))}
      </ul>
      {visibleItems < items.length && (
        <button onClick={handleShowMore}>Show More</button>
      )}
    </div>
  );
};

export default ReviewList;
