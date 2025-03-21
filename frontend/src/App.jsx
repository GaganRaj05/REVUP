import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import EventDetails from './pages/Eventdetails';
import CarDetails from './pages/CarDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/rent/:carId" element={<CarDetails />} />
      </Routes>
    </Router>
  );
};

export default App;