
// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { runFunction } from '../controllers/pythonController'
import { FunctionArguments } from './types'

export const testKeyOne = 'keyOne'
export const testValueOne = 'valueOne'
export const testKeyTwo = 'keyTwo'
export const testValueTwo = 'valueTwo'

function handleTestRoute (req: Request, res: Response<object>): void {
  const functionArguments: FunctionArguments = {
    arguments: [[testKeyOne, 'keyTwo'], [testValueOne, testValueTwo]]
  }
  runFunction<object>('Test.py', 'test', functionArguments)
    .then((data) => {
      return res.send(data)
    })
    .catch((e) => res.send({ message: e }))
}

export { handleTestRoute }
