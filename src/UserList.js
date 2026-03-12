import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
  const [listOfUser, setListOfUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from JSONPlaceholder API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setListOfUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Users</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <h1>User Directory</h1>
      <div className="user-grid">
        {listOfUser.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <h2>{user.name}</h2>
              <span className="username">@{user.username}</span>
            </div>
            
            <div className="user-details">
              <div className="detail-item">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="detail-item">
                <strong>Phone:</strong> {user.phone}
              </div>
              <div className="detail-item">
                <strong>Website:</strong> 
                <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                  {user.website}
                </a>
              </div>
            </div>

            <div className="company-section">
              <h3>Company</h3>
              <p><strong>{user.company.name}</strong></p>
              <p className="company-catchphrase">"{user.company.catchPhrase}"</p>
            </div>

            <div className="address-section">
              <h3>Address</h3>
              <p>
                {user.address.street}, {user.address.suite}<br />
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
