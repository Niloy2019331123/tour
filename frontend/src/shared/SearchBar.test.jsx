import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const renderSearchBar = () => {
    return render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    renderSearchBar();
  });

  test('renders search form', () => {
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('renders all search inputs', () => {
    expect(screen.getByPlaceholderText(/Where are you going/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/When/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/How many/i)).toBeInTheDocument();
  });

  test('search button is present', () => {
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('form submission with valid data', () => {
    const locationInput = screen.getByPlaceholderText(/Where are you going/i);
    const dateInput = screen.getByPlaceholderText(/When/i);
    const guestsInput = screen.getByPlaceholderText(/How many/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(locationInput, { target: { value: 'Paris' } });
    fireEvent.change(dateInput, { target: { value: '2024-12-25' } });
    fireEvent.change(guestsInput, { target: { value: '2' } });

    expect(locationInput.value).toBe('Paris');
    expect(dateInput.value).toBe('2024-12-25');
    expect(guestsInput.value).toBe('2');

    fireEvent.click(searchButton);
    // Add assertions for form submission behavior
  });

  test('form validation', () => {
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
    
    // Add assertions for validation messages
    expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument();
  });
}); 