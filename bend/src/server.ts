import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
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
const app = express()
const port = 5000

/*
 * MIDDLEWARE
 */
app.use(cors())
app.use(bodyParser.json())

/*
 * ENDPOINTS
 */
app.get('/test', handleTestRoute)
app.get('/dataset/names', (req: Request, res: Response) =>
  getDatasetNames(res)
)
app.get('/dataset/:datasetName', (req: Request, res: Response) =>
  getDatasetByName(res, req.params.datasetName)
)
app.post(
  '/target',
  async (req: Request, res: Response, next) => {
    // TODO: Check for required fields used below
    const dataPromise = makePredictionsForArtifact(
      req.body.datasetName,
      req.body.sourceType,
      req.body.sourceId,
      req.body.query,
      req.body.limit
    )
    handleError(res, dataPromise)
  })

app.post('/source',
  async (req: Request, res: Response, next) => {
    // TODO: Check for required fields used below
    const data = searchForArtifact(
      req.body.datasetName,
      req.body.query,
      req.body.limit
    )
    handleError<SearchItem[]>(res, data)
  })

function handleError <T> (res: Response, data: Promise<T>) {
  data.then(data => res.send(data)).catch(e => { // convention is to reject with error
    res.status(400)
    res.send(e)
  })
}

/*
 * START SERVER
 */
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
