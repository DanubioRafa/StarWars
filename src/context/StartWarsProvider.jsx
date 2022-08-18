import React, { useState } from 'react';
import PropTypes from 'prop-types';
import contextStarWars from './StarWarsContext';

export default function StartWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueNumeric, setValueNumeric] = useState(0);
  const [historyOfFilter, setHistoryOfFilter] = useState([]);

  const handleOnChange = ({ target: { value } }) => {
    setName(value);
  };

  const handleOnChangeNumeric = ({ target }) => {
    switch (target.name) {
    case 'column':
      setColumn(target.value);
      break;
    case 'comparison':
      setComparison(target.value);
      break;
    case 'value':
      setValueNumeric(target.value);
      break;
    default:
      break;
    }
  };

  return (
    <contextStarWars.Provider
      value={ { planets,
        setPlanets,
        filteredPlanets,
        setFilteredPlanets,
        filterByName: { name },
        filterByNumericValues: { column, comparison, valueNumeric },
        setColumn,
        setComparison,
        setValueNumeric,
        handleOnChange,
        handleOnChangeNumeric,
        historyOfFilter,
        setHistoryOfFilter } }
    >
      {children}
    </contextStarWars.Provider>
  );
}

const childrenShape = {
  key: PropTypes.any,
  ref: PropTypes.any,
  props: PropTypes.object,
  _owner: PropTypes.any,
  _store: PropTypes.object,
};

StartWarsProvider.propTypes = {
  children: PropTypes.shape(childrenShape).isRequired,
};
