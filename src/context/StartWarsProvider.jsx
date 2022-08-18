import React, { useState } from 'react';
import PropTypes from 'prop-types';
import contextStarWars from './StarWarsContext';

export default function StartWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [name, setName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState(
    { column: 'population', comparison: 'maior que', value: '0' },
  );
  const [historyOfFilter, setHistoryOfFilter] = useState([]);
  const [order, setOrder] = useState({ columnOrder: 'population', sort: 'ASC' });

  const handleOnChange = ({ target: { value } }) => {
    setName(value);
  };

  const handleOnChangeNumeric = ({ target }) => {
    const { value } = target;

    setFilterByNumericValues({ ...filterByNumericValues, [target.name]: value });
  };

  const handleOnChangeOrder = ({ target }) => {
    const { value } = target;

    setOrder({ ...order, [target.name]: value });
  };

  return (
    <contextStarWars.Provider
      value={ { planets,
        setPlanets,
        filteredPlanets,
        setFilteredPlanets,
        filterByName: { name },
        filterByNumericValues,
        setFilterByNumericValues,
        order,
        setOrder,
        handleOnChangeOrder,
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
