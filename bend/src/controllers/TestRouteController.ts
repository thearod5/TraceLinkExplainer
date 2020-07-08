
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { runFunction } from '../controllers/pythonController'

const TEST_MESSAGE = 'Hello from BEND!'

interface TestResponse {
    message: string;
}
function handleTestRoute (req: Request, res: Response<TestResponse>): void {
  runFunction('Test.py', 'test', 'Hello World from the test route')
    .then((data) => {
      return res.send({ message: data } as TestResponse)
    })
    .catch((e) => res.send({ message: e }))
}

export { handleTestRoute }
