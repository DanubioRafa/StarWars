import React from 'react';
import './App.css';
import Filters from './components/Filters';
import TablePlanets from './components/TablePlanets';

function App() {
  return (
    <div>
      <Filters />
      <TablePlanets />
    </div>
  );
}

export default App;
