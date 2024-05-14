import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Review from '../components/Review'

const ReviewCarousel = ({ reviews }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <h1 className='font-poppins font-bold text-black md:mt-6 text-3xl mb-5'>
        Reviews
      </h1>
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review.id}>
            <Review content={review}/>
            {/* Add more review details as needed */}
          </div>
        ))}
      </Slider>
      {/* Add custom styles to position arrows in the same line as the slider */}
      <style jsx = "true">{`
        .slider-container {
          max-width: 600px; /* Adjust the maximum width as needed */
          margin: 0 auto; /* Center the container horizontally */
          position: relative;
        }

        .slick-prev,
        .slick-next {
        
          z-index: 1;
          outline: none; /* Remove default focus outline */
        }
        .slick-prev:before,
.slick-next:before {
  color: black;
}

        .slick-prev {
          left: -10%;
        }

        .slick-next {
          right: -10%;
        }
      `}</style>
    </div>
  );
};

export default ReviewCarousel;
