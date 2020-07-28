
import { assert } from 'console'
import request from 'supertest'
import app from '../App'
import { testKeyOne, testKeyTwo, testValueOne, testValueTwo } from '../controllers/TestRouteController'
import { TEST_ROUTE } from '../types'

test('test route', () => {
  return new Promise((resolve, reject) => {
    return request(app).get(TEST_ROUTE).then(res => {
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty(testKeyOne)
      expect(res.body[testKeyOne]).toStrictEqual(testValueOne)

      assert(testKeyTwo in res.body)
      assert(res.body[testKeyTwo] === testValueTwo)

      resolve()
    }).catch(reject)
  })
})
