import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import { isSearchRoutePayload, isTraceTrievealPayload, objectContainsKeys } from '../../fend/src/util/TypeUtil'
import { SearchItem } from '../../shared/Dataset'
import {
  getDatasetByName,
  getDatasetNames
} from './controllers/DatasetController'
import {
  makePredictionsForArtifact,
  searchForArtifact
} from './controllers/PredictionController'
import { handleTestRoute } from './controllers/TestRouteController'
import { getInitialTraceInformation } from './controllers/TraceController'
import { DATASET_MAIN_ROUTE, GET_DATASET_NAMES_ROUTE, GET_TRACE_ROUTE, SEARCH_SOURCE_ROUTE, SEARCH_TARGET_ROUTE, TEST_ROUTE } from './routes'

const app = express()

/*
 * MIDDLEWARE
 */
app.use(cors())
app.use(bodyParser.json())

/*
 * ENDPOINTS
 */
app.get(TEST_ROUTE, handleTestRoute)
app.get(GET_DATASET_NAMES_ROUTE, (req: Request, res: Response) =>
  getDatasetNames(res)
)
app.get(`${DATASET_MAIN_ROUTE}/:datasetName`, (req: Request, res: Response) =>
  getDatasetByName(res, req.params.datasetName)
)
app.post(SEARCH_SOURCE_ROUTE,
  async (req: Request, res: Response, next) => {
    const requiredFields = ['datasetName', 'query', 'limit']
    if (!objectContainsKeys(requiredFields, req.body)) { throw Error(`Missing One of Required Fields: ${requiredFields}`) }
    const data = searchForArtifact(
      req.body.datasetName,
      req.body.query,
      req.body.limit
    )
    handleError<SearchItem[]>(res, data)
  })

app.post(
  SEARCH_TARGET_ROUTE,
  async (req: Request, res: Response, next) => {
    if (!isSearchRoutePayload(req.body, true)) { throw Error(`Expected SearchRoutePayload receied: ${JSON.stringify(req.body)}`) }
    const dataPromise = makePredictionsForArtifact(
      req.body.datasetName,
      req.body.sourceType,
      req.body.sourceId,
      req.body.query,
      req.body.limit
    )
    handleError(res, dataPromise)
  })

app.post(GET_TRACE_ROUTE, async (req: Request, res: Response, next) => {
  if (!isTraceTrievealPayload(req.body, true)) {
    throw Error(
      `Expected SearchRoutePayload receied: ${JSON.stringify(req.body)}`
    )
  }
  const dataPromise = getInitialTraceInformation(
    req.body.dataset,
    req.body.sourceId,
    req.body.sourceType,
    req.body.targetId,
    req.body.targetType
  )
  handleError(res, dataPromise)
})

function handleError<T> (res: Response, data: Promise<T>) {
  data.then(data => res.send(data)).catch(e => { // convention is to reject with error
    res.status(400)
    res.send(e)
  })
}

export default app