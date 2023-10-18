import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';

const Login = (props) => {
	const [credentials, setCredentials] = useState({ email: "", password: "" })
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// API Call

		const response = await fetch("http://localhost:5000/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({ email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
		});
		const json = await response.json();
		console.log(json);
		if (json.success) {
			// Save the auth-token & redirect
			localStorage.setItem('token', json.authtoken);
			props.showAlert("Logged in successfully","success");
			navigate("/");
		}
		else {
			props.showAlert("Invalid Credentials", "danger");
		}


	}
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}
	return (
		<div>
			<form onSubmit={handleSubmit} className='container my-2'>
			<h2>Login to use iNoteBook</h2>
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
					<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" placeholder="Password" />
				</div>

				<button type="submit" className="btn btn-primary">Sign in</button>
				<Link className="mx-1" to="/signup">or Create a New Account</Link>
			</form>
		</div>
	)
}

export default Login
