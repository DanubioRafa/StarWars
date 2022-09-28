import React, { useContext, useEffect, useState } from 'react';
import contextStarWars from '../context/StarWarsContext';
import '../styles/filters.scss';

export default function Filters() {
  const { planets,
    setFilteredPlanets,
    filterByName,
    filterByNumericValues: {
      value,
      column,
      comparison,
    },
    setFilterByNumericValues,
    handleOnChange,
    handleOnChangeNumeric,
    setHistoryOfFilter,
  } = useContext(contextStarWars);

  const columnOptions = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [selectedColumns, setSelectedColumns] = useState([]);

  useEffect(() => {
    setFilteredPlanets(planets
      .filter((planet) => planet.name.includes(filterByName.name)));
  }, [filterByName.name]);

  const selectColumnOnClick = () => {
    setSelectedColumns([...selectedColumns, column]);
  };

  const filterNumeric = () => {
    selectColumnOnClick();
    setHistoryOfFilter((history) => [...history, [column, comparison, value]]);
    setFilterByNumericValues({
      value: '0', column: 'population', comparison: 'maior que',
    });
  };

  return (
    <section id="filters">
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
          { columnOptions.filter((option) => !selectedColumns.includes(option))
            .map((optionColumn) => (
              <option
                key={ optionColumn }
                data-testid={ optionColumn }
              >
                {optionColumn}
              </option>))}
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
        value={ value }
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
    </section>
  );
}
