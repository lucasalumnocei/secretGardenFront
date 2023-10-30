import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './styles.css';

/*I used the useState Hooks to create two states: isLoggedIn (to track whether the user is logged in)
and user (to store user information). 
Both start as false and null, respectively. */
function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState();

  // This function is called when the user clicks the "Logout" button.
  function handleLogout() {
    // We remove user-related cookies and reset the states.
    Cookies.remove('user');
    Cookies.remove('isLoggedIn');
    setIsLoggedIn(false);
    setUser(null);
  }

  useEffect(() => {
    if (!user || !isLoggedIn) {
      // We check for user and isLoggedIn cookies, and if they exist, we update our states.
      const userCookie = Cookies.get('user')
        ? JSON.parse(Cookies.get('user'))
        : null;
      const isLoggedIn = Cookies.get('isLoggedIn')
        ? Cookies.get('isLoggedIn')
        : false;
      setUser(userCookie);
      setIsLoggedIn(isLoggedIn);
    }
  }, [user, isLoggedIn]);

  return (
    <div>
      <Router>
        <nav className='navbar'>
          <ul className='nav-list'>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            {/* If the user is not logged in, show the "Register" link */}
            {!isLoggedIn ? (
              <li>
                <Link to='/register'>Register</Link>
              </li>
            ) : null}
            {/* If the user is logged in, show "Dashboard" and "Logout" links */}
            {isLoggedIn ? (
              <>
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li onClick={handleLogout}>
                  <Link to='/home'>Logout</Link>
                </li>
              </>
            ) : (
              // If not logged in, show the "Sign in" link
              <li>
                <Link to='/login'>Sign in</Link>
              </li>
            )}
            <li className='user-dropdown'>
              {isLoggedIn && user && user.name ? (
                // Display a dropdown for the logged-in user
                <NavDropdown title={`Welcome, ${user.name}`}>
                  <NavDropdown.Item onClick={handleLogout}>
                    <Link to='/home'>Logout</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </li>
          </ul>
        </nav>

        {/*A little about the content of the page : Below the menu bar, we have the main content 
  of the page with titles, descriptions and an image section. */}
        <div>
          <div className='secretgardenTitle'>
            <h1 className='welcomeTitle'>Welcome to the Secret Garden</h1>
          </div>
          <p className='description'>Created by Lucas F.M</p>
          <h1>A great time to save your memories...or...</h1>
          <p>
            At the Secret Garden, you can store book titles and authors, as well
            as craft eerie narratives about your most mysterious and chilling
            secrets...
          </p>
        </div>
        <div className='containerImgandTitle'>
        <div className='image'>
          <img src="https://i.ibb.co/BBDJQYz/fairy-Tale.jpg" alt="fairy-Tale" border="0"/>
          <img src="https://i.ibb.co/Q6fGJVD/it.jpg" alt="it" border="0"/>
          <img src="https://i.ibb.co/xF3NV6y/holy.png" alt="holy" border="0"/>
          <img src="https://i.ibb.co/XyCQN9D/billy-Summers-co-pia.png" alt="billy-Summers-co-pia" border="0"/>
          </div>
        </div>

        {/*These are our application routes, mapping paths to corresponding components.
       For example, "/home" leads to a component called Home, etc...
      The Dashboard component receives the user object as a property. */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/login'
            element={
              <Login
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
              />
            }
          />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
