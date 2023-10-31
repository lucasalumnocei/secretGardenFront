import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  // We define the backgroundStyle object to set the background image
  const backgroundStyle = {
    backgroundImage: 'url("https://i.ibb.co/RgBctHL/leafs-co-pia.png")',// Image where were uploaded to the https://es.imgbb.com/ website.
    backgroundSize: 'cover', // Makes the background image responsive
    backgroundRepeat: 'no-repeat',
  };

  /*The BACKEND_URL constant helps me with the application's execution environment.
   So the BACKEND_URL will contain the URL of the backend to which the requests will be made. */
  const BACKEND_URL =
    process.env.VITE_BACKEND_URL//
  
    const navigate = useNavigate();//used to navigate between pages

  // We create a state variable formData to store form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const axiosHeaders = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',//used when sending data in JSON format to the server.
        "Access-Control-Allow-Origin": "*",//I used it so that the web page can be accessed by an API from a different domain.
    }
  };

  /* We handle changes in form inputs. We extract the name and value properties
 from the event target and update the formData state object.*/
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // We handle form submission. This sends a POST request to the server with user data.
  // If the user is successfully registered, they are redirected to the login page.
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/api/register`, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      }, axiosHeaders)
      .then((res) => {
        if (res.data.status == '1') {
          alert('Existing user, try another email');
        } else {
          alert('User created, redirecting to login');
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log('Error in the request:' + error);
      });
  }

  // This is the component's return section, rendering the registration form.
  return (
    <div style={backgroundStyle}>
      <div className={styles['register-container']}>
        <form className={styles['register-form']} onSubmit={handleSubmit}>
          <h1>Register</h1>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            id='nam1'
            required
            onChange={handleChange}
          />

          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            id='em1'
            required
            onChange={handleChange}
          />

          <label htmlFor='contrasena'>Password:</label>
          <input
            type='password'
            name='password'
            id='pass1'
            required
            onChange={handleChange}
          />

          <input type='submit' value='Register' />
        </form>
      </div>

      <footer className='footer'>
        <div className='footer-section homeBackgroundRed'>
          <div className='section-content'>
            <h2>Make your Register</h2>
            <p>To create your account</p>
          </div>
        </div>

        <div className='footer-section homeBackgroundBlue'>
          <div className='section-content'>
            <h3>Make your Login</h3>
            <p>You will have your user with your datas.</p>
          </div>
        </div>

        <div className='footer-section homeBackgroundYellow'>
          <div className='section-content'>
            <h3>Save Your Books</h3>
            <p>Names, Authors and Make a comment...</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Register;