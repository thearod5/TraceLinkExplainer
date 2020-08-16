import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import { Artifact } from '../../fend/src/shared/types/Dataset'
import { isSearchSourceRoutePayload, isSearchTargetRoutePayload } from '../../fend/src/shared/types/Search'
import { isTraceRetrievealPayload } from '../../fend/src/shared/types/Trace'
import {
  getDatasetByName,
  getDatasetNames
} from './controllers/DatasetController'
import { searchForSourceArtifact, searchForTracedArtifacts } from './controllers/SearchController'
import { handleTestRoute } from './controllers/TestRouteController'
import { getTrace } from './controllers/TraceController'
import { DATASET_MAIN_ROUTE, GET_DATASET_NAMES_ROUTE, GET_TRACE_ROUTE, SEARCH_SOURCE_ROUTE, SEARCH_TARGET_ROUTE, TEST_ROUTE } from './routes'

const app = express()

const INVALID_PAYLOAD = 'INVALID_PAYLOAD'

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
  async (req: Request, res: Response) => {
    if (!isSearchSourceRoutePayload(req.body)) {
      return sendError(res, INVALID_PAYLOAD)
    }
    const data = searchForSourceArtifact(req.body)
    handleError<Artifact[]>(res, data)
  })

app.post(
  SEARCH_TARGET_ROUTE,
  async (req: Request, res: Response) => {
    if (!isSearchTargetRoutePayload(req.body, true)) {
      return sendError(res, INVALID_PAYLOAD)
    }

    const dataPromise = searchForTracedArtifacts(
      req.body
    )
    handleError(res, dataPromise)
  })

app.post(GET_TRACE_ROUTE, async (req: Request, res: Response) => {
  if (!isTraceRetrievealPayload(req.body, true)) {
    return sendError(res, INVALID_PAYLOAD)
  }
  const dataPromise = getTrace(
    req.body
  )
  handleError(res, dataPromise)
})

function handleError<T>(res: Response, data: Promise<T>) {
  data.then(data => res.send(data)).catch(e => { // convention is to reject with error
    sendError(res, e)
  })
}

function sendError(res: Response, error: object | string) {
  res.status(400)
  if (typeof error === 'string') res.send({ error })
  else res.send(error)
}

export default app
