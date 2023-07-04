import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
  // Check if the code is executing in a browser environment
  const isBrowser = typeof window === 'undefined' ? false : true;

  return (
    <>
      {isBrowser && (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Define other routes here */}
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
