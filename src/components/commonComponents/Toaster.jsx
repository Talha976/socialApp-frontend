import React from 'react';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toaster = ({ status, message }) => {
    toast[status](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  

export default Toaster;
