/* eslint-disable jest/expect-expect */

import request from 'supertest'
import { isArtifact } from '../../../fend/src/shared/types/Dataset'
import { SearchItem, SearchResponse, SearchTargetRoutePayload } from '../../../fend/src/shared/types/Search'
import app from '../App'
import { SEARCH_SOURCE_ROUTE, SEARCH_TARGET_ROUTE } from '../routes'

/*
 * Source
 */

test('search : source : default : +', () => {
  const TEST_LIMIT = 5
  const searchQuery = {
    datasetName: 'Drone',
    query: '',
    limit: TEST_LIMIT
  }
  return testSearchFunction(SEARCH_SOURCE_ROUTE, searchQuery, (res) =>
    expectSearchItems(res.body, TEST_LIMIT)
  )
})

test('search : source : invalid query : -', () => {
  const TEST_LIMIT = 5
  const searchQuery = {
    datasetName: 'Drone',
    query: 'fuzzy = "state transitions"',
    limit: TEST_LIMIT
  }
  return testSearchFunction(SEARCH_SOURCE_ROUTE, searchQuery, (res) => {
    expect(res.status).toBe(400)
    expect(res.body.error).toContain('Value')
  })
})

test('search : source : query : +', () => {
  const TEST_LIMIT = 5
  const searchQuery = {
    datasetName: 'Drone',
    query: 'id is RE-8',
    limit: TEST_LIMIT
  }
  return testSearchFunction(SEARCH_SOURCE_ROUTE, searchQuery, (res) => {
    expect(res.status).toBe(200)
    expect(res.body.searchItems.length).toBe(1)
  })
})

test('search : source : query combination: +', () => {
  const TEST_LIMIT = 5
  const searchQuery = {
    datasetName: 'Drone',
    query: 'id is RE-8 AND type is Classes',
    limit: TEST_LIMIT
  }
  return testSearchFunction(SEARCH_SOURCE_ROUTE, searchQuery, (res) => {
    expect(res.status).toBe(200)
    expect(res.body.searchItems.length).toBe(0)
  })
})

/*
 * Target
 */

test('search : target : default : +', () => {
  const TEST_LIMIT = 5
  const searchQuery: SearchTargetRoutePayload = {
    datasetName: 'Drone',
    sources: [{ id: 'RE-8', type: 'Requirements' }],
    query: 'diagrams',
    limit: TEST_LIMIT
  }
  return testSearchFunction(SEARCH_TARGET_ROUTE, searchQuery, (res) =>
    expectSearchItems(res.body, TEST_LIMIT)
  )
})

function testSearchFunction (
  route: string,
  payload: object,
  validator: (res: request.Response) => void
): Promise<SearchResponse> {
  return new Promise((resolve, reject) => {
    request(app)
      .post(route)
      .send(payload)
      .then((res) => {
        validator(res)
        resolve()
      })
      .catch(reject)
  })
}

function expectSearchItems (body: any, expectedLimit: number) {
  expect(body).toHaveProperty('searchItems')
  expect(body.searchItems.length).toStrictEqual(expectedLimit)
  body.searchItems.forEach((element: SearchItem) => {
    expect(isArtifact(element)).toStrictEqual(true)
  })
}
