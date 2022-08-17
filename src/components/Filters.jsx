import React, { useContext, useEffect } from 'react';
import contextStarWars from '../context/StarWarsContext';

export default function Filters() {
  const context = useContext(contextStarWars);

  useEffect(() => {
    context.setFilteredPlanets(context.planets
      .filter((planet) => planet.name.includes(context.filterByName.name)));
  }, [context.filterByName.name]);

  return (
    <div>
      <input
        value={ context.filterByName.name }
        type="text"
        onChange={ context.handleOnChange }
        data-testid="name-filter"
      />
    </div>
  );
}
