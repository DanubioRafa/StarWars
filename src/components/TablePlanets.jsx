import React, { useContext, useEffect } from 'react';
import contextStarWars from '../context/StarWarsContext';

export default function TablePlanets() {
  const context = useContext(contextStarWars);
  console.log(context);

  useEffect(() => {
    const fetchPlanets = async () => {
      const fetchedPlanets = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const planetsJson = await fetchedPlanets.json();
      (planetsJson.results).forEach((planet) => {
        delete planet.residents;
      });
      context.setFilteredPlanets(planetsJson.results);
      context.setPlanets(planetsJson.results);
    };
    fetchPlanets();
  }, []);

  return (
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
                <th>{planet.name}</th>
                <th>{planet.rotation_period}</th>
                <th>{planet.orbital_period}</th>
                <th>{planet.diameter}</th>
                <th>{planet.climate}</th>
                <th>{planet.gravity}</th>
                <th>{planet.terrain}</th>
                <th>{planet.surface_water}</th>
                <th>{planet.population}</th>
                <th>{planet.films}</th>
                <th>{planet.created}</th>
                <th>{planet.edited}</th>
                <th>{planet.url}</th>
              </tr>
            ))
        }
      </tbody>
    </table>
  );
}
