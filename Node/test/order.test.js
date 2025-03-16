const request = require('supertest');
const app = require('../index');
const { expect } = require('chai');

describe('Order Management API', () => {
    it('should create a new order', async () => {
        const res = await request(app)
            .post('/api/orders')
            .send({ orderId: '123', customerName: 'John Doe', totalAmount: 50.99 });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('orderId', '123');
        expect(res.body).to.have.property('customerName', 'John Doe');
        expect(res.body).to.have.property('totalAmount', 50.99);
    });

    it('should return all orders', async () => {
        const res = await request(app).get('/api/orders');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
    });

    it('should fetch a specific order by ID', async () => {
        const res = await request(app).get('/api/orders/123');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('orderId', '123');
    });

    it('should return 404 for non-existing order', async () => {
        const res = await request(app).get('/api/orders/999');

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Order not found');
    });

    it('should return 400 for missing order fields', async () => {
        const res = await request(app).post('/api/orders').send({ customerName: 'John Doe' });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'Missing fields');
    });
});
