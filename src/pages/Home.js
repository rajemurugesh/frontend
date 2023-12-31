import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get");
      setData(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data. Please try again later.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id) => {
    if (window.confirm("Are you sure want to delete the contact?")) {
      axios
        .delete(`http://localhost:8000/api/delete/${id}`)
        toast.success("Contact Deleted Successfully");
        setTimeout(()=> loadData(), 500);
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
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className='btn btn-edit'>Edit</button>
                  </Link>
                  <Link to={`/view/${item.id}`}>
                    <button className='btn btn-view'>View</button>
                  </Link>

                  <button className='btn btn-delete' onClick={() => deleteContact(item.id)}>
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
