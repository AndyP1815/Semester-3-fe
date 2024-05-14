import { useState, useEffect } from "react";
import axios from "axios";
import TokenManager from '../Token/TokenManager';

const baseURL = "http://localhost:8080/serviceOrder";

const useServiceOrder = {
  postServiceOrder: async (newServiceOrder) => {
    try {
      return await axios.post(baseURL, newServiceOrder, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token is expired, attempt to refresh
        const newAccessToken = await TokenManager.refreshToken();

        // Retry the request with the new access token
        return axios.post(baseURL, newServiceOrder, {
          headers: { Authorization: `Bearer ${newAccessToken}` }
        });
      }

      // Handle other errors...
      throw error;
    }
  },

  getServiceOrderById: async (id) => {
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
};

export default useServiceOrder;
