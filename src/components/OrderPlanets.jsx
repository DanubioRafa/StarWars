import React, { useContext } from 'react';
import contextStarWars from '../context/StarWarsContext';
import '../styles/orderplanets.scss';

export default function OrderPlanets() {
  const { orderPlanets,
    handleOnChangeOrder } = useContext(contextStarWars);
  const columnOptions = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  return (
    <section id="orderplanets" onChange={ handleOnChangeOrder }>
      <select name="columnOrder" data-testid="column-sort">
        { columnOptions.map((columnOption) => (
          <option key={ columnOption }>{columnOption}</option>
        ))}
      </select>
      <label htmlFor="radio-asc">
        Crescente
        <input
          onChange={ handleOnChangeOrder }
          id="radio-asc"
          name="sort"
          type="radio"
          value="ASC"
          data-testid="column-sort-input-asc"
        />
      </label>
      <label htmlFor="radio-desc">
        Decrescente
        <input
          onChange={ handleOnChangeOrder }
          id="radio-desc"
          name="sort"
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
        />
      </label>
      <button
        onClick={ orderPlanets }
        type="button"
        data-testid="column-sort-button"
      >
        Ordenar

      </button>
    </section>
  );
}
