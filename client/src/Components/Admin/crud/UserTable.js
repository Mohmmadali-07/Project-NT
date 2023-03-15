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
		<div className="container">
    <div className="table-responsive">
        <table className="table table-riped table-hover table-bordered container w-75 mt-5">
            <thead>
                <tr className="w-50">
                    <th className="w-20">Name</th>
                    <th className="w-20">Phone</th>
                    <th className="w-20">Email</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {cruds &&
                    cruds.map((crud) => {
                        return (
                            <tr key={crud._id}>
                                <td>{crud.name}</td>
                                <td>{crud.mobile}</td>
                                <td>{crud.email}</td>
                                <td className="w-10">
                                    <Link
                                        to={`/user/${crud._id}`}
                                        className="btn btn-warning"
                                    >
                                        <i className="fa-solid fa-eye"></i>
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        to={`/user/${crud._id}/edit`}
                                        className="btn btn-success"
                                    >
                                        <i className="fa-solid fa-user-pen"></i>

                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        to={`/user/${crud._id}/delete`}
                                        className="btn btn-danger"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    </div>
</div>
	);
}

export default UserTable;
