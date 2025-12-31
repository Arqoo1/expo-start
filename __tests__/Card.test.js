import React from 'react';
import { render } from '@testing-library/react-native';
import Card from '../components/Card'; 

describe('Card Component', () => {
  const mockProps = {
    id: '1',
    name: 'Test Product',
    price: '99.99',
    description: 'This is a test product.',
    detailsLink: '/product',
    image: 'https://via.placeholder.com/150',
  };

  it('renders correctly with given props', () => {
    const { getByText, getByRole } = render(<Card {...mockProps} />);

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$99.99')).toBeTruthy();
    expect(getByText('This is a test product.')).toBeTruthy();
    expect(getByText('View Details')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(<Card {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
