import { handleTestRoute } from './controllers/TestRouteController'
import express from 'express'
import cors from 'cors'

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

/*
 * START SERVER
 */
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
