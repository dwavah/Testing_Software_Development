const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let orders = []; // Temporary in-memory orders storage

// Create Order
app.post('/api/orders', (req, res) => {
    const { orderId, customerName, totalAmount } = req.body;
    if (!orderId || !customerName || !totalAmount) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    const newOrder = { orderId, customerName, totalAmount };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// Get All Orders
app.get('/api/orders', (req, res) => {
    res.status(200).json(orders);
});

// Get Order by ID
app.get('/api/orders/:orderId', (req, res) => {
    const order = orders.find(o => o.orderId === req.params.orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
});

module.exports = app; // Export app for testing

// Start Server (only if not in test mode)
if (require.main === module) {
    app.listen(3000, () => console.log('Server running on port 3000'));
}
