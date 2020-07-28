
import request from 'supertest'
import app from '../App'
import { DATASET_MAIN_ROUTE, GET_DATASET_NAMES_ROUTE } from '../types'

test('GET dataset/names', () => {
  return new Promise((resolve, reject) => {
    return request(app).get(GET_DATASET_NAMES_ROUTE).then(res => {
      expect(res.status).toBe(200)
      expect(res.body).toContain('Drone')
      resolve()
    }).catch(reject)
  })
})

test('GET dataset/Drone', () => {
  return new Promise((resolve, reject) => {
    return request(app).get(DATASET_MAIN_ROUTE + '/Drone').then(res => {
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('summary')
      expect(res.body).toHaveProperty('artifacts')
      expect(res.body.artifacts.length).toBeGreaterThanOrEqual(1)
      resolve()
    }).catch(reject)
  })
})
