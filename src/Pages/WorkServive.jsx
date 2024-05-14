import React, { useEffect, useState } from 'react';
import useWorkProvider from '../api-layer/api-workProviders';
import TokenManager from '../Token/TokenManager';

const WorkService = () => {
  const [workProvider, setWorkProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  const claim = TokenManager.getClaims();

  useEffect(() => {
    const getWorkProvider = async () => {
      try {
        const response = await useWorkProvider.getWorkProviderById(claim.userId);
        setWorkProvider(response);
        console.log(response);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    // Call the function to fetch data when the component mounts
    getWorkProvider();
  }, [claim.userId]); // Add dependencies to the useEffect dependency array

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other UI indication
  }

  return (
    <div>
      <h1>WorkService</h1>
      {/* Render your component based on the fetched data */}
      {workProvider && (
        <div>
          {/* Display information from workProvider */}
          <p>Provider Name: {workProvider.username}</p>
          {/* Add more details based on your API response */}
        </div>
      )}
    </div>
  );
};

export default WorkService;
