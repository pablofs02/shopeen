import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import HamburgerMenuOffcanvas from '../components/HamburgerMenuOffcanvas';

test('Test case for testing hamburger menu', () => {
  const cartItems = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
    { id: 3, name: 'Item 3', price: 30 }
  ];

  const show: boolean = true;
  const handleClose: () => void = () => {};
  const location: any = "/ProyIU/";

  const { get } = render(<HamburgerMenuOffcanvas show={show} handleClose={handleClose} location={location} />);
  const cartElement = getByTestId('cart');
  expect(cartElement.children.length).toBe(cartItems.length);
});
