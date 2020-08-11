/* eslint-disable jest/expect-expect */

import request from 'supertest'
import {
  isSearchItem, SearchItem,
  SearchResponse,
  SearchRoutePayload
} from '../../../fend/src/shared/types/Search'
import app from '../App'
import { SEARCH_SOURCE_ROUTE, SEARCH_TARGET_ROUTE } from '../routes'

test('SEARCH source', () => {
  const TEST_LIMIT = 5
  const searchQuery = {
    datasetName: 'Drone',
    query: 'state transitions',
    limit: TEST_LIMIT
  }
  return testSearchFunction(SEARCH_SOURCE_ROUTE, searchQuery, TEST_LIMIT)
})

test('SEARCH source default', () => {
  const TEST_LIMIT = 5
  const searchQuery = {
    datasetName: 'Drone',
    query: '',
    limit: TEST_LIMIT
  }
  return testSearchFunction(SEARCH_SOURCE_ROUTE, searchQuery, TEST_LIMIT)
})

test('SEARCH target', () => {
  const TEST_LIMIT = 5
  const searchQuery: SearchRoutePayload = {
    datasetName: 'Drone',
    query: 'diagrams',
    limit: TEST_LIMIT,
    sourceId: 'RE-8',
    sourceType: 'Requirements'
  }
  return testSearchFunction(SEARCH_TARGET_ROUTE, searchQuery, TEST_LIMIT)
})
test('SEARCH default target', () => {
  const TEST_LIMIT = 2
  const searchQuery: SearchRoutePayload = {
    datasetName: 'Drone',
    query: '',
    limit: TEST_LIMIT,
    sourceId: 'RE-8',
    sourceType: 'Requirements'
  }
  return testSearchFunction(SEARCH_TARGET_ROUTE, searchQuery, TEST_LIMIT)
})

function testSearchFunction (route: string, payload: object, expectedLimit: number): Promise<SearchResponse> {
  return new Promise((resolve, reject) => {
    request(app).post(route).send(payload).then(res => {
      expect(res.status).toBe(200)
      expectSearchItems(res.body, expectedLimit)
      resolve()
    }).catch(reject)
  })
}

function expectSearchItems (body: any, expectedLimit: number) {
  expect(body).toHaveProperty('searchItems')
  expect(body.searchItems.length).toStrictEqual(expectedLimit)
  body.searchItems.forEach((element: SearchItem) => {
    expect(isSearchItem(element)).toStrictEqual(true)
  })
}
