import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './View.css';

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const accessToken = "276286154fd86d13d2931acada16d082eb429ee338c6764a41e597d33c6ccec7";
        const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <div style={{ marginTop: '150px' }}>
      <div className='card'>
        <div className='card-header'>
          <p>User Contact Detail</p>
        </div>
        <div className='container'>
          {user && user.id && (
            <>
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
            </>
          )}

          <Link to='/'>
            <div className='btn btn-edit'>Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
