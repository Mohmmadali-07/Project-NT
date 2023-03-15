import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AddCategory from "./AddCategory";
import AddIncomeCategory from "./AddIncomeCategory";
import AddPaid from "./AddPaid";

import Select from "react-select";

function AddExpenseForm(props) {
  const expenses = props.expense;
  const ogImage = props.expense.image;

  const isNeptune = expenses.company;
  
  const balance = expenses.balance;

  const [type, setType] = useState(expenses.type);

  const [date, setDate] = useState(expenses.date);

  const [description, setDescription] = useState(expenses.description);

  const [credit, setCredit] = useState(expenses.credit);
  const [debit, setDebit] = useState(expenses.debit);

  const [subCategory, setSubCategory] = useState(expenses.subCategory);
  const [remarks, setRemarks] = useState(expenses.remarks);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddPaid, setShowAddPaid] = useState(false);
  const [showAddIncomeCategory, setShowAddIncomeCategory] = useState(false);

  const [options, setOptions] = useState("");
  const [incomeOptions, setIncomeOptions] = useState("");
  const [paidOption, setPaidOption] = useState(null);

  const [selectedOption, setSelectedOption] = useState(expenses.category);
  const [selectedPaidOption, setSelectedPaidOption] = useState(expenses.paid);
  const [selectedSource, setSelectedSource] = useState(expenses.source);

  const [givenBy, setGivenBy] = useState(expenses.givenBy);
  const [image, setImage] = useState(null);

  const [customName, setCustomName] = useState("");

  const source = [
    { value: "Upi", label: "Upi" },
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Cash", label: "Cash" },
  ];
  

  const handleImageChange = (e) => {
    setImage(e.target.files);
  };

  const handleGivenByChange = (event) => {
    setGivenBy(event.target.value);
  };

  const handleSelect = (option) => {
    setSelectedOption(option.value);
  };

  const handleSelectPaid = (option) => {
    setSelectedPaidOption(option.value);
  };

  const handleSelectSource = (option) => {
    setSelectedSource(option.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  useEffect(function () {
    async function getCategories() {
      try {
        const response = await axios.get("http://localhost:5000/api/category");
        setOptions(
          response.data.map((category) => ({
            value: category.category,
            label: category.category,
          }))
        );
        console.log(options);
      } catch (error) {
        console.log("error", error);
      }
    }
    getCategories();
  }, []);

  useEffect(function () {
    async function getPaid() {
      try {
        const response = await axios.get("http://localhost:5000/api/paid");
        setPaidOption(
          response.data.map((category) => ({
            value: category.category,
            label: category.category,
          }))
        );
        console.log(paidOption);
      } catch (error) {
        console.log("error", error);
      }
    }
    getPaid();
  }, []);


  useEffect(() => {
    if (type === "income") {
      setDebit(null);
    } else {
      setCredit(null);
    }
  }, [type]);

  useEffect(function () {
    async function getIncomeCategories() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/incomeCategory"
        );
        setIncomeOptions(
          response.data.map((category) => ({
            value: category.category,
            label: category.category,
          }))
        );
      } catch (error) {
        console.log("error", error);
      }
    }
    getIncomeCategories();
  }, []);

  const addExpenseRef = useRef();

  const handleClickOutside = (event) => {
    if (
      addExpenseRef.current &&
      !addExpenseRef.current.contains(event.target)
    ) {
      setShowAddCategory(false);
      setShowAddIncomeCategory(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    console.log(image);
    console.log(ogImage);

    if (image === null) {
      formData.append("image",JSON.stringify(ogImage));      
    } else {
      formData.append("image", image[0]);      
      
    }
    
    if (debit == 0) {
      setDebit(null)
    }else{
      setCredit(null)
    }

    // Append the image file to the FormData object
    formData.append("id", props.expense.id);
    formData.append("initialExpense", JSON.stringify(props.expense));

    // Convert the newExpense object to JSON and append it to the FormData object
    formData.append(
      "newExpense",
      JSON.stringify({
        company: isNeptune,
        date: date,
        description: description,
        type: type,
        credit: credit,
        debit: debit,
        balance: balance,
        category: selectedOption,
        subCategory: subCategory,
        remarks: remarks,
        givenBy: givenBy,
        source: selectedSource,
        paid: selectedPaidOption,
        
      })
    );

    let values = {
      company: isNeptune,
        date: date,
        description: description,
        type: type,
        credit: credit,
        debit: debit,
        balance: balance,
        category: selectedOption,
        subCategory: subCategory,
        remarks: remarks,
        givenBy: givenBy,
        source: selectedSource,
        paid: selectedPaidOption,
      
    };
    let changedValues = {};
let initialValues = {};
for (const key in values) {
  if (values.hasOwnProperty(key) && values[key] !== props.expense[key]) {
    changedValues[key] = values[key];
    initialValues[key] = props.expense[key];
  }
}
let image1
if (image === null) {
  image1 = false     
} else {
  image1 = true      
  
}
let result = {
  id: props.expense.id,
  image:image1,
  values: {
    changedValues,
    initialValues,
  },
};

    
    try {
      const res = await axios.post(
        "http://localhost:5000/api/updatelog",
        result
      );
      console.log(res.status);
      
    } catch (e) {
      console.log(e);
      alert("Please add all the values");
    }
    // Send the new expense to the server using Axios
    async function updateCrud() {
      try {
        await axios.patch(
          `http://localhost:5000/api/expense/${props.expense.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the Content-Type header to multipart/form-data
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
    updateCrud();
  };

  return (
    <div className="">
      <form>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>

        <br />
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <br />
        <label>
          Type:
          <select value={type} onChange={handleTypeChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
        <br />

        <label>
          Amount:
          <input
            type="number"
            value={type === "income" ? credit : debit}
            onChange={(event) =>
              type === "income"
                ? setCredit(event.target.value)
                : setDebit(event.target.value)
            }
          />
        </label>

        <br />

        {expenses != 0 ? (
          <label>
            Balance:
            <input type="number" readOnly placeholder={balance} />
          </label>
        ) : (
          <label>
            Balance:
            <input type="number" readOnly placeholder={0} />
          </label>
        )}

        <br />
        {type === "expense" ? (
          <div>
            <div>
              <label>Category:</label>

              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={selectedOption}
          placeholder={selectedOption}

                isClearable={true}
                isSearchable={true}
                onChange={handleSelect}
                name="category"
                options={options}
              />

              <button onClick={() => setShowAddCategory(true)}>
                Add Category
              </button>
              {showAddCategory && (
                <div className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-1/2" ref={addExpenseRef}>
                    <AddCategory />
                    <button onClick={() => setShowAddCategory(false)}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label>
                Paid To:
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={selectedPaidOption}
          placeholder={selectedPaidOption}

                  isClearable={true}
                  isSearchable={true}
                  onChange={handleSelectPaid}
                  name="paid"
                  options={paidOption}
                />
              </label>

              <button onClick={() => setShowAddPaid(true)}>Add Person</button>
              {showAddPaid && (
                <div className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-1/2" ref={addExpenseRef}>
                    <AddPaid />
                    <button onClick={() => setShowAddPaid(false)}>Close</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <label>
              Category:
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={selectedOption}
          placeholder={selectedOption}

                isClearable={true}
                isSearchable={true}
                onChange={handleSelect}
                name="category"
                options={incomeOptions}
              />
            </label>

            <button onClick={() => setShowAddIncomeCategory(true)}>
              Add Category
            </button>

            {showAddIncomeCategory && (
              <div className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center backdrop-blur-sm">
                <div className="w-1/2" ref={addExpenseRef}>
                  <AddIncomeCategory />
                  <button onClick={() => setShowAddIncomeCategory(false)}>
                    Add Category
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <br />
        Source:
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={selectedSource}
          placeholder={selectedSource}
          isClearable={true}
          isSearchable={true}
          onChange={handleSelectSource}
          name="source"
          options={source}
        />

        <br />
        <label>
          Subcategory:
          <input
            type="text"
            value={subCategory}
            onChange={(event) => setSubCategory(event.target.value)}
          />
        </label>
        <br />
        <label>
          Remarks:
          <input
            type="text"
            value={remarks}
            onChange={(event) => setRemarks(event.target.value)}
          />
        </label>
        <br />

        {type === "income" && (
          <div>
            <label htmlFor="given-by">Given by</label>
            <select
              id="given-by"
              name="given-by"
              value={givenBy}
              onChange={handleGivenByChange}
            >
              <option value="Bunty Patel">Bunty Patel</option>
              <option value="Vrushank Shah">Vrushank Shah</option>
              <option value="Other">Other</option>
            </select>
            <br />
            {givenBy !== "Bunty Patel" && givenBy !== "Vrushank Shah" ? (
              <input
                type="text"
                value={customName}
                onChange={(event) => {
                  setCustomName(event.target.value);
                  setGivenBy(event.target.value);
                }}
              />
            ) : null}
          </div>
        )}
        <div>
          <label htmlFor="bill">Bill:</label>
          <br />
          <input
            type="file"
            id="bill"
            name="bill"
            onChange={handleImageChange}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default AddExpenseForm;
