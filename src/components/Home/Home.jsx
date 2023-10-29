//The imports I've made so that you can use the tools below.
import React from 'react';
import './Home-style.css';

/*I chose an image to be the background in Login/Registration/Home.
 This image hardly appears on the home page. */
const backgroundStyle = {
  backgroundImage: 'url("../../../public/leafs.png")',
  height: '100%',
  width: '100%',
};

/*Here we created a div with an image to cover the entire screen,
 a title with H3 and also a footer with 3 different sections with
  a title and description of how The Secret Garden works. */
function Home() {
  return (
    <div style={backgroundStyle}>
      <h3 className='howtoUse'>How to use the SecretGarden?</h3>
      <footer className="footer ">
        <div className="footer-section homeBackgroundRed">
          <div className="section-content">
            <h2>Make your Register</h2>
            <p>To create your account</p>
          </div>
        </div>

        <div className="footer-section homeBackgroundBlue ">
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
  );
}

//The React component called HOME was created to export the element.
export default Home;
