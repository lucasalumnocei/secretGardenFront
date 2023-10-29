/*imports: I imported the libraries needed for the page, using Axios to make HTTP requests,
React's useState to handle local states,
react-router-dom's useNavigate to navigate between routes and other dependencies.*/

import axios from "axios";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';


/*
We use (props) to pass information from a parent component to a child component.
We used backgroundStyle, which is an object that contains CSS styles
to define the background of the component, to include a new learning I had these days
and apply it here in the project. In this case, it defines a background image*/
function Login({ isLoggedIn, setIsLoggedIn, setUser }) {
  const backgroundStyle = {
    backgroundImage: 'url("../../../public/leafs.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };


  const navigate = useNavigate();
// If the user is already logged in, navigate to the dashboard.
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn]);

  // I used React's useState to create a local state for me called formData. 
 // This state stores the values of the email and password that the user will enter.
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // This function handles changes in the input fields (email and password).
  // It updates the formData state when the user types into the fields.
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  /* This async function is called when the login button is clicked.
  It sends a POST request to the server with the user's email and password.
  If successful, it sets user data in cookies, updates the isLoggedIn state, and navigates to the dashboard.*/
  async function clickLoginButton(e) {
    e.preventDefault();
    axios.post("http://localhost:3000/api/login", {
      email: formData.email,
      password: formData.password
    }).then((result) => {
      let userData = JSON.stringify(result.data.user);
      Cookies.set("user", userData, { expires: 1 });
      Cookies.set("isLoggedIn", true, { expires: 1 });
       // call the handleLogin function from props
      setIsLoggedIn(true);
      setUser(userData);
      navigate("/dashboard");
    }).catch(err => {
      if (err.response?.status === 401) {
        alert("Incorrect email or password");
      }
    });
  } 

/* Component rendering: Here we are rendering the login component with a form and input fields for email and password.
When the form is submitted, the handleLogin function is called.
Check if the variable isLoggedIn is true, if it is, navigate to /dashboard, else, show the login page.*/
  return (
    (
      <div style={backgroundStyle}>
        <div className={styles['login-container']} >
          <form className={styles['login-form']} onSubmit={clickLoginButton}>
            <h1>Login</h1>
            <label htmlFor='email'>Email:</label>
            <input type="email" name='email' id='em1' onChange={handleChange} value={formData.email} />
            <label htmlFor='password'>Password:</label>
            <input type="password" name="password" id='pass1' onChange={handleChange} value={formData.password} />
            <input type="submit" value="Log in" />
          </form>
        </div>
        <footer className="footer registerBackground">
          <div className="footer-section homeBackgroundRed">
            <div className="section-content">
              <h2>Make your Register</h2>
              <p>To create your account</p>
            </div>
          </div>
          <div className="footer-section homeBackgroundBlue">
            <div className="section-content ">
              <h3>Make your Login</h3>
              <p>You will have your user with your datas.</p>
            </div>
          </div>
          <div className="footer-section homeBackgroundYellow">
            <div className="section-content">
              <h3>Save Your Books</h3>
              <p>Names, Authors and Make a comment...</p>
            </div>
          </div>
        </footer>
      </div>
    )
  );
}

//Here we are exporting the login for use elsewhere.
export default Login;
