import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import OrderList from '../components/OrderList';

// Mock global fetch
beforeEach(() => {
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('OrderList Component', () => {

    it('fetches and displays orders', async () => {
        const mockOrders = [
            { orderId: '123', customerName: 'John Doe', totalAmount: 50.99 },
            { orderId: '456', customerName: 'Jane Smith', totalAmount: 99.99 }
        ];

        // Mock fetch response
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockOrders
        });

        render(<OrderList />);

        // Check if orders are displayed
        const orderItems = await waitFor(() => screen.getAllByTestId('order-item'));

        expect(orderItems).toHaveLength(2);
        expect(orderItems[0]).toHaveTextContent('John Doe - $50.99');
        expect(orderItems[1]).toHaveTextContent('Jane Smith - $99.99');
    });

    it('displays error message on API failure', async () => {
        // Mock fetch failure
        fetch.mockResolvedValueOnce({
            ok: false
        });

        render(<OrderList />);

        const errorMessage = await waitFor(() => screen.getByTestId('error'));

        expect(errorMessage).toHaveTextContent('Failed to fetch orders');
    });
});
