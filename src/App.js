import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  const [repos, setRepos] = useState([]);

  // fetch github users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users`);
      const json = await response.json();
  
      //console.log("Users: " ,json);
      setUsers(json);
      setLoading(false);
  
    } catch (error) {
      setLoading(false);
      console.log("Error: " ,error);
    }
  }

  // Fetch repos on change of user selection
  useEffect(() =>{
    const fetchRepos = async () => {
  
      if (user !== ""){
        setLoading(true);
        try {
          const response = await fetch(`https://api.github.com/users/${user}/repos`);
          const json = await response.json();
          
          setRepos(json);
          setLoading(false);
            
        } catch (error) {
          console.log("Error: " ,error);  
          setLoading(false);      
        }
      }
    };

    fetchRepos();
  },[user]);

  return (
    <div>
      <h1>Fetch data from <span className="red">github</span> - async/await example</h1>
      <div>
        {loading && <h4><span className="green blink">Fetching data from Github...</span></h4>}
      </div>
      <div className="flex">
        <div className="flexChild">
          <button onClick={fetchUsers}>Fetch Github users</button>
        </div>
        <div className="flexChild">
          <select onChange={(e) => (setUser(e.target.value)
            )}>
            <option key={0} value="">Select User</option>
            {users.map((item) => (
              <option key={item.id} value={item.login}>{item.login}</option>
            ))}
          </select>
        </div>
        <div className="flexChild">
          You have selected: <span className="red selection">{user}</span>
        </div>
      </div>
      <br />
      <div>
        <span className="heading">Selected user repos:</span> 
      </div>
      <div>
        <br />
        {user !== "" && <table>
          <thead>
            <tr>
              <th>
                <span className="heading">Repo Name</span>
              </th>
              <th>
                <span className="heading">Description</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {repos.map((item) => (
              <tr key={item.id}>
                <td><a href={item.html_url} target="_blank" rel="noopener noreferrer">{item.name}</a></td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        }
      </div>
    </div>
  );
}

export default App;
