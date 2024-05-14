import { useState, useEffect } from "react";
import axios from "axios";
import TokenManager from '../Token/TokenManager';

const baseURL = "http://localhost:8080/orderNotifications";

const useOrderNotification = {
  postOrderNotification: async (newOrderNotification) => {
    try {
      return await axios.post(baseURL, newOrderNotification, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token is expired, attempt to refresh
        const newAccessToken = await TokenManager.refreshToken();

        // Retry the request with the new access token
        return axios.post(baseURL, newOrderNotification, {
          headers: { Authorization: `Bearer ${newAccessToken}` }
        });
      }

      // Handle other errors...
      throw error;
    }
  },

  getOrderNotificationById: async (id) => {
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

  postAcceptOrDecline: async (acceptDecline) => {
    try {
      return await axios.post(baseURL + "/acceptDecline", acceptDecline, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access token is expired, attempt to refresh
        const newAccessToken = await TokenManager.refreshToken();

        // Retry the request with the new access token
        return axios.post(baseURL + "/acceptDecline", acceptDecline, {
          headers: { Authorization: `Bearer ${newAccessToken}` }
        });
      }

      // Handle other errors...
      throw error;
    }
  },
};

export default useOrderNotification;
