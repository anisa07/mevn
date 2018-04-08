/* eslint-disable semi,no-mixed-spaces-and-tabs */
const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Home } = require('./../models/home');

const homeTest = [{
	text: 'First test'
}, {
	text: 'Second test'
}];

beforeEach((done) => {
	Home.remove({})
		.then(() => Home.insertMany(homeTest))
		.then(() => {done()})
});

describe('POST /home', () => {
  it('should create a new text', (done) => {
    const text = 'test';
    request(app)
      .post('/home')
      .send({ text })
      .expect(200)
	    .expect((res) => {
		    expect(res.body.text).toBe(text);
	    })
	    .end((err, res) => {
	    	if (err)
	    		return done(err);

		    Home.find().then((todos) => {
			    expect(todos.length).toBe(3);
			    expect(todos[2].text).toEqual(text);
			    done();
		    }).catch((e) => done(e));
	    })
  });
});

describe('GET /home', () => {
	it('should return all home texts', (done) => {
		request(app)
			.get('/home')
			.expect(200)
			.expect((res) => {
				expect(res.body.data.length).toBe(2);
			})
			.end(done);
	})
});