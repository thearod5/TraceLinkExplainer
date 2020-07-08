import { spawn } from 'child_process'

// TODO: Write function for making predictions
// TODO: Write function for making suggestions (Traced Artifacts)
/* TODO: Write script for making predictions
 * 1. Takes in dataset, type (e.g. Requirement), artifact-id
 * 2. Grabs that artifact and compares it to all the artifacts in the dataset
 * 3. Create datastructure for search predictions
 * 4. std out predictions json
 * 5. read in preditions
 */
function runFunction () {
  return new Promise(function (resolve, reject) {
    const pyprog = spawn('python', ['./../pypy.py'])

    pyprog.stdout.on('data', function (data) {
      resolve(data)
    })

    pyprog.stderr.on('data', (data) => {
      reject(data)
    })
  })
}
