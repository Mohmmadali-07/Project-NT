import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CrudEdit(props) {
	const initialState = {
		companyName: "",
		phone: "",
		email: "",
		dob: "",
		country: "",
		state: "",
		city: "",
		pin: "",
	
	};
	const [crud, setCrud] = useState(initialState);

	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function updateCrud() {
				try {
					const response = await axios.get(`http://localhost:5000/api/cruds/${_id}`);
					setCrud(response.data);
				} catch (error) {
					console.log(error);
				}
			}
			updateCrud();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	function handleSubmit(event) {
		event.preventDefault();
		async function updateCrud() {
			try {
				const confirmed = window.confirm("Are you sure you want to Update?");
				if(confirmed){
					await axios.patch(`http://localhost:5000/api/cruds/${crud._id}`, crud);
				navigate(`/user/${crud._id}`);
				}
				
			} catch (error) {
				console.log(error);
			}
		}
		updateCrud();
	}

	function handleChange(event) {
		setCrud({ ...crud, [event.target.name]: event.target.value });
	}

	function handleCancel() {
		navigate(`/user/${crud._id}`);
	}

	return (
		<div className="container">
			<h1>Edit {crud.name}</h1>
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Name</label>
					<input
						name="companyName"
						type="text"
						value={crud.name}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Phone</label>
					<input
						name="phone"
						type="tel"
						required
						value={crud.mobile}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Email</label>
					<input
						name="email"
						type="email"
						required
						value={crud.email}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>dob</label>
					<input
						name="dob"
						type="text"
						required
						value={crud.dob}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Country</label>
					<input
						name="link"
						type="text"
						value={crud.country}
						onChange={handleChange}
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label>State</label>
					<input
						name="link"
						type="text"
						value={crud.state}
						onChange={handleChange}
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label>City</label>
					<textarea
						name="city"
						type ="text"
						value={crud.city}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Pincode</label>
					<textarea
						name="pin"
						type ="text"
						value={crud.pin}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				
				<div className="btn-group">
					<button type="submit" className="btn btn-primary">
						Update
					</button>
					<button
						type="button"
						onClick={handleCancel}
						className="btn btn-secondary"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

export default CrudEdit;
