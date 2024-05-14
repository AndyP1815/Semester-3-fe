import axios from "axios";
import TokenManager from "./TokenManager";

const AuthAPI = {
  
  login: (user) => axios.post('http://localhost:8080/tokens', user)
    .then(response => response.data.accessToken)
    .then(accessToken => {
      TokenManager.setAccessToken(accessToken);
      console.log('Access Token:', accessToken);
    })
    .catch(error => {
      console.error('Login error:', error);
      throw error; // Propagate the error for further handling, if needed
    })
};

export default AuthAPI;
