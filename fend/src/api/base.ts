
export const BASE_URL = 'http://localhost:8000'
export const DATASET_ENDPOINT = 'projects'

export async function get (url: string): Promise<any> {
  /* Returns an object from url on 200 response
   * Otherwise, error message is resolved
   */
  return new Promise((resolve, reject) => {
    fetch(url).then((res) => {
      if (res.status >= 400) {
        return res.json().then(obj => reject(obj.details))
      } else {
        return res.json().then(obj => resolve(obj))
      }
    }).catch(e => {
      if (e.messsage === undefined) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('services may be temporarily down, please see system administrators')
      } else {
        reject(e.message)
      }
    })
  })
}
