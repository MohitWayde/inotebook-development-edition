import React from 'react'
import Notes from './Notes';

import Login from './Login';

const Home = (props) => {
  return (
    <div>

      {localStorage.getItem('token') ? <Notes showAlert={props.showAlert} /> :
      <Login showAlert={props.showAlert} /> }
      {/* {localStorage.getItem('token') ? <Notes showAlert={props.showAlert} /> : <Link className="btn btn-primary  mx-1" to="/login">Log In</Link><Link className="btn btn-primary  mx-1" to="/signup">Sign Up</Link>} */}


      {/* <Notes showAlert={props.showAlert} /> */}
    </div>
  );
};

export default Home;
