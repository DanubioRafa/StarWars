import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import contextStarWars from './StarWarsContext';

export default function StartWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [name, setName] = useState('');

  const handleOnChange = ({ target }) => {
    console.log(target.value);
    setName(target.value);
  };

  return (
    <contextStarWars.Provider
      value={ { planets,
        setPlanets,
        filterByName: {
          name,
        },
        filteredPlanets,
        handleOnChange,
        setFilteredPlanets } }
    >
      {children}
    </contextStarWars.Provider>
  );
}

StartWarsProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
