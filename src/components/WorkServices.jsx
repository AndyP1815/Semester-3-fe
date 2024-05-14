// WorkServices.jsx
import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { Service } from '../components';
import useCategoryApi from '../api-layer/api-catogory';

const WorkServices = () => {
  const [categories, setCategories] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([0, 1, 2, 3]);

  const refreshCategories = () => {
    
    useCategoryApi.getCategories()
      .then(categories => setCategories(categories))
      .catch(error => console.error("Error fetching categories:", error));
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  const prevSlide = () => {
    const newArray = displayCategories.map(categoryIndex =>
      categoryIndex === 0 ? categories.length - 1 : categoryIndex - 1
    );
    setDisplayCategories(newArray);
  };

  const nextSlide = () => {
    const newArray = displayCategories.map(categoryIndex =>
      categoryIndex === categories.length - 1 ? 0 : categoryIndex + 1
    );
    setDisplayCategories(newArray);
  };

  return (
    <div className="content-container">
      <h1 className='font-poppins font-bold text-black md:mt-6 text-3xl'>
        Popular Services
      </h1>
      <div className={`flex flex-row justify-around relative`}>
        <div className='absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 bg-black/30 text-white cursor-pointer' onClick={prevSlide}>
          <BsChevronCompactLeft size={30} />
        </div>
        <div className='absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 bg-black/30 text-white cursor-pointer' onClick={nextSlide}>
          <BsChevronCompactRight size={30} />
        </div>
        {categories && categories.length > 0 && (
          displayCategories.map(categoryIndex => (
            <Service key={categories[categoryIndex].id} {...categories[categoryIndex]} />
          ))
        )}
      </div>
    </div>
  );
};

export default WorkServices;
