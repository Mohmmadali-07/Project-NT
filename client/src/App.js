import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './Components/Admin/User';
import Client from './Components/Client/Client';
import Report from './Components/Report/Report';
import Navbar from './Components/Navbar/Navbar';
import UserTable from './Components/Admin/crud/UserTable1';
import { useLocation } from "react-router-dom";
import Expense from './Components/Admin/Expense';
import UpdateExpense from './Components/Admin/UpdateExpense';
import UpdateLog from './Components/Admin/UpdateLog';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const currentLocation = useLocation();
  return (
    <>
      
      {currentLocation.pathname === "/" ? null : (
          <div className='sticky top-0 z-10'>
            <Navbar />
          </div>
        )}
      <div className="App ">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/user" element={<Admin />} />
          <Route path="/client" element={<Client />} />
          <Route path="/report" element={<Report />} />
          <Route path="/userTable" element={<UserTable />} />
          <Route path="/updateExpense" element={<UpdateExpense />} />
          <Route path="/updateLog" element={<UpdateLog />} />



        </Routes>
      </div>
    </>
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
