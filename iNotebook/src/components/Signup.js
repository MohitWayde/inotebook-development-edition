import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
	const [credentials, setCredentials] = useState({ name: "" ,email: "", password: "", cpassword: "" })

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const {name, email, password } = credentials
		// API Call

		const response = await fetch("http://localhost:5000/api/auth/createuser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({ name, email, password }), // body data type must match "Content-Type" header
		});
		const json = await response.json();
		console.log(json);
		if (json.success) {
			// Save the auth-token & redirect
			localStorage.setItem('token', json.authtoken);
			navigate("/");
			props.showAlert("Account Created Successfully", "success");

		}
		else {
			props.showAlert("Invalid Details","danger");
		}


	}
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}
	return (
		<div>
			<form onSubmit={handleSubmit} className='container my-2'>
			<h2>Create a account to use iNoteBook</h2>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" placeholder="Enter name" required />
				</div>
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" required />
					<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" placeholder="Password" minLength={5} required />
				</div>
				<div className="form-group">
					<label htmlFor="cpassword">Confirm Password</label>
					<input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} id="cpassword" name="cpassword" placeholder="Confirm Password" minLength={5} required />
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}

export default Signup
