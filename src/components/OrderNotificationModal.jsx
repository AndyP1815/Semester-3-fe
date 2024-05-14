import React, { useState } from 'react';

const OrderNotificationModal = ({ closeModal, postOrder }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleInputChange1 = (e) => {
    setName(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <input
        type="text"
        value={name}
        onChange={handleInputChange1}
        className="border p-2 rounded-md focus:outline-none focus:border-green-500"
        placeholder="Name"
      />
      <input
        type="text"
        value={text}
        onChange={handleInputChange2}
        className="border p-2 rounded-md focus:outline-none focus:border-green-500"
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-300"
        onClick={() => postOrder(name, text)}
      >
        Post Service Order
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-300"
        onClick={closeModal}
      >
        Close
      </button>
    </div>
  );
};

export default OrderNotificationModal;
