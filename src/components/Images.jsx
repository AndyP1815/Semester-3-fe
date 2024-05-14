import React, { useState } from "react";
import cartIcon from "../assets/icon-cart-white.svg";
import { data } from "../Constants/images"



const Images = ({ price, qty, setQty, images }) => {
  const products = [...data];

  const [value, setValue] = useState(0);

  // Map over the images array and create an array of objects with id and path
  const imagesWithId = images.map((path, index) => ({ id: index + 1, path }));

  // Accessing the current large image using the value
  const largeImage = imagesWithId[value].path;
  console.log(largeImage);

  const fixedPrice = price;
  const totalPrice = fixedPrice * qty;

  const decrease = () => {
    if (qty === 0) {
      return;
    }
    {
      setQty((prev) => prev - 1);
    }
  };



  return (
    <main>
  
        <div className="image md:basis-1/2 md:flex md:flex-col md:justify-between">
          <div className="hidden md:block large-image">

            <img
              className=" rounded-xl w-[600px] h-[400px]"
              src={largeImage}
              alt="snekers-photo"
            />
          </div>
          <div className="small-images hidden md:flex mt-7 justify-between w-[600px]">
            {imagesWithId.map((img) => {
              return (
                <div key={img.id} className="single-image">
                  <img
                    onClick={() => setValue(img.id - 1)}
                    className="w-[80px] h-[80px] cursor-pointer rounded-xl transition-all hover:opacity-25 hover:border-[3px] border-orange object-cover"
                    src={img.path}
                    alt="product-photo"
                  />
                </div>
              );
            })}
          </div>
        </div>




    </main>
  );
};

export default Images