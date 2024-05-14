import React, { useState, useEffect } from 'react';
import useCategoryApi from '../api-layer/api-catogory';

const CreateWorkService = ({ setWorkService, workService, onSubmit }) => {
  const [categories, setCategories] = useState([]);

  const refreshCategories = () => {
    useCategoryApi
      .getCategories()
      .then(categories => setCategories(categories))
      .catch(error => console.error("Error fetching categories:", error));
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name !== 'category') {
      setWorkService((prevWorkService) => ({
        ...prevWorkService,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (option) => {
    setWorkService((prevWorkService) => {
      const isSelected = prevWorkService.category.includes(option.id);

      if (isSelected) {
        return {
          ...prevWorkService,
          category: prevWorkService.category.filter(
            (selectedOption) => selectedOption !== option.id
          ),
        };
      } else {
        return {
          ...prevWorkService,
          category: [...prevWorkService.category, option.id],
        };
      }
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Work Service</h2>
      <form className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="name"
            value={workService.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description:</span>
          <textarea
            name="description"
            value={workService.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
        <label className="block text-gray-700 font-bold mb-2">Categories</label>
        {categories.map((option) => (
          <div className="flex items-center" key={option.id}>
            <input
              type="checkbox"
              className="mr-2"
              checked={workService.category.includes(option.id)}
              id={`categories-${option.id}`}
              name="categories"
              onChange={() => handleCheckboxChange(option)}
            />
            <label
              className="text-sm"
              htmlFor={`categories-${option.id}`}
            >
              {option.name}
            </label>
          </div>
        ))}
     
      </form>
    </div>
  );
};

export default CreateWorkService;
