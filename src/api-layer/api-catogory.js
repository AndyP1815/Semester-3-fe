import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:8080/categories";

const useCategoryApi = {
  postCategories: (newCategory) => axios.post(baseURL, newCategory),
  getCategories: () => axios.get(baseURL).then(response => response.data.categories)
};

export default useCategoryApi;
