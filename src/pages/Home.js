import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = '276286154fd86d13d2931acada16d082eb429ee338c6764a41e597d33c6ccec7'; // Replace this with your actual access token

        // Set up the Axios interceptor to add the access token to each request
        axios.interceptors.request.use(
          (config) => {
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );

        const response = await axios.get('https://gorest.co.in/public/v2/users');
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Error fetching data. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete the contact?')) {
      try {
        await axios.delete(`https://gorest.co.in/public/v2/users/${id}`);
        toast.success('Contact Deleted Successfully');
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Error deleting contact. Please try again later.');
      }
    }
  };

  return (
    <div style={{ marginTop: '150px' }}>
      <Link to="/addContact">
        <button className="btn btn-contact">Add Contact</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>ID</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Gender</th>
            <th style={{ textAlign: 'center' }}>Status</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.status}</td>
              <td>
                <Link to={`/update/${user.id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <Link to={`/view/${user.id}`}>
                  <button className="btn btn-view">View</button>
                </Link>

                <button className="btn btn-delete" onClick={() => deleteContact(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
