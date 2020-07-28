
import request from 'supertest';
import app from '../App';
import { GET_DATASET_NAMES_ROUTE } from '../routes';

test("test route", async (done) => {
  const res = await request(app).get(GET_DATASET_NAMES_ROUTE)

  expect(res.status).toBe(200)
  expect(res.body).toContain("Drone")
  done();
});
