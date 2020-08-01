import request from 'supertest'
import { isTraceInformation } from '../../../fend/src/util/TypeUtil'
import app from '../App'
import { GET_TRACE_ROUTE } from '../routes'

test('TRACE route', () => {
  const query = {
    datasetName: 'Drone',
    sourceType: 'Requirements',
    sourceId: 'RE-8',
    targetType: 'Classes',
    targetId: 'DroneFlightStateManager.java'
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
