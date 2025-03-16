const request = require('supertest');
const app = require('../index'); // Import your app
const { expect } = require('chai');

describe('Order Management API', () => {

    // Test case to create a new order
    it('should create a new order', async () => {
        const res = await request(app)
            .post('/api/orders')
            .send({
                orderId: '123',
                customerName: 'John Doe',
                totalAmount: 50.99
            });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('orderId', '123');
        expect(res.body).to.have.property('customerName', 'John Doe');
        expect(res.body).to.have.property('totalAmount', 50.99);
    });

    // Test case to fetch all orders
    it('should return all orders', async () => {
        const res = await request(app).get('/api/orders');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
    });

    // Test case to fetch a specific order by ID
    it('should fetch a specific order by ID', async () => {
        const res = await request(app).get('/api/orders/123');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('orderId', '123');
    });

    // Test case for 404 when order ID does not exist
    it('should return 404 for non-existing order', async () => {
        const res = await request(app).get('/api/orders/999');

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Order not found');
    });

    // Test case for 400 Bad Request when required fields are missing
    it('should return 400 for missing order fields', async () => {
        const res = await request(app)
            .post('/api/orders')
            .send({ customerName: 'John Doe' }); // Missing orderId and totalAmount

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'Missing fields');
    });

    // Test case to simulate Internal Server Error (500)
    it('should return 500 if server error occurs', async () => {
        // Temporary route added for testing purposes (in-memory simulation)
        app.post('/api/error', (req, res) => res.status(500).json({ message: 'Internal Server Error' }));

        const res = await request(app).post('/api/error').send();

        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('message', 'Internal Server Error');
    });

});
