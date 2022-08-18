import React, { useContext } from 'react';
import contextStarWars from '../context/StarWarsContext';

export default function OrderPlanets() {
  const { filteredPlanets,
    setFilteredPlanets,
    order: { sort, columnOrder },
    handleOnChangeOrder } = useContext(contextStarWars);
  const columnOptions = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const orderPlanets = () => {
    if (sort === 'ASC') {
      const orderedAscFilteredPlanets = filteredPlanets.sort((planet1, planet2) => (
        JSON.parse(planet1[columnOrder]) - JSON.parse(planet2[columnOrder])
      ));

      setFilteredPlanets(orderedAscFilteredPlanets);
    } else {
      const orderedDescFilteredPlanets = (filteredPlanets.sort((a, b) => (
        JSON.parse(b[columnOrder]) - JSON.parse(a[columnOrder])
      )));

      setFilteredPlanets(orderedDescFilteredPlanets);
    }
  };

  return (
    <div onChange={ handleOnChangeOrder }>
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
    </div>
  );
}
