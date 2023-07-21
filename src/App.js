import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import "./App.css";
import AddEdit from './pages/AddEdit';
import View from './pages/View';

function App() {
  return (
    <div className='App'>
      <ToastContainer position='top-center' />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addContact" element={<AddEdit />} />
        <Route path="/update/:id" element={<AddEdit />} />
        <Route path="/view/:id" element={<View />} />
       

      </Routes>
    </div>
  )
}

export default App