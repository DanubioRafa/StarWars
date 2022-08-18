import React from 'react';
import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import App from '../App';
import StartWarsProvider from '../context/StartWarsProvider';
import { mockAPI } from './mockAPI';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('Testa o componente TablePlanet', () => {
  test('se a função fetch é executada quando o componente é montado', async () => {

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAPI),
    });

    await act(async () => render(<StartWarsProvider><App/></StartWarsProvider>));

    expect(global.fetch).toBeCalled();
    expect(screen.queryAllByTestId('planet-name')).toHaveLength(10);

  })
})

describe('Testa os filtros da Aplicação', () => {
  test('se o filtro de nome', async () => {

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAPI),
    });

    await act(async () => render(<StartWarsProvider><App/></StartWarsProvider>));

    const inputName = screen.getByRole('textbox');

    userEvent.type(inputName, 'Tatooine');

    expect(screen.queryAllByTestId('planet-name')).toHaveLength(1);
    expect(screen.queryAllByTestId('planet-name')[0]).toHaveTextContent('Tatooine');
  });

  test('se é aplicado o filtro population maior que 8000 e é possível removê-lo', async () => {

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAPI),
    });

    await act(async () => render(<StartWarsProvider><App/></StartWarsProvider>));

    const inputColumn = screen.getByRole('combobox', { name: /coluna:/i });
    const inputComparison = screen.getByRole('combobox', { name: /operador/i });
    const inputValue = screen.getByRole('spinbutton')
    const buttonFiltrar = screen.getByRole('button', { name: /filtrar/i });

    userEvent.click(buttonFiltrar);

    const buttonRemoveFiltro = screen.getByRole('button', { name: /excluir filtro/i });

    expect(screen.queryAllByTestId('planet-name')).toHaveLength(8);

    userEvent.click(buttonRemoveFiltro);

    expect(screen.queryAllByTestId('planet-name')).toHaveLength(10);


    console.log(screen.logTestingPlaygroundURL());
  });
})
