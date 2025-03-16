import React, { useEffect, useState } from 'react';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:3000/api/orders')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then((data) => setOrders(data))
            .catch(() => setError('Failed to fetch orders'));
    }, []);

    return (
        <div>
            <h2>Orders</h2>
            {error && <p data-testid="error">{error}</p>}
            <ul>
                {orders.map((order) => (
                    <li key={order.orderId} data-testid="order-item">
                        {order.customerName} - ${order.totalAmount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
