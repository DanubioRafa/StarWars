import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Header from './components/Header';
import OrderPlanets from './components/OrderPlanets';
import TablePlanets from './components/TablePlanets';
import './styles/app.scss';

function App() {
  return (
    <body>
      <Header />
      <Filters />
      <OrderPlanets />
      <TablePlanets />
    </body>
  );
}

export default App;
