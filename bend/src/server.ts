import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
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
  '/target/:datasetName/:artifactType/:artifactId/:limit',
  async (req: Request, res: Response) =>
    res.send(
      await makePredictionsForArtifact(
        req.params.datasetName,
        req.params.artifactType,
        req.params.artifactId,
        req.body.query,
        req.params.limit
      )
    )
)
app.post('/source/:datasetName/:limit', async (req: Request, res: Response) =>
  res.send(
    await searchForArtifact(
      req.params.datasetName,
      req.body.query,
      req.params.limit
    )
  )
)

/*
 * START SERVER
 */
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
