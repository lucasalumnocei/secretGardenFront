/*So, in this code snippet, we're working with React and ReactDOM.
We import the ReactDOM library, which is used to render React components to the web page.
Making our React app show up in the browser." 

An then we imported our main app component, which is named App. 
This component contains all the logic and structure of our application.

We created a root in the HTML document where our app will be injected. 
It's like reserving a special place for our React app to live. 
We select the HTML element with the id of 'root' for this purpose

And finally,we're telling React to render our App component inside that reserved 'root' element.
*/
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(

    <App />
)
