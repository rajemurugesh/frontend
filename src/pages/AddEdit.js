import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddEdit.css";

const initialState = {
  name: "",
  email: "",
  gender: "",
  status: "active",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, gender, status } = state;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://gorest.co.in/public/v2/users/${id}`)
        .then((resp) => {
          const { name, email, gender, status } = resp.data;
          setState({
            name: name || "",
            email: email || "",
            gender: gender || "",
            status: status || "active",
          });
        })
        .catch((err) => console.error("Error fetching user details:", err));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !gender) {
      toast.error("Please provide values for each input field");
      return;
    }

    if (!id) {
      // Creating a new user
      axios
        .post("https://gorest.co.in/public/v2/users", {
          name,
          email,
          gender,
          status,
        })
        .then((response) => {
          setState(initialState);
          toast.success("Contact Added Successfully");
        })
        .catch((err) => {
          console.error("Error creating user:", err);
          toast.error("Error creating user. Please try again later.");
        });
    } else {
      // Updating an existing user
      axios
        .put(`https://gorest.co.in/public/v2/users/${id}`, {
          name,
          email,
          gender,
          status,
        })
        .then(() => {
          setState(initialState);
          toast.success("Contact Updated Successfully");
        })
        .catch((err) => {
          console.error("Error updating user:", err);
          toast.error("Error updating user. Please try again later.");
        });
    }

    setTimeout(() => navigate("/"), 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name ..."
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email ..."
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor="gender">Gender</label>
        <input
          type="text"
          id="gender"
          name="gender"
          placeholder="Your Gender ..."
          value={gender}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
