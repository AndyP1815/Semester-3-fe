import React, { useState } from 'react';

const CreateOffer = ({setOffer,setOfferList,offer}) => {
 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOffer((prevOffer) => ({
          ...prevOffer,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        
        // Pass the offer to the parent component to add to the list
        setOfferList((prevOfferList) => [...prevOfferList, offer]);
        
        // Reset the form after submission
        setOffer({
          price: '',
          description: '',
          name: '',
        });
      };

      return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create Offer</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Name:</span>
              <input
                type="text"
                name="name"
                value={offer.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Description:</span>
              <textarea
                name="description"
                value={offer.description}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Price:</span>
              <input
                type="number"
                name="price"
                value={offer.price}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Add offer
            </button>
          </form>
        </div>
      );
      }      
export default CreateOffer;
