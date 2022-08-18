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

    const selectColumn = screen.getByRole('combobox', { name: /coluna:/i });
    const selectComparison = screen.getByRole('combobox', { name: /operador/i });
    const inputValue = screen.getByRole('spinbutton')
    const buttonFiltrar = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(selectColumn, 'population');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '8000');
    userEvent.click(buttonFiltrar);

    const buttonRemoveFiltro = screen.getByRole('button', { name: /excluir filtro/i });

    expect(screen.queryAllByTestId('planet-name')).toHaveLength(7);

    userEvent.click(buttonRemoveFiltro);

    expect(screen.queryAllByTestId('planet-name')).toHaveLength(10);

  });

  test('se é aplicado o filtro diameter menor que 8000 e é possível removê-lo', async () => {

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAPI),
    });

    await act(async () => render(<StartWarsProvider><App/></StartWarsProvider>));

    const selectColumn = screen.getByRole('combobox', { name: /coluna:/i });
    const selectComparison = screen.getByRole('combobox', { name: /operador/i });
    const inputValue = screen.getByRole('spinbutton')
    const buttonFiltrar = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectComparison, 'menor que')
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '8000');
    userEvent.click(buttonFiltrar);

    const buttonRemoveFiltro = screen.getByRole('button', { name: /excluir filtro/i });

    expect(screen.queryAllByTestId('planet-name')).toHaveLength(2);

    userEvent.click(buttonRemoveFiltro);

    expect(screen.queryAllByTestId('planet-name')).toHaveLength(10);

  });

  test('se é aplicado o filtro rotation igual a 23 e é possível removê-lo', async () => {

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAPI),
    });

    await act(async () => render(<StartWarsProvider><App/></StartWarsProvider>));

    const selectColumn = screen.getByRole('combobox', { name: /coluna:/i });
    const selectComparison = screen.getByRole('combobox', { name: /operador/i });
    const inputValue = screen.getByRole('spinbutton')
    const buttonFiltrar = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '23');
    userEvent.click(buttonFiltrar);

    const buttonRemoveFiltro = screen.getByRole('button', { name: /excluir filtro/i });

    expect(screen.queryAllByTestId('planet-name')).toHaveLength(3);

    userEvent.click(buttonRemoveFiltro);

    expect(screen.queryAllByTestId('planet-name')).toHaveLength(10);

  });

  test('se é possível adicionar vários filtros e remover todos de uma vez', async () => {

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAPI),
    });

    await act(async () => render(<StartWarsProvider><App/></StartWarsProvider>));

    const selectColumn = screen.getByRole('combobox', { name: /coluna:/i });
    const selectComparison = screen.getByRole('combobox', { name: /operador/i });
    const inputValue = screen.getByRole('spinbutton')
    const buttonFiltrar = screen.getByRole('button', { name: /filtrar/i });
    const buttonRemoverFiltro = screen.getByRole('button', { name: /remover filtros/i })

    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '23');
    userEvent.click(buttonFiltrar);


    expect(screen.queryAllByTestId('planet-name')).toHaveLength(3);

    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectComparison, 'menor que')
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '8000');
    userEvent.click(buttonFiltrar);

    expect(screen.queryAllByTestId('planet-name')).toHaveLength(1);

    userEvent.click(buttonRemoverFiltro);

    expect(screen.queryAllByTestId('planet-name')).toHaveLength(10);

  });
})

describe('Testa o sort da aplicação', () => {
  test('se é possível ordenar na ordem crescente de população', async () => {

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAPI),
    });

    await act(async () => render(<StartWarsProvider><App/></StartWarsProvider>));

    const radioCrescente = screen.getByLabelText('Crescente');
    const buttonOrdenar = screen.getByRole('button', { name: /ordenar/i });
    const selectColumn = screen.getByTestId('column-sort');

    userEvent.selectOptions(selectColumn, 'population');
    userEvent.click(radioCrescente);
    userEvent.click(buttonOrdenar);

    console.log(screen.logTestingPlaygroundURL());
    expect(screen.queryAllByTestId('planet-name')[0]).toHaveTextContent('Yavin IV');
  })

    test('se é possível ordenar na ordem decrescente de população', async () => {
  
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockAPI),
      });
  
      await act(async () => render(<StartWarsProvider><App/></StartWarsProvider>));
  

      const radioDecrescente = screen.getByLabelText(/decrescente/i);
      const buttonOrdenar = screen.getByRole('button', { name: /ordenar/i });
      const selectColumn = screen.getByTestId('column-sort');
  
      userEvent.selectOptions(selectColumn, 'population');
      userEvent.click(radioDecrescente);
      userEvent.click(buttonOrdenar);
  
      console.log(screen.logTestingPlaygroundURL());
      expect(screen.queryAllByTestId('planet-name')[0]).toHaveTextContent('Coruscant');
    })

})
