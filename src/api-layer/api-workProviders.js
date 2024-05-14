import axios from 'axios';
import TokenManager from '../Token/TokenManager';

const baseURL = "http://localhost:8080/providers";

const useWorkProvider = {
  postWorkProviders: async (newProvider) => {
    try {
      return await axios.post(baseURL, newProvider, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token is expired, attempt to refresh
        const newAccessToken = await TokenManager.refreshToken();

        // Retry the request with the new access token
        return axios.post(baseURL, newProvider, {
          headers: { Authorization: `Bearer ${newAccessToken}` }
        });
      }

      // Handle other errors...
      throw error;
    }
  },

  getWorkProviders: async () => {
    try {
      return await axios.get(`${baseURL}/web`).then(response => response.data.providers);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token is expired, attempt to refresh
        const newAccessToken = await TokenManager.refreshToken();

        // Retry the request with the new access token
        return axios.get(`${baseURL}/web`, {
          headers: { Authorization: `Bearer ${newAccessToken}` }
        }).then(response => response.data.providers);
      }

      // Handle other errors...
      throw error;
    }
  },

  getWebWorkProvidersById: async (id) => {
    try {
      return await axios.get(`${baseURL}/web/${id}`).then(response => response.data);
    } catch (error) {
      // Handle errors...
      throw error;
    }
  },

  getWorkProviderById: async (id) => {
    try {
      return await axios.get(`${baseURL}/${id}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      }).then(response => response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token is expired, attempt to refresh
        const newAccessToken = await TokenManager.refreshToken();

        // Retry the request with the new access token
        return axios.get(`${baseURL}/${id}`, {
          headers: { Authorization: `Bearer ${newAccessToken}` }
        }).then(response => response.data);
      }

      // Handle other errors...
      throw error;
    }
  },
  getOfferCount: async (id) => {
    try {
      debugger
      return await axios.get(`${baseURL}/offercount/${id}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      }).then(response => response.data);
    } catch (error) {
      if(error.response && error.response.status === 500)
      {
        return null;
      }
      if (error.response && error.response.status === 401) {
        // Access token is expired, attempt to refresh
        const newAccessToken = await TokenManager.refreshToken();

        // Retry the request with the new access token
        return axios.get(`${baseURL}/${id}`, {
          headers: { Authorization: `Bearer ${newAccessToken}` }
        }).then(response => response.data);
      }

      // Handle other errors...
      throw error;
    }
  },

  getIsWorkProvider: async (id) => {
    try {
      return await axios.get(`${baseURL}/isProvider/${id}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      }).then(response => response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token is expired, attempt to refresh
        const newAccessToken = await TokenManager.refreshToken();

        // Retry the request with the new access token
        return axios.get(`${baseURL}/isProvider/${id}`, {
          headers: { Authorization: `Bearer ${newAccessToken}` }
        }).then(response => response.data);
      }

      // Handle other errors...
      throw error;
    }
  },
};

export default useWorkProvider;
