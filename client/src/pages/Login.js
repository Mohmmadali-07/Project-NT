import React, { useState } from "react";
import axios from "axios";
import {  FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const Navigate = useNavigate();

  const authenticate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/authenticate", {
        email,
        password,
      });
      console.log(res.status);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        Navigate("/home");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  
  return (
    <section
      id="sec"
      className="flex flex-row justify-center items-center w-screen h-screen"
    >
      <div
        id="left-container"
        className="flex flex-row justify-center items-center  h-screen"
      >
        <div
          id="left-container-align"
          className=" flex flex-col justify-center items-center sm:justify-evenly sm:w-full h-3/4 border border-primary rounded-md p-2 relative"
          autoComplete="off"
          style={{ borderOpacity: "0.2" }}
        >
          <h1 className="font-bold mb-0 mt-14 text-5xl" >Log in</h1>

          <form
            onSubmit={authenticate}
            className="flex flex-col justify-center items-center p-5"
          >
            <div className="h-full">
              <label for="email">Email Address*</label>
              <input
                type="text"
                className="w-full px-2 py-1 border border-gray-400 rounded-md  mb-3"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
                aria-label="Username"
                autoComplete="new-password"
                aria-describedby="basic-addon2"
              />
            </div>
            <div className="w-full m-auto h-full">
              <label for="password">Password*</label>

              <input
                type="password"
                className="w-full px-2 py-1 border border-gray-400 rounded-md mb-8"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                aria-label="Password"
                autoComplete="new-password"
                aria-describedby="basic-addon2"
              />
            </div>

            <div className="w-full m-auto mb-3">
              <input
                type="submit"
                value="Sign in"
                className="w-full px-4 py-2 text-white border border-primary rounded-md bg-indigo-500 hover:bg-indigo-700 active:bg-blue-700 focus:outline-none focus:ring focus:ring-violet-300"
              />
            </div>
          </form>

          <div className="flex flex-col justify-center items-center text-sm text-gray-500 mt-3 ">
            <p >Or continue with</p>
          </div>

          <div className="flex justify-center items-center ">
            <button className="p-2 mr-2">
              <a href="https://www.facebook.com/">
                <FaFacebook className=" fill-indigo-500 hover:fill-indigo-900" />
              </a>
            </button>
            <button className="p-2 mr-2">
              <a href="https://www.twitter.com/">
                <FaTwitter className=" fill-indigo-500 hover:fill-indigo-900" />
              </a>
            </button>
            <button className=" p-2">
              <a href="https://www.github.com/">
                <FaGithub className=" fill-indigo-500 hover:fill-indigo-900" />
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
