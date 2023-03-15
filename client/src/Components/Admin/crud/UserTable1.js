import React, { useState, useEffect } from "react";
import axios from "axios";
import {  FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";

import { Link } from "react-router-dom";

function UserTable() {
	const [cruds, setCruds] = useState([]);

	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get("http://localhost:5000/api/cruds");
				setCruds(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, []);

	return (
		<div>
            Hello World
        </div>
	);
}

export default UserTable;
