import { useState, useEffect } from "react";
import axios from "axios";
import TokenManager from "../Token/TokenManager";

const baseURL = "http://localhost:8080/services";

const useServicesApi = {
  // Function to refresh the access token
  refreshAccessToken: async () => {
    try {
      const newAccessToken = await TokenManager.refreshAccessToken();
      return newAccessToken;
    } catch (error) {
      // Handle the error (e.g., log out the user, show an error message)
      throw error;
    }
  },

  postServices: async (newService) => {
    try {
      return await axios.post(baseURL, newService, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      });
    } catch (error) {
      // Check if the error is due to an expired access token
      if (error.response && error.response.status === 401) {
        // Access token is expired, attempt to refresh
        const newAccessToken = await useServicesApi.refreshAccessToken();

        // Retry the request with the new access token
        return axios.post(baseURL, newService, {
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
      }

      // Handle other errors...
      throw error;
    }
  },

  getServices: async () => {
    try {
      return await axios.get(baseURL).then((response) => response.data.services);
    } catch (error) {
      // Check if the error is due to an expired access token
      if (error.response && error.response.status === 401) {
        // Access token is expired, attempt to refresh
        const newAccessToken = await useServicesApi.refreshAccessToken();

        // Retry the request with the new access token
        return axios.get(baseURL, {
          headers: { Authorization: `Bearer ${newAccessToken}` },
        }).then((response) => response.data.services);
      }

      // Handle other errors...
      throw error;
    }
  },

  getServiceById: async (id) => {
    try {
      return await axios.get(`${baseURL}/${id}`).then((response) => response.data);
    } catch (error) {
      // Check if the error is due to an expired access token
      if (error.response && error.response.status === 401) {
        // Access token is expired, attempt to refresh
        const newAccessToken = await useServicesApi.refreshAccessToken();

        // Retry the request with the new access token
        return axios.get(`${baseURL}/${id}`, {
          headers: { Authorization: `Bearer ${newAccessToken}` },
        }).then((response) => response.data);
      }

      // Handle other errors...
      throw error;
    }
  },
};

export default useServicesApi;
