const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app/server');
const Order = require('../app/models/order');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Order API Tests', () => {
  // Clean up before each test
  beforeEach(async () => {
    await Order.deleteMany({});
  });

  it('should create a new order', (done) => {
    const order = { product: 'Laptop', quantity: 1, price: 1000 };
    chai.request(app)
      .post('/api/orders')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.include(order);
        done();
      });
  });

  it('should fetch all orders', (done) => {
    const order = new Order({ product: 'Phone', quantity: 2, price: 500 });
    order.save().then(() => {
      chai.request(app)
        .get('/api/orders')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').that.is.not.empty;
          done();
        });
    });
  });
});
