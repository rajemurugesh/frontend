import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
      const fetchUserDetails = async () => {
        try {
          const url = `https://gorest.co.in/public/v2/users/${id}`;
          const accessToken = "276286154fd86d13d2931acada16d082eb429ee338c6764a41e597d33c6ccec7"; // Replace with your actual access token
  
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
  
          if (!response.ok) {
            // Handle 404 error when user is not found
            if (response.status === 404) {
              console.log("User not found");
              // You can set state or display an error message here if needed
              return;
            }
            throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
          const { name, email, gender, status } = data;
          setState({
            name: name || "",
            email: email || "",
            gender: gender || "",
            status: status || "active",
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
  
      fetchUserDetails();
    }
  }, [id]);
  

  

  const handleCreateUser = async () => {
    try {
      if (!name || !email || !gender) {
        toast.error("Please provide values for each input field");
        return;
      }
  
      const url = "https://gorest.co.in/public/v2/users";
      const accessToken = "276286154fd86d13d2931acada16d082eb429ee338c6764a41e597d33c6ccec7"; // Replace with your actual access token
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
          email,
          gender,
          status,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create user. Please try again later.");
      }
  
      const data = await response.json();
      console.log("User created successfully:", data);
      setState(initialState);
      toast.success("Contact created successfully");
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(error.message || "Error creating user. Please try again later.");
    }
  };
  
  

  const handleUpdateUser = async () => {
    try {
      const accessToken = "276286154fd86d13d2931acada16d082eb429ee338c6764a41e597d33c6ccec7";
      const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
          email,
          gender,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setState(initialState);
      toast.success("Contact updated successfully");
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user. Please try again later.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (id) {
      handleUpdateUser();
    } else {
      handleCreateUser();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
