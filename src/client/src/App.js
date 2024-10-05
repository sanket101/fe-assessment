import React from 'react';
import VehicleData from './components/VehiclesData/VehiclesData';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Real-time Vehicle Dashboard</h1>
      <VehicleData />
    </div>
  );
};

export default App;
