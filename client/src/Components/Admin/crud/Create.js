import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Signup(props) {
  const [first, setFirst] = useState();
  const [middle, setMiddle] = useState();
  const [last, setLast] = useState();
  const [dob, setDob] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [pin, setPin] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstError , setFirstError] = useState("");
  const [middleError , setMiddleError] = useState("");
  const [lastError , setLastError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [pinError, setPinError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  

  const navigate = useNavigate();
  
  const validateEmail = (email) => {
    // email validation logic here
    if (!email.includes("@") || !email.includes(".com")) {
      setEmailError("Enter a valid Email");
    } else {
      setEmailError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  const validatePassword = (password) => {
    // email validation logic here
    if (!passwordRegex.test(password)) {
      console.log(password);
      setPasswordError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };


  const validateFirst = (first) => {
    // first validation logic here
    if (first.includes(" ")) {
      setFirstError("Name cannot include space");
    } else {
      setFirstError("");
    }
  };

  const handleFirstChange = (e) => {
    setFirst(e.target.value);
    validateFirst(e.target.value);
  };

  
  const validateMiddle = (middle) => {
    // middle validation logic here
    if (middle.includes(" ")) {
      setMiddleError("Name cannot include space");
    } else {
      setMiddleError("");
    }
  };

  const handleMiddleChange = (e) => {
    setMiddle(e.target.value);
    validateMiddle(e.target.value);
  };

  const validateLast = (last) => {
    // last validation logic here
    if (last.includes(" ")) {
      setLastError("Name cannot include space");
    } else {
      setLastError("");
    }
  };

  const handleLastChange = (e) => {
    setLast(e.target.value);
    validateLast(e.target.value);
  };
  const mobileNumberRegex = /^[0-9]{10}$/;
  const validateMobile = (mobile) => {
    // mobile validation logic here
    if (!mobileNumberRegex.test(mobile)) {
      setMobileError("Enter Valid mobile number");
    } else {
      setMobileError("");
    }
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    validateMobile(e.target.value);
  };

  const pinRegex = /^[0-9]{6}$/;
  const validatePin = (pin) => {
    // pin validation logic here
    if (!pinRegex.test(pin)) {
      setPinError("Enter Valid Pin number");
    } else {
      setPinError("");
    }
  };

  const handlePinChange = (e) => {
    setPin(e.target.value);
    validatePin(e.target.value);
  };


  const submitUser = async (e) => {
    e.preventDefault();
    try {

      
      
      const res = await axios.post("http://localhost:5000/postUser", {
        name: `${first} ${middle} ${last}`,
        dob,
        email,
        password,
        mobile,
        country,
        state,
        city,
        pin,
      });
      console.log(res.data);
      if(res.status === 200){
        console.log(res.status);
        navigate("/admin");
      }
      
    } catch (err) {
      console.log(err.message);
      setErrorMessage("User already exist");
    }
  };

  useEffect(()=>{
    const res = axios.get("/getPlaces");
  })

  return (
    <div>
            
      <form autoComplete="off" onSubmit={submitUser} >
      
        <div>
          <label for="first-name">First Name:</label>
          <br />
          <input
            type="text"
            id="first-name"
            name="first-name"
            placeholder="First Name"
            required
            onChange={handleFirstChange}
          />
          {firstError && <div style={{ color: "red" }}>{firstError}</div>}
        </div>
        <div>
          <label for="middle-name">Middle Name:</label>
          <br />
          <input
            type="text"
            id="middle-name"
            name="middle-name"
            placeholder="Middle Name"
            required
            onChange={handleMiddleChange}
          />
          {middleError && <div style={{ color: "red" }}>{middleError}</div>}
        </div>
        <div>
          <label for="last-name">Last Name:</label>
          <br />
          <input
            type="text"
            id="last-name"
            name="last-name"
            placeholder="Last Name"
            required
            onChange={handleLastChange}
          />
          {lastError && <div style={{ color: "red" }}>{lastError}</div>}

        </div>

        <div>
          <label for="full-name">Full Name:</label>
          <br />
          <input
            type="text"
            id="full-name"
            name="full-name"
            required
            value={first || middle || last ? `${first} ${middle} ${last}` : ``}
          />
          
        </div>
        <div>
          <label for="dob">Date of Birth:</label>
          <br />
          <input
            type="date"
            id="dob"
            name="dob"
            required
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <label for="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="new-password"
            required
            onChange={handleEmailChange}
          />
          {emailError && <div style={{ color: "red" }}>{emailError}</div>}
        </div>
        <div>
          <label for="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
           required
            onChange={handlePasswordChange}
          />
          {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        </div>
        <div>
          <label for="mobile">Mobile Number:</label>
          <br />
          <input
            type="tel"
            id="mobile"
            name="mobile"
            
            title="Mobile number must be 10 digits and numeric characters only."
            required
            onChange={handleMobileChange}
          />
          {mobileError && <div style={{ color: "red" }}>{mobileError}</div>}

        </div>
        <div>
          <label for="country">Country:</label>
          <br />
          <select
            id="country"
            name="country"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">-- Select Country --</option>
            <option value="USA">India</option>
            <option value="Canada">USA</option>
            <option value="Mexico">Canada</option>
          </select>
        </div>

        <div>
          <label for="state">State:</label>
          <br />
          <select
            id="state"
            name="state"
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">-- Select State --</option>
          </select>
        </div>
        <div>
          <label for="city">City:</label>
          <br />
          <select
            id="city"
            name="city"
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">-- Select City --</option>
          </select>
        </div>

        <div>
          <label for="pincode">Pin Code:</label>
          <br />
          <input
            type="text"
            id="pincode"
            name="pincode"
           
            title="Pin code must be 6 digits and numeric characters only."
      
            onChange={handlePinChange}
          />
          {pinError && <div style={{ color: "red" }}>{pinError}</div>}

        </div>
        <div>
          <button type="submit">Add User</button>
          <button type="button" id="reset-btn">
            Reset
          </button>
        </div>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </form>
    </div>
  );
}
