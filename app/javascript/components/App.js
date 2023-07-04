import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration'
import Login from './pages/Login';

const App = () => {
  // Check if the code is executing in a browser environment
  const isBrowser = typeof window === 'undefined' ? false : true;

  return (
    <>
      {isBrowser && (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign_up" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
