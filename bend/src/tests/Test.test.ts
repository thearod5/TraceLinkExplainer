
import { assert } from 'console';
import request from 'supertest';
import app from '../App';
import { testKeyOne, testKeyTwo, testValueOne, testValueTwo } from '../controllers/TestRouteController';
import { TEST_ROUTE } from '../routes';

test("test route", async (done) => {
  const res = await request(app).get(TEST_ROUTE)

  expect(res.status).toBe(200)
  expect(res.body).toHaveProperty(testKeyOne)
  expect(res.body[testKeyOne]).toStrictEqual(testValueOne)

  assert(testKeyTwo in res.body);
  assert(res.body[testKeyTwo] === testValueTwo)

  done();
});
