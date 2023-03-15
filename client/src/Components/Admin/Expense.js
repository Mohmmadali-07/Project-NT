import React, { useState, useRef, useEffect } from "react";
import AddExpense from "./AddExpense";
import axios from "axios";
import ExpenseTable from "./ExpenseTable";

function Expense(props) {
  const [expenses, setExpenses] = useState([]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [balance, setBalance] = useState();
  const [id, setId] = useState();
  const [image, setImage] = useState();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [isCompany, setIsCompany] = useState(true);

  const [totalPages, setTotalPages] = useState(1);

  const addExpenseRef = useRef();

  function handleSelectChange(event) {
    const value = event.target.value;
    if (value === "neptune") {
      setIsCompany(true);
    } else if (value === "khanak") {
      setIsCompany(false);
    }
  }
  useEffect(
    function () {
      async function getExpenses() {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/expense?page=${page}&limit=${rowsPerPage}&company=${isCompany}`
          );
          const expense = response.data.cruds.map((crud) => {
            const expense = {
              id: crud._id,
              image: crud.image,
              ...crud.newExpense,
            };
            return expense;
          });

          setExpenses(expense);
          setBalance(response.data.totalBalance);
          setTotalPages(response.data.totalPages);
          setCount(response.data.count);
        } catch (error) {
          console.log("error", error);
        }
      }

      getExpenses();
    },
    [page, rowsPerPage, isCompany]
  );

  const handleClickOutside = (event) => {
    if (
      addExpenseRef.current &&
      !addExpenseRef.current.contains(event.target)
    ) {
      setShowAddExpense(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div>
        <label htmlFor="company-select">Select company:</label>
        <select id="company-select" onChange={handleSelectChange}>
          <option value="neptune">Neptune Technology</option>
          <option value="khanak">Khanak Enterprise</option>
        </select>
      </div>

      <div className="container  mx-auto my-6 relative z-0">
        <div>
          <button onClick={() => setShowAddExpense(!showAddExpense)}>
            Add Expense
          </button>
        </div>
        {showAddExpense && (
          <div className="absolute top-0 left-0 w-full h-screen  z-20 flex items-center justify-center backdrop-blur-sm">
            <div className="w-1/2" ref={addExpenseRef}>
              <AddExpense
                expenses={expenses}
                isCompany={isCompany}
                balance={balance}
              />
            </div>
          </div>
        )}
        <ExpenseTable expenses={expenses} />
        <label htmlFor="rows-per-page-select">Rows per page:</label>
        <select
          id="rows-per-page-select"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <br />
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span class="font-semibold text-indigo-900 dark:text-indigo-900">
            {rowsPerPage * (page - 1) + 1}
          </span>{" "}
          to{" "}
          <span class="font-semibold text-indigo-900 dark:text-indigo-900">
            {rowsPerPage * page <= count ? rowsPerPage * page : count}
          </span>{" "}
          of{" "}
          <span class="font-semibold text-indigo-900 dark:text-indigo-900">
            {count}
          </span>{" "}
          Entries
        </span>
        <br />
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous Page
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next Page
        </button>
        <br />
      </div>
    </div>
  );
}

export default Expense;
