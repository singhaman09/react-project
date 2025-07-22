import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import soundReducer from '../redux/postSlice';
import PostDashboard from './PostDashboard';

const renderWithStore = (ui, { initialState, store = configureStore({ reducer: { sounds: soundReducer }, preloadedState: initialState }) } = {}) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('PostDashboard Component', () => {
  it('renders title and Add Sound button', () => {
    renderWithStore(<PostDashboard />);
    expect(screen.getByText(/Freesound API Dashboard/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Sound/i })).toBeInTheDocument();
  });

  it('shows loading state', () => {
    const initialState = { sounds: { sounds: [], loading: true, error: null } };
    renderWithStore(<PostDashboard />, { initialState });
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
