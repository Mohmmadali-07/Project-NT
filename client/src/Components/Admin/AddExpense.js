import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AddCategory from "./AddCategory";
import AddIncomeCategory from "./AddIncomeCategory";
import AddPaid from "./AddPaid";

import Select from "react-select";

function AddExpenseForm(props) {

  
  


  const { expenses } = props;
  const [company, setCompany] = useState("Neptune Technology");
  const [isNeptune, setIsNeptune] = useState(props.isCompany);
  const [categories, setCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);

  const [type, setType] = useState("expense");

  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [credit, setCredit] = useState("");
  const [debit, setDebit] = useState("");
  const [balance, setBalance] = useState(props.balance);
  const [subCategory, setSubCategory] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddPaid, setShowAddPaid] = useState(false);

  const [showAddIncomeCategory, setShowAddIncomeCategory] = useState(false);

  const [options, setOptions] = useState("");
  const [incomeOptions, setIncomeOptions] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);
  const [paidOption, setPaidOption] = useState(null);
  const [selectedPaidOption, setSelectedPaidOption] = useState(null);

  const [paid, setPaid] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);

  const [givenBy, setGivenBy] = useState("");
  const [image, setImage] = useState(null);
  const [imageType, setImageType] = useState(null);

  const [customName, setCustomName] = useState("");

  const source = [
    { value: "Upi", label: "Upi" },
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Cash", label: "Cash" },
  ];

  useEffect(() => {
    setIsNeptune(props.isCompany);
  }, [props.isCompany]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleCustomNameChange = (event) => {
    const customNameValue = event.target.value;
    setCustomName(customNameValue);
    setGivenBy(customNameValue);
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
    setCredit("");
    setDebit("");
  };


  useEffect(function () {
    async function getCategories() {
      try {
        const response = await axios.get("http://localhost:5000/api/category");
        setCategories(response.data);
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
        setPaid(response.data);
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
    setCredit(null);
    setDebit(null);
  }, [type]);

  useEffect(function () {
    async function getIncomeCategories() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/incomeCategory"
        );
        setIncomeCategories(response.data);
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

    // Append the image file to the FormData object
    formData.append("image", image);
    
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
        balance: Number(balance) +Number(credit) -Number(debit),
        category: selectedOption,
        subCategory: subCategory,
        remarks: remarks,
        givenBy: givenBy,
        source: selectedSource,
        paid: selectedPaidOption,
        imageType: imageType,
      })
      );
      
      for (const [name, value] of formData.entries()) {
        console.log(`${name}: ${value}`);
      }
    // Send the new expense to the server using Axios
    try {
      const res = await axios.post(
        "http://localhost:5000/api/expense",
        formData, // Send the FormData object instead of the newExpense object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the Content-Type header to multipart/form-data
          },
        }
      );
      console.log(res.status);
      if (res.status === 200) {
      }
    } catch (e) {
      console.log(e);
      alert("Please add all the values");
    }
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

        {expenses.length != 0 ? (
          <label>
            Balance:
            <input type="number" readOnly placeholder={balance} />
          </label>
        ):(
          <label>Balance:
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
                defaultValue={options[0]}
                isClearable={true}
                isSearchable={true}
                onChange={handleSelect}
                name="color"
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
                  defaultValue={options[0]}
                  isClearable={true}
                  isSearchable={true}
                  onChange={handleSelectPaid}
                  name="color"
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
                defaultValue={incomeOptions[0]}
                isClearable={true}
                isSearchable={true}
                onChange={handleSelect}
                name="color"
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
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={source[0]}
          isClearable={true}
          isSearchable={true}
          onChange={handleSelectSource}
          name="color"
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
            {givenBy != "Bunty Patel" && givenBy != "Vrushank Shah" ? (
              <input
                type="text"
                value={customName}
                onChange={handleCustomNameChange}
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
