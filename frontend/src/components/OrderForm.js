import React, { useState } from 'react';

const OrderForm = ({ onSubmit }) => {
    const [orderId, setOrderId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!orderId || !customerName || !totalAmount) {
            setError('All fields are required!');
            return;
        }
        setError('');
        onSubmit({ orderId, customerName, totalAmount });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Place Order</h2>
            {error && <p data-testid="error">{error}</p>}

            <input
                type="text"
                placeholder="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                data-testid="order-id"
            />
            <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                data-testid="customer-name"
            />
            <input
                type="number"
                placeholder="Total Amount"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                data-testid="total-amount"
            />
            <button type="submit" data-testid="submit-btn">Submit</button>
        </form>
    );
};

export default OrderForm;
