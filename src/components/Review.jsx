import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Review = ({ content }) => {
  return (
    <div className=' bg-gray-200 p-2 rounded'>
      <ReactStars
        count={5}
        value={content.rating || 5}
        size={24}
        activeColor="#ffd700"
        isHalf={true}
        edit={false} // Set edit to false to make the rating readonly
      />
      {content.review}
    </div>
  );
};

export default Review;
