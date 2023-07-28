import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Home.css';

const Home = () => {
  const url = "https://gorest.co.in/public/v2/users";
  const accessToken = '276286154fd86d13d2931acada16d082eb429ee338c6764a41e597d33c6ccec7'; // Replace with your actual access token
  const [users, setUsers] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log('API Response data:', data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error("Error fetching data. Please try again later.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure want to delete the contact?")) {
      try {
        const accessToken = "276286154fd86d13d2931acada16d082eb429ee338c6764a41e597d33c6ccec7";
        const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete contact. Please try again later.");
        }
  
        toast.success("Contact Deleted Successfully");
        setTimeout(loadData, 500);
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error(error.message || "Error deleting user. Please try again later.");
      }
    }
  };
  

  return (
    <div style={{ marginTop: "150px" }}>
      <Link to="/addContact">
        <button className='btn btn-contact'>Add Contact</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID:</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Gender</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
                <td>
                  <Link to={`/update/${user.id}`}>
                    <button className='btn btn-edit'>Edit</button>
                  </Link>
                  <Link to={`/view/${user.id}`}>
                    <button className='btn btn-view'>View</button>
                  </Link>
                  <button className='btn btn-delete' onClick={() => deleteContact(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
