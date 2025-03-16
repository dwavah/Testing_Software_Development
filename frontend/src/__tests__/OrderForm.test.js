import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderForm from '../components/OrderForm';

describe('OrderForm Component', () => {
    it('should show error message if fields are empty', () => {
        render(<OrderForm onSubmit={jest.fn()} />);
        const submitButton = screen.getByTestId('submit-btn');

        fireEvent.click(submitButton);

        expect(screen.getByTestId('error')).toHaveTextContent('All fields are required!');
    });

    it('should call onSubmit with form data when all fields are filled', () => {
        const mockSubmit = jest.fn();
        render(<OrderForm onSubmit={mockSubmit} />);

        fireEvent.change(screen.getByTestId('order-id'), { target: { value: '123' } });
        fireEvent.change(screen.getByTestId('customer-name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByTestId('total-amount'), { target: { value: '100.50' } });

        fireEvent.click(screen.getByTestId('submit-btn'));

        expect(mockSubmit).toHaveBeenCalledWith({
            orderId: '123',
            customerName: 'John Doe',
            totalAmount: '100.50'
        });
    });

    it('should not show error if form is filled correctly and submitted', () => {
        render(<OrderForm onSubmit={jest.fn()} />);

        fireEvent.change(screen.getByTestId('order-id'), { target: { value: '123' } });
        fireEvent.change(screen.getByTestId('customer-name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByTestId('total-amount'), { target: { value: '100.50' } });

        fireEvent.click(screen.getByTestId('submit-btn'));

        expect(screen.queryByTestId('error')).toBeNull(); // Error should not be shown
    });
});
