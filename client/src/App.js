import React from 'react';
import Signup from './components/signup/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div>
      <ToastContainer />
      <Signup />
    </div>
  )
}
