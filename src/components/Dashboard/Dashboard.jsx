import axios from 'axios'; // Import Axios for making HTTP requests.
import Cookies from 'js-cookie'; // Import Cookies library for handling cookies.
import { useEffect, useState } from 'react'; // Import useEffect and useState from React for managing component side-effects and state.
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation.
import './Dashboard.css'; // Imported a CSS file for styling the Dashboard component.


//// Define a background style object for the dashboard.
function Dashboard() {
  const backgroundStyle = {
    backgroundImage: 'url("../../../public/leafs.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const navigate = useNavigate();
// Component states to control the item list and input fields.
  const [items, setItems] = useState([]);// List of items
  const [itemName, setItemName] = useState('');// Name of the item
  const [itemAuthor, setItemAuthor] = useState('');// Author of the item
  const [itemDescription, setItemDescription] = useState('');// Description of the item
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);// Index of the selected item


  /*Effect that runs when the component is mounted
  and we called the checkUserLogin() function to verify the user's login status.*/
  useEffect(() => {
    checkUserLogin();
  }, []);



  function checkUserLogin() {
    if (Cookies.get('isLoggedIn')) { // If the 'isLoggedIn' cookie exists, the user is logged in.
        recoverUserItems();   // Call the recoverUserItems() function to load the user's items.
    } else {// If the 'isLoggedIn' cookie doesn't exist, the user is not authenticated.
      navigate('/login');// Redirect the user to the login page.
    }
  }


/*I done this part to check if all the required input fields (itemName, itemAuthor, and itemDescription) have non-empty values.
If any of them is empty, we don't want to proceed with adding an item.
Check if there is a 'user' cookie set. If it exists, parse it as JSON. Otherwise, set 'user' to null. */
  async function handleAddItem() {
    if (itemName && itemAuthor && itemDescription) {
      const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
/*I Created a new object 'newItem' to represent the item to be added. 
//It includes the item's name, author, description, and the user's ID.
// (above)Clear the input fields by setting their values to empty strings.*/
      const newItem = {
        name: itemName,
        author: itemAuthor,
        description: itemDescription,
        user_id: user.id,
      };
      setItemName('');
      setItemAuthor('');
      setItemDescription('');

/*Call the 'saveItem' function to save the new item to the server.
The function returns the 'id' of the newly added item.
Update the 'newItem' object with the 'id' of the newly added item.
Add the 'newItem' to the 'items' array in the component's state.*/
      let id = await saveItem(newItem);
      newItem.id = id;
      setItems([...items, newItem]);
    }
  }

  const handleEditItem = async () => {
    if (selectedItemIndex !== null) { // If an item is selected (its index is not null), proceed with editing.
      const updatedItems = [...items];// Create a copy of the current items array to work with.
      updatedItems[selectedItemIndex] = {  // Update the selected item with the new values from the input fields.
        name: itemName,
        author: itemAuthor,
        description: itemDescription,
        user_id: items[selectedItemIndex].user_id,
        id: items[selectedItemIndex].id,
      };
        // Clear the input fields after editing.
      setItemName('');
      setItemAuthor('');
      setItemDescription('');
      setSelectedItemIndex(null);// Reset the selected item index to null to indicate no item is selected for editing.
      await updateUserItems(updatedItems[selectedItemIndex]);// Call the 'updateUserItems' function to update the item on the server.
      setItems(updatedItems);// Update the component's state with the edited items.
    }
  };
  
  // Asynchronously send a POST request to the server with the new item data.
  async function saveItem(newItem) {
    return await axios
      .post('http://localhost:3000/api/dashboard/items', newItem)
      .then((response) => {
        console.log( // If the request is successful, log a message and return the ID of the newly added item.
          'Form data sent successfully to the server:',
          response.data
        );
        return response.data.id;
      })
      .catch((error) => {
        console.error(// If an error occurs during the request, log an error message.
          'Error sending form data to the server:',
          error
        );
      });
  }


// Check if an item is selected for deletion (its index is not null).
  async function handleDeleteItem() {
    if (selectedItemIndex !== null) {
      const response = await deleteUserItems(items[selectedItemIndex].id);
      if (response) { // If the deletion request is successful (response exists):
        const updatedItems = items.filter((_, i) => i !== selectedItemIndex);// Create a new array of items excluding the one to be deleted.
        setItems(updatedItems);// Update the component's state with the new list of items.
        setItemName('');
        setItemAuthor('');
        setItemDescription('');
        setSelectedItemIndex(null);// Clear input fields and reset the selected item index.
      }
    }
  }

  function selectItem(index) {
/* Function to select an item for editing.
 Update the state to display the selected item's details in the input fields.*/
    setSelectedItemIndex(index);
    setItemName(items[index].name);
    setItemAuthor(items[index].author);
    setItemDescription(items[index].description);
  }

// Asynchronously recover the user's items from the server.
  async function recoverUserItems() {
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    await axios
      .get(`http://localhost:3000/api/dashboard/items/${user.id}`)
      .then((response) => {/// If the request is successful, log a message and update the component's state with the retrieved items.
        console.log('User items recovered successfully:', response.data);
        if (response.data.items.length > 0) {
          setItems(response.data.items);
        } else {
          setItems([]);
        }
      })
      .catch((error) => { // If an error occurs during the request, log an error message.
        console.error('Error recovering user items:', error);
      });
  }
  
// Asynchronously delete a user's item with the provided ID.
  async function deleteUserItems(itemId) {
    return await axios
      .delete(`http://localhost:3000/api/dashboard/items/${itemId}`)
      .then((response) => {// If the deletion request is successful, log a message and return the response data.
        console.log('User items deleted successfully:', response.data);
        return response.data;
      })
      .catch((error) => { // If an error occurs during the request, log an error message.
        console.error('Error deleting user items:', error);
      });
  }
// Asynchronously update a user's item with new data.
  async function updateUserItems(updatedItem) {
    return await axios
      .patch(
        `http://localhost:3000/api/dashboard/items/${updatedItem.id}`,
        updatedItem
      )
      .then((response) => {// If the update request is successful, log a message and return the response data.
        console.log('User items updated successfully:', response.data);
        return response.data;
      })
      .catch((error) => {// If an error occurs during the request, log an error message.
        console.error('Error updating user items:', error);
      });
  }

  /*This part of the code is designed to represent the structure of the dashboard interface,
   allowing users to add, edit and delete books from their list. 
   The conditional presentation of the buttons ensures that the appropriate actions are available
   based on the user's interactions. */
  return (
    <div className='dashboardBackground' style={backgroundStyle}>
      <div className='dashboard-container'>
        <h1>Your Books</h1>
        <h4>Insert the Book name</h4>
        <input
          type='text'
          placeholder='Add a book name'
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <h4>Insert the Author name</h4>
        <input
          type='text'
          placeholder='Add a author name'
          value={itemAuthor}
          onChange={(e) => setItemAuthor(e.target.value)}
        />
        <h4>Write a description of the book</h4>
        <textarea
          placeholder='Add Description about the book'
          value={itemDescription}
          onChange={(e) => {
            if (e.target.value.length <= 255) {
              setItemDescription(e.target.value);
            }
          }}
        />

{/*A table for displaying a list of books. It's set to take the full width of its container and has a fixed table layout.
Inside the table, there's a header row (<thead>) with three columns: Title, Author, and Description. */}

        <table style={{ width: '100%', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: '33.33%' }}>Title</th>
              <th style={{ width: '33.33%' }}>Author</th>
              <th style={{ width: '33.33%' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                onClick={() => selectItem(index)}
                className={selectedItemIndex === index ? 'selected' : ''}
              >
                <td style={{ width: '33.33%', textAlign: 'center' }}>
                  {item.name}
                </td>
                <td style={{ width: '33.33%', textAlign: 'center' }}>
                  {item.author}
                </td>
                <td style={{ width: '33.33%', textAlign: 'center' }}>
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

            {/*If no item is selected (selectedItemIndex is null), display an "Add" button. */}
        {selectedItemIndex === null ? (
          <button onClick={handleAddItem}>Add</button>
        ) : (
          // If an item is selected, display "Edit," "Delete," and "Add" buttons using a fragment.
          <>
            <button onClick={handleEditItem}>Edit</button>
            <button onClick={handleDeleteItem}>Delete</button>
            <button onClick={handleAddItem}>Add</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
