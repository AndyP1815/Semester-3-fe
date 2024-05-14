import axios, { AxiosError } from 'axios';
import TokenManager from '../Token/TokenManager';

const baseURL = "http://localhost:8080/users";

const useUsersApi = {
  postUsers: async (users) => {
    try {
      return await axios.post(baseURL, users)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token is expired, attempt to refresh
        const newAccessToken = await TokenManager.refreshToken();

        // Retry the request with the new access token
        return axios.post(baseURL, users, {
          headers: { Authorization: `Bearer ${newAccessToken}` }
        });
      }

      // Handle other errors...
      throw error;
    }
  },

  getUsers: async () => {
    try {
    
      return await axios.get(baseURL, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      }).then(response => response.data.users);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token is expired, attempt to refresh
        const newAccessToken = await TokenManager.refreshToken();

        // Retry the request with the new access token
        return axios.get(baseURL, {
          headers: { Authorization: `Bearer ${newAccessToken}` }
        }).then(response => response.data.users);
      }

      // Handle other errors...
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      debugger
      return await axios.get(`${baseURL}/${id}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      }).then(response => response.data);
    } catch (error) {
      if (error.response && error.response.status === 401 || error.message == "Network Error") {
        // Access token is expired, attempt to refresh
        debugger
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

  deleteUser: async (id) => {
    try {
      return await axios.delete(`${baseURL}/${id}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      }).then(response => response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token is expired, attempt to refresh
        const newAccessToken = await TokenManager.refreshToken();

        // Retry the request with the new access token
        return axios.delete(`${baseURL}/${id}`, {
          headers: { Authorization: `Bearer ${newAccessToken}` }
        }).then(response => response.data);
      }

      // Handle other errors...
      throw error;
    }
  },
};

export default useUsersApi;
