
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { runFunction } from '../controllers/pythonController'

const TEST_MESSAGE = 'Hello from BEND!'

interface TestResponse {
    message: string;
}
function handleTestRoute (req: Request, res: Response<object>): void {
  runFunction<object>('Test.py', 'test', ['keyOne', 'keyTwo'], ['valueOne', 'valueTwo'])
    .then((data) => {
      return res.send(data)
    })
    .catch((e) => res.send({ message: e }))
}

export { handleTestRoute }
