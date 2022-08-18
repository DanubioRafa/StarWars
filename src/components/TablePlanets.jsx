import React, { useContext, useEffect } from 'react';
import contextStarWars from '../context/StarWarsContext';

export default function TablePlanets() {
  const context = useContext(contextStarWars);
  const { historyOfFilter,
    setHistoryOfFilter, filteredPlanets, setFilteredPlanets, planets } = context;

  useEffect(() => {
    const fetchPlanets = async () => {
      const planetsJson = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json());

      await planetsJson.results.forEach((planet) => {
        delete planet.residents;
      });
      context.setFilteredPlanets(planetsJson.results);
      context.setPlanets(planetsJson.results);
    };
    fetchPlanets();
  }, []);

  const switchFilterNumeric = ([historyColumn, historyComparison, historyValue]) => {
    const valueNumericNumber = JSON.parse(historyValue);
    if (historyComparison === 'maior que') {
      setFilteredPlanets(filteredPlanets.filter((planet) => planet[historyColumn]
         > valueNumericNumber));
    } else if (historyComparison === 'menor que') {
      setFilteredPlanets(filteredPlanets.filter((planet) => planet[historyColumn]
         < valueNumericNumber));
    } else {
      setFilteredPlanets(filteredPlanets.filter((planet) => planet[historyColumn]
        === historyValue));
    }
  };

  const removeFilter = (usedFilter) => {
    const newFilter = historyOfFilter.filter((filter) => filter !== usedFilter);
    setFilteredPlanets([...planets]);
    setHistoryOfFilter(newFilter);
  };

  const removeAllFilters = () => {
    setFilteredPlanets([...planets]);
    setHistoryOfFilter([]);
  };

  useEffect(() => {
    historyOfFilter.forEach((history) => {
      switchFilterNumeric(history);
    });
  }, [historyOfFilter]);

  return (
    <div>
      <button
        type="button"
        onClick={ removeAllFilters }
        data-testid="button-remove-filters"
      >
        Remover Filtros
      </button>
      { historyOfFilter.map((history) => (
        <div data-testid="filter" key={ history[0] }>
          <p>{`${history[0]} ${history[1]} ${history[2]}`}</p>
          <button
            onClick={ () => removeFilter(history) }
            type="button"
          >
            Excluir filtro

          </button>
        </div>))}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            context.filteredPlanets
            && (context.filteredPlanets).map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
