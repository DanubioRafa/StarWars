import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import StartWarsProvider from '../context/StartWarsProvider';
import { mockAPI } from './mockAPI';

describe('Testa o componente TablePlanet', () => {
  jest.useFakeTimers();
  test('se a função fetch é executada quando o componente é montado', () => {
    render(<StartWarsProvider><App/></StartWarsProvider>);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAPI),
    });

    console.log(screen.logTestingPlaygroundURL());
    expect(global.fetch).toBeCalled();
  });
  test('se é possível filtrar pelo nome do planeta', () => {

  });
})


