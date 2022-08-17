import React, { useContext, useEffect } from 'react';
import contextStarWars from '../context/StarWarsContext';

export default function Filters() {
  const { planets,
    setFilteredPlanets,
    filterByName,
    filterByNumericValues: {
      valueNumeric,
      column,
      comparison,
    },
    filteredPlanets,
    handleOnChange,
    handleOnChangeNumeric } = useContext(contextStarWars);

  useEffect(() => {
    setFilteredPlanets(planets
      .filter((planet) => planet.name.includes(filterByName.name)));
  }, [filterByName.name]);

  const filterNumeric = () => {
    const valueNumericNumber = JSON.parse(valueNumeric);
    switch (comparison) {
    case 'maior que':
      setFilteredPlanets(filteredPlanets.filter((planet) => planet[column]
       > valueNumericNumber));
      break;

    case 'menor que':
      setFilteredPlanets(filteredPlanets.filter((planet) => planet[column]
       < valueNumericNumber));
      break;

    case 'igual a':
      setFilteredPlanets(filteredPlanets.filter((planet) => planet[column]
      === valueNumeric));
      break;

    default:
      break;
    }
  };

  return (
    <div>
      <input
        value={ filterByName.name }
        type="text"
        onChange={ handleOnChange }
        data-testid="name-filter"
      />
      <label htmlFor="column-filter">
        Coluna:
        <select
          value={ column }
          name="column"
          id="column-filter"
          data-testid="column-filter"
          onChange={ handleOnChangeNumeric }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Operador
        <select
          value={ comparison }
          name="comparison"
          id="comparison-filter"
          onChange={ handleOnChangeNumeric }
          data-testid="comparison-filter"
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <input
        value={ valueNumeric }
        name="value"
        type="number"
        onChange={ handleOnChangeNumeric }
        data-testid="value-filter"
      />
      <button
        type="button"
        onClick={ filterNumeric }
        data-testid="button-filter"
      >
        Filtrar

      </button>
    </div>
  );
}
