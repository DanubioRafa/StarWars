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

  const isValueUnknown = (value1, value2) => {
    const valueAscLastIndex = 99999999999999;
    const valueDescLastIndex = -999999999;
    const unknown = order.sort === 'ASC' ? valueAscLastIndex : valueDescLastIndex;

    const valuePlanet1 = value1 === 'unknown' ? unknown
      : JSON.parse(value1);
    const valuePlanet2 = value2 === 'unknown' ? unknown
      : JSON.parse(value2);

    return [valuePlanet1, valuePlanet2];
  };

  const orderPlanets = () => {
    if (order.sort === 'ASC') {
      const orderedAscFilteredPlanets = filteredPlanets.sort((planet1, planet2) => {
        const [value1, value2] = isValueUnknown(
          planet1[order.columnOrder], planet2[order.columnOrder],
        );

        return (value1 - value2);
      });

      setFilteredPlanets([...orderedAscFilteredPlanets]);
    } else {
      const orderedDescFilteredPlanets = (filteredPlanets.sort((planet1, planet2) => {
        const [value1, value2] = isValueUnknown(
          planet1[order.columnOrder], planet2[order.columnOrder],
        );

        return (value2 - value1);
      }));

      setFilteredPlanets([...orderedDescFilteredPlanets]);
    }
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
        setHistoryOfFilter,
        orderPlanets } }
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
