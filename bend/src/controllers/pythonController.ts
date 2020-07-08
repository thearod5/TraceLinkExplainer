import { spawn } from 'child_process'
import path from 'path'

// TODO: Write function for making predictions
// TODO: Write function for making suggestions (Traced Artifacts)
/* TODO: Write script for making predictions
 * 1. Takes in dataset, type (e.g. Requirement), artifact-id
 * 2. Grabs that artifact and compares it to all the artifacts in the dataset
 * 3. Create datastructure for search predictions
 * 4. std out predictions json
 * 5. read in preditions
 */

const pathToRunner = path.join(__dirname, '..', 'python', 'ClassRunner.py')
export function runFunction<T> (
  className: string,
  functionName: string,
  ...functionArguments: any[]
): Promise<T> {
  return new Promise(function (resolve, reject) {
    const pyprog = spawn('python3', [
      pathToRunner,
      className,
      functionName,
      ...functionArguments
    ])

    pyprog.stdout.on('data', function (data) {
      resolve(JSON.parse(data.toString()))
    })

    pyprog.stderr.on('data', (data) => {
      reject(data.toString())
    })
  })
}
