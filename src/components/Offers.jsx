import React, { useState, useEffect, useRef } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import useServiceOrder from '../api-layer/api-ServiceOrder';
import TokenManager from '../Token/TokenManager';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import useOrderNotification from '../api-layer/api-OrderNotification';
import App from '../App';
import OrderNotificationModal from './OrderNotificationModal';

Modal.setAppElement(document.getElementById('root'));


const Offers = ({ offers, workProviderId, send }) => {
  const claim = TokenManager.getClaims();
  const [orderNotification, setOrderNotification] = useState({
    id: '',
    name: '',
    message: '',
    dateStamp: '',
    sender: '',
    acceptance: '',
    order: ''
  });
  const [offerId, setOfferId] = useState(offers[0].id);
  const [modalIsOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const [serviceOrder, setServiceOrder] = useState({
    userEntityId: '',
    workProviderEntityId: '',
    offerId: '',
    sellerId: '',
  });

  useEffect(() => {
    makeOrder();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // Perform actions after the modal is opened
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const makeOrder = () => {
    if (claim == null) {
      navigate('/join');
    }

    else {
      setServiceOrder({
        userEntityId: claim.userId,
        workProviderEntityId: workProviderId,
        offerId: offerId,
      });
    }


  };

  const postOrder = async (title, text) => {
    debugger
    makeOrder();

    try {
    
      const id = await useServiceOrder.postServiceOrder(serviceOrder);

      console.log(id);

      const notification = {
        name: title,
        message: text,
        orderId: id.data,
        userId: claim.userId,
        sellerId: workProviderId

      };
      const OrderNotificationId = await useOrderNotification.postOrderNotification(notification);

      const OrderNotification = await useOrderNotification.getOrderNotificationById(OrderNotificationId.data);


      await setOrderNotification(
        {
          id: OrderNotification.id,
          name: OrderNotification.name,
          message: OrderNotification.message,
          dateStamp: OrderNotification.dateStamp,
          sender: OrderNotification.sender,
          acceptance: OrderNotification.acceptance,
          order: OrderNotification.order
        })
      debugger
      send(OrderNotification, workProviderId);

    } catch (error) {
      console.log("failed")
      console.error("Error posting order:", error);
      // Handle the error appropriately
    }
  };



  return (
    <div className="bg-gray-100 p-4 ml-7 flex flex-col items-center">
      <Tabs>
        <TabList className="flex space-x-4">
          {offers.map(({ name, id }) => (
            <Tab  onClick={() => {

              setOfferId(id);
            }} key={id} className="bg-white p-2 rounded cursor-pointer">
              {name}
            </Tab>
          ))}
        </TabList>
        {offers.map(({ id, description, price }) => (
          <TabPanel key={id} className="mt-4">
            <div className="bg-white p-4 rounded flex flex-col items-center">
              <p className="text-lg font-bold mb-2"> ${price}</p>
              <h2 className="text-lg font-bold mb-2">Offer:</h2>
              <p className="text-gray-800 mb-4"> {description}</p>
            </div>
          </TabPanel>
        ))}
      </Tabs>
      <button
        onClick={openModal} // Call the postOrder function when the button is clicked
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-all duration-300 mt-auto"
      >
        Contact
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h1><OrderNotificationModal closeModal={closeModal} postOrder={postOrder} /></h1>
      </Modal>
    </div>
  );
};

export default Offers;
