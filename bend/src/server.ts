import cors from 'cors'
import express, { Request, Response } from 'express'
import { getDatasetByName, getDatasetNames } from './controllers/DatasetController'
import { handleTestRoute } from './controllers/TestRouteController'

const app = express()
const port = 5000

/*
 * MIDDLEWARE
 */
app.use(cors())

/*
 * ENDPOINTS
 */
app.get('/test', handleTestRoute)
app.get('/dataset/names', (req: Request, res: Response) => getDatasetNames(res))
app.get('/dataset/:datasetName', (req: Request, res: Response) =>
  getDatasetByName(res, req.params.datasetName)
)

/*
 * START SERVER
 */
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
