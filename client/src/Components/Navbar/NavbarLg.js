import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import {
  ChartPieIcon,
  AcademicCapIcon,
  UserIcon,
  BanknotesIcon,
  BookOpenIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

function App() {
  return (
    <Navbar>
      <NavItem>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}




function NavItem(props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);


  function useOutsideAlerter(ref) {
    useEffect(() => {
      
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  

  return (
    <li className="nav-item" ref={wrapperRef}>
      <a href="#" onClick={() => setOpen(!open)}>
        Menu
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onMouseEnter={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  return (
    <div 
    onMouseLeave={() => setActiveMenu("main")}
    
    >
      <div
        className="dropdown1 "
        style={{ height: menuHeight + 30 }}
        ref={dropdownRef}
      >
        <CSSTransition
          in={activeMenu === "main"}
          onEnter={calcHeight}
        >
          <div className="menu ">
            <DropdownItem goToMenu="admin" leftIcon={<UserIcon />}>
              Admin
            </DropdownItem>
            <DropdownItem goToMenu="client" leftIcon={<AcademicCapIcon />}>
              Client
            </DropdownItem>
            <DropdownItem goToMenu="report" leftIcon={<ChartPieIcon />}>
              Report
            </DropdownItem>
          </div>
        </CSSTransition>
      </div>

      {activeMenu === "main" ? null : (
        <div className="sub" style={{ height: "140px"}}>
          <CSSTransition
            in={activeMenu === "admin"}
            
            unmountOnExit
          >
            <div className="submenu">
              
              <DropdownItem leftIcon={<UserIcon />}>
                <a onClick={() => navigate("/admin")}>User</a>
              </DropdownItem>
              <DropdownItem leftIcon={<BanknotesIcon />}>
              <a onClick={() => navigate("/expense")}>Expense</a>
              </DropdownItem>
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === "client"}
            
            unmountOnExit
          >
            <div className="submenu">
              
              <DropdownItem leftIcon={<BookOpenIcon />}>
                Client details
              </DropdownItem>
              <DropdownItem leftIcon={<PlusIcon />}>Add Client</DropdownItem>
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === "report"}
            
            unmountOnExit
            >
            <div className="submenu">
              
              <DropdownItem>See Reports</DropdownItem>
              <DropdownItem>Download Report</DropdownItem>
            </div>
          </CSSTransition>
        </div>
      )}
    </div>
  );
}

export default App;
