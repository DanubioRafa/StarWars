import React from 'react';
import './App.css';
import Filters from './components/Filters';
import OrderPlanets from './components/OrderPlanets';
import TablePlanets from './components/TablePlanets';

function App() {
  return (
    <div>
      <Filters />
      <OrderPlanets />
      <TablePlanets />
    </div>
  );
}

export default App;
