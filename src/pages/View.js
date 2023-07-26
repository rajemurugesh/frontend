import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './View.css';

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://gorest.co.in/public/v2/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [id]);

  return (
    <div style={{ marginTop: '150px' }}>
      <div className='card'>
        <div className='card-header'>
          <p>User Contact Detail</p>
        </div>
        <div className='container'>
          <strong>ID:</strong>
          <span>{user.id}</span>
          <br />
          <br />

          <strong>Name:</strong>
          <span>{user.name}</span>
          <br />
          <br />

          <strong>Email:</strong>
          <span>{user.email}</span>
          <br />
          <br />

          <strong>Gender:</strong>
          <span>{user.gender}</span>
          <br />
          <br />

          <strong>Status:</strong>
          <span>{user.status}</span>
          <br />
          <br />

          <Link to='/'>
            <div className='btn btn-edit'>Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
