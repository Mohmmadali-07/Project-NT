import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function UserDetails(props) {
	const [crud, setCrud] = useState({});

	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function getCrudById() {
				try {
					const response = await axios.get(`http://localhost:5000/api/cruds/${_id}`);
					setCrud(response.data);
				} catch (error) {
					console.log("error", error);
				}
			}
			getCrudById();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	async function handleDelete() {
		try {
			const confirmed = window.confirm("Are you sure you want to delete?");
			if(confirmed){
				await axios.delete(`http://localhost:5000/api/cruds/${_id}`);
				navigate("/admin");
			}
			
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="container">
			<h2>{crud.name}</h2>

			<p>
				<b>Phone</b>: <a href={`tel:+${crud.mobile}`}> {crud.mobile} </a>
			</p>

			<p>
				<b>Email</b>: {crud.email}
			</p>
			<p>
				<b>Date of Birth</b>: {crud.dob}
			</p>
			<p>
				<b>Country</b>: {crud.country}
			</p>
			<p>
				<b>State</b>: {crud.state}
			</p>
			<p>
				<b>City</b>: {crud.city}
			</p>
			<p>
				<b>Pincode</b>: {crud.pin}
			</p>
			
			
			
			<p>
				<small>
					<b>ID</b>: {crud._id}
				</small>
			</p>
			<div className="btn-group ">
				<Link to={`/user/${crud._id}/edit`} className="btn btn-primary">
					Edit
				</Link>
				<button onClick={handleDelete} className="btn btn-danger">
					Delete
				</button>
				<Link to="/admin" className="btn btn-secondary">
					Close
				</Link>
			</div>
			<hr />
		</div>
	);
}

export default UserDetails;
