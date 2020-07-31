import request from 'supertest'
import { isTraceInformation } from '../../../fend/src/util/TypeUtil'
import app from '../App'
import { GET_TRACE_ROUTE } from '../routes'

test('TRACE route', () => {
  const query = {
    dataset: 'Drone',
    sourceId: 'RE-8',
    sourceType: 'Requirements',
    targetId: 'DroneFlightStateManager.java',
    targetType: 'Classes'
  }
  return new Promise((resolve, reject) => {
    return request(app)
      .post(GET_TRACE_ROUTE)
      .send(query)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(isTraceInformation(res.body, true)).toStrictEqual(true)
        resolve()
      })
      .catch(reject)
  })
})
