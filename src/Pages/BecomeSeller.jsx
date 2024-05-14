import React, { useEffect, useState } from 'react';
import CreateOffer from '../components/CreateOffer';
import CreateWorkService from '../components/CreateWorkService';
import TokenManager from '../Token/TokenManager';
import useServicesApi from '../api-layer/api-services';
import useWorkProvider
 from '../api-layer/api-workProviders';
 import { useNavigate } from 'react-router-dom';


const BecomeSeller = () => {
  const claim = TokenManager.getClaims();
  const navigate = useNavigate();
  const handleLogout = () => {
    TokenManager.clear();
    navigate('/')
  };

  const [workService, setWorkService] = useState({
    name: '',
    description: '',
    images: [
      "/src/assets/newUser1.jpg",
      "/src/assets/newUser2.jpg",
      "/src/assets/newUser3.jpg",
      "/src/assets/newUser4.jpg",
    ],
    category: [],
    offers: [],
  });

  const [offer, setOffer] = useState({
    price: 0,
    description: '',
    name: '',
  });

  const [offerList, setOfferList] = useState([]);

  const [workProvider, setWorkProvider] = useState({
    serviceId: 0,
    description: '',
    userId: claim ? claim.userId : '',
  });

  const handleWorkProviderSubmit = (e) => {
    
    e.preventDefault();

    console.log("test", offerList);
    setWorkService((prevWorkService) => ({
      ...prevWorkService,
      offers: offerList
    }))
    setWorkProvider((prevWorkProvider) => ({
      ...prevWorkProvider,
      description: workProvider.description,
      userId: claim.userId,
    }));

    console.log("test", workProvider);
    console.log("test", workService);
  };
  useEffect(() => {
    const postData = async () => {
      if (workService.offers.length !== 0) {
        try {
          debugger
          console.log(workService)
          const response = await useServicesApi.postServices(workService);
          setWorkProvider((prevWorkProvider) => ({
            ...prevWorkProvider,
            serviceId: response.data
          }));
        } catch (error) {
          console.error("Error posting services:", error);
        }
      }
    };
  
    postData();
  }, [workService.offers]);
  useEffect(() => {
    console.log("workprovider",workProvider)
    const postData = async () => {
      if (workProvider.serviceId > 0) {
        try {
          const response = await useWorkProvider.postWorkProviders(workProvider)
          handleLogout()


        } catch (error) {
          console.error("Error posting services:", error);
        }
      }
    };
  
    postData();
  }, [workProvider.serviceId]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Become a Seller</h2>

      {offerList.length < 4 ? (
        <CreateOffer
          setOffer={setOffer}
          setOfferList={setOfferList}
          offer={offer}
        />
      ) : (
        <p className="text-red-500">You can only have up to three offers.</p>
      )}
       <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Your Offers:</h3>
        <ul>
          {offerList.map((offer, index) => (
            <li key={index}>
              {offer.name} - {offer.description} - ${offer.price}
            </li>
          ))}
        </ul>
      </div>
      <CreateWorkService
        workService={workService}
        setWorkService={setWorkService}
        onSubmit={handleWorkProviderSubmit}
      />


      <form onSubmit={handleWorkProviderSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Work Provider Description:</span>
          <textarea
            name="description"
            value={workProvider.description}
            onChange={(e) =>
              setWorkProvider((prevWorkService) => ({
                ...prevWorkService,
                description: e.target.value,
              }))
            }
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Submit Work Provider Description
        </button>
      </form>
    </div>
  );
};

export default BecomeSeller;
