/* eslint-disable semi,no-mixed-spaces-and-tabs */
const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Home } = require('./../models/home');

beforeEach((done) => {
	Home.remove({}).then(() => done())
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
			    expect(todos.length).toBe(1);
			    expect(todos[0].text).toBe(text);
			    done();
		    }).catch((e) => done(e));
	    })
  });
});
