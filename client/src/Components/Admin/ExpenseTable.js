import React from "react";
import { useState, useRef, useEffect } from "react";
import UpdateExpense from "./UpdateExpense";
import axios from "axios";
import UpdateLog from "./UpdateLog";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const ExpenseTable = (props) => {
  const { expenses } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showUpdateExpense, setShowUpdateExpense] = useState(false);
  const [updateExpense, setUpdateExpense] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [totalCredit, setTotalCredit] = useState();
  const [totalDebit, setTotalDebit] = useState();
  const [currentBalance, setCurrentBalance] = useState();
  const [showUpdateLog, setShowUpdateLog] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [hidden, setHidden] = useState(true);

  const addExpenseRef = useRef();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value.trim().toLowerCase());
  };

  function handleOptionChange(expenseId, option) {
    console.log(expenseId, option);
    if (option === "Update") {
      setShowUpdateExpense(true);
      for (let i = 0; i < expenses.length; i++) {
        if (expenseId === expenses[i].id) {
          setUpdateExpense(expenses[i]);
        }
      }
    } else if (option === "Delete") {
      handleDelete(expenseId);
    } else if (option === "Update Log") {
      setSelectedId(expenseId);
      setShowUpdateLog(!showUpdateLog);
    }
  }
  const options = [
    { value: "Update", label: "Update" },
    { value: "Delete", label: "Delete" },
    { value: "Update Log", label: "Update Log" },
  ];
  const defaultOption = "Actions";

  useEffect(() => {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    const filteredExpenses = expenses.filter((expense) => {
      const { description, category, subCategory, givenBy } = expense;
      const formattedDate = new Date(expense.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return (
        formattedDate?.toLowerCase().includes(lowerCaseSearchValue) ||
        description?.toLowerCase().includes(lowerCaseSearchValue) ||
        category?.toLowerCase().includes(lowerCaseSearchValue) ||
        subCategory?.toLowerCase().includes(lowerCaseSearchValue) ||
        givenBy?.toLowerCase().includes(lowerCaseSearchValue)
      );
    });
    setFilteredExpenses(filteredExpenses);

    let totalCredit = 0;
    let totalDebit = 0;

    filteredExpenses.forEach((expense) => {
      totalCredit += Number(expense.credit);
      totalDebit += Number(expense.debit);
    });

    setFilteredExpenses(filteredExpenses);
    setTotalCredit(totalCredit);
    setTotalDebit(totalDebit);
    setCurrentBalance(totalCredit - totalDebit);
  }, [expenses, searchValue]);

  const handleButtonClick = (event, expense) => {
    setSelectedRow(event);
    setShowPopup(!showPopup);
  };

  const handleShowUpdate = (event) => {
    setSelectedId(event);
    setShowUpdateLog(!showUpdateLog);
  };

  const handleClickOutside = (event) => {
    if (
      addExpenseRef.current &&
      !addExpenseRef.current.contains(event.target)
    ) {
      setShowUpdateExpense(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  async function handleDelete(event) {
    try {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (confirmed) {
        await axios.delete(`http://localhost:5000/api/expense/${event}`);
        window.location.reload(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-white shadow-md h-5/6 rounded my-6 overflow-x-auto">
      <input
        type="text"
        placeholder="Search expenses..."
        value={searchValue}
        onChange={handleSearchChange}
      />
      <table className="table-auto w-50vw">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Sr No.</th>

            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Credit</th>
            <th className="py-3 px-6 text-left">Debit</th>
            <th className="py-3 px-6 text-left">Balance</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-left">Sub-Category</th>
            <th className="py-3 px-6 text-left">Given By</th>
            <th className="py-3 px-6 text-left">Bill</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredExpenses.map((expense, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">{index + 1}</td>

              <td className="py-3 px-6 text-left">
                {new Date(expense.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="py-3 px-6 text-left">{expense.description}</td>
              <td className="py-3 px-6 text-left">{expense.credit}</td>
              <td className="py-3 px-6 text-left">{expense.debit}</td>
              <td className="py-3 px-6 text-left">{expense.balance}</td>
              <td className="py-3 px-6 text-left">{expense.category}</td>
              <td className="py-3 px-6 text-left">{expense.subCategory}</td>
              <td className="py-3 px-6 text-left">
                {expense.givenBy}
                {expense.paid}
              </td>
              <td className="py-3 px-6 text-left">
                <button onClick={() => handleButtonClick(expense.id)}>
                  View Bill
                </button>

                {showPopup && expense.id === selectedRow && (
                  <div className="popup">
                    {expense.image.mimetype.split("/")[0] === "image" ? (
                      <>
                        <button className="close" onClick={handleButtonClick}>
                          Close
                        </button>
                        <img
                          src={`http://localhost:5000/${expense.image.path}`}
                          alt="Image"
                        />
                      </>
                    ) : (
                      <>
                        <embed
                          src={`http://localhost:5000/${expense.image.path}`}
                          type="application/pdf"
                          width="100%"
                          height="500px"
                        />
                        <button className="close" onClick={handleButtonClick}>
                          Close
                        </button>
                      </>
                    )}
                  </div>
                )}
              </td>

              <td>
                <Dropdown
                  options={options}
                  onChange={(selected) =>
                    handleOptionChange(expense.id, selected.value)
                  }
                  value={defaultOption}
                />
              </td>
              {showUpdateExpense && (
                <div className="absolute top-0 left-0 w-full h-screen z-20 flex items-center justify-center backdrop-blur-sm">
                  <div ref={addExpenseRef} className="w-1/2">
                    <UpdateExpense expense={updateExpense} />
                  </div>
                </div>
              )}
              {showUpdateLog && (
                <div className="absolute top-0 left-0 w-full h-screen z-20 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-1/2" ref={addExpenseRef}>
                    <UpdateLog id={selectedId} />
                  </div>

                  <button
                    className="close"
                    onClick={() => setShowUpdateLog(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </tr>
          ))}
          <tr>
            <td className="py-3 px-6 text-left"></td>
            <td className="py-3 px-6 text-left">
              <strong>Total</strong>
            </td>
            <td className="py-3 px-6 text-left"></td>
            <td className="py-3 px-6 text-left">{totalCredit}</td>
            <td className="py-3 px-6 text-left">{totalDebit}</td>
            <td className="py-3 px-6 text-left">{currentBalance}</td>
            <td className="py-3 px-6 text-left"></td>
            <td className="py-3 px-6 text-left"></td>
            <td className="py-3 px-6 text-left"></td>
            <td className="py-3 px-6 text-left"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
