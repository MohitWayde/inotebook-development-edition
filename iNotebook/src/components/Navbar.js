import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navbar = (props) => {
	let location = useLocation();
	let navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate("/login");
		props.showAlert("Logged out successfully", "success");
	}

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link className="navbar-brand" to={localStorage.getItem('token') ? "/" : "/login"}>iNoteBook</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
							<Link className="nav-link" to={localStorage.getItem('token') ? "/" : "/login"}>Home <span className="sr-only">(current)</span></Link>
						</li>
						<li className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}>
							<Link className="nav-link" to="/about">About</Link>
						</li>
					</ul>


					{!localStorage.getItem('token') ? <form className="form-inline my-2 my-lg-0">
						{/* <p>Hello{user}</p> */}
						<Link className="btn btn-primary btn-sm mx-1" to="/login">Log In</Link>
						<Link className="btn btn-primary btn-sm mx-1" to="/signup">Sign Up</Link>
					</form> : <button className="btn btn-primary" onClick={handleLogout}>Log Out</button>}
				</div>
			</nav>
		</div>
	)
}

export default Navbar
