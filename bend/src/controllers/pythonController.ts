import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { FunctionArguments } from './types'
/*
 * 1. Takes in dataset, type (e.g. Requirement), artifact-id
 * 2. Grabs that artifact and compares it to all the artifacts in the dataset
 * 3. Create datastructure for search predictions
 * 4. std out predictions json
 * 5. read in preditions
 */
const PYTHON_GENERAL_EXTERNAL_ERROR = 'PYTHON_GENERAL_EXTERNAL_ERROR'
const PATH_TO_RUNNER = path.join(__dirname, '..', 'python', 'ClassRunner.py')
const PATH_TO_TEMP_FOLDER = path.join(__dirname, '..', 'temp')
const PATH_TO_PYTHON = path.join(__dirname, '..', '..', 'venv', 'bin', 'python3')

export function runFunction<T> (
  className: string,
  functionName: string,
  functionArguments: FunctionArguments
): Promise<T> {
  return new Promise(function (resolve, reject) {
    const pyprog = spawn(PATH_TO_PYTHON, [
      PATH_TO_RUNNER,
      className,
      functionName,
      JSON.stringify(functionArguments)
    ])

    pyprog.stdout.on('data', function (data) {
      const pathToTempFile = data.toString().trim()
      const jsonContentPromise = readAndDeleteJsonFile<T>(pathToTempFile)
      jsonContentPromise.then(jsonContent => {
        if ('error' in jsonContent) {
          reject(jsonContent)
        } else {
          resolve(jsonContent)
        }
      }).catch(reject)
    })

    pyprog.stderr.on('data', (data) => {
      deleteFilesInDir(PATH_TO_TEMP_FOLDER).then(() => {
        const error = {
          error: PYTHON_GENERAL_EXTERNAL_ERROR,
          message: data.toString()
        }
        reject(error)
      })
    })
  })
}

function deleteFilesInDir (directory: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) throw err

      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) reject(err)
        })
      }
      resolve()
    })
  })
}

function readAndDeleteJsonFile<T> (pathToFile: string): Promise<T> {
  return new Promise((resolve, reject) => {
    readAndDeleteFile(pathToFile).then(jsonFileContent => {
      resolve(JSON.parse(jsonFileContent))
    }).catch(reject)
  })
}

function readAndDeleteFile (pathToFile: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(pathToFile)) {
      const fileContents = fs.readFileSync(pathToFile).toString()
      fs.unlinkSync(pathToFile) // delete temp file
      resolve(fileContents)
    } else {
      reject(new Error('Could not find file: ' + pathToFile))
    }
  })
}
