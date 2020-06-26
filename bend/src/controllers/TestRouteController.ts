
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

const TEST_MESSAGE = 'Hello from BEND!'

interface TestResponse {
    message: string;
}
function handleTestRoute (req: Request, res: Response<TestResponse>): void {
  res.send({ message: TEST_MESSAGE } as TestResponse)
}

export { handleTestRoute }
