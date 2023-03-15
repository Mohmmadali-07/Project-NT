import { useState } from "react";
import axios from 'axios';

function AddCategoryForm() {
  const [category, setCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newExpense = {
        
        category: category,
        
      };
    try {
        const res = await axios.post(
          "http://localhost:5000/api/paid",
          newExpense
        );
        console.log(res.status);
        
      } catch (e) {
        console.log(e);
        alert("Please add all the values");
      }
    setCategory("");
  };

  

  return (
    <div className="p-4 bg-teal-300">
      <h2 className="text-lg font-medium mb-2">Add Category</h2>
        <label className="mb-2">
           Name:
          <input
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="border border-gray-300 p-2 rounded-lg mt-1"
            required
          />
        </label>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4"
        >
          Add Paid To
        </button>
    </div>
  );
}

export default AddCategoryForm;