import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from './Board';

// Test the initial state of the board
test('Board initializes with the correct number of lit cells', () => {
  const { getAllByRole } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0.5} />);
  const cells = getAllByRole('button'); 
  expect(cells.length).toBe(9);
  // Check that some cells are lit
  const litCells = cells.filter(cell => cell.classList.contains('Cell-lit'));
  expect(litCells.length).toBeGreaterThan(0);
});

// Test cell flipping
test('Clicking a cell flips it and its neighbors', () => {
  const { getAllByRole } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0} />);
  const cells = getAllByRole('button');
  // Assume the middle cell is at index 4
  fireEvent.click(cells[4]);
  // Check the middle cell and its neighbors to see if they are flipped
  expect(cells[4].classList).toContain('Cell-lit');
  expect(cells[1].classList).toContain('Cell-lit'); // Above
  expect(cells[3].classList).toContain('Cell-lit'); // Left
  expect(cells[5].classList).toContain('Cell-lit'); // Right
  expect(cells[7].classList).toContain('Cell-lit'); // Below
});

// Test the win condition
test('Displays "You Won!" message when all cells are unlit', () => {
  const { queryByText } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0} />);
  // Assuming that start with all cells unlit and simulate the winning condition
  const message = queryByText('You Won!');
  expect(message).toBeInTheDocument();
});
