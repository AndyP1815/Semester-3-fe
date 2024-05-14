import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:8080/tokens";

const useLoginApi = {
  postTokens: (user) => axios.post(baseURL, user),
};

export default useLoginApi;
