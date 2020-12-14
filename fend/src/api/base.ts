import { setError } from '../redux/actions'
import store from '../redux/store'

export const BASE_URL = 'http://localhost:8000'
export const DATASET_ENDPOINT = 'projects'

export async function post (url: string, data: object): Promise<any> {
  return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
    .then((res) => res.json())
    .catch((e) => {
      store.dispatch(setError(e))
    })
}

export async function get (url: string): Promise<any> {
  /* Returns an object from url on 200 response
   * Otherwise, error message is resolved
   */
  return new Promise((resolve, reject) => {
    fetch(url).then((res) => {
      if (res.status >= 400) {
        res.json().then(obj => reject(obj.details))
      } else {
        return res.json().then(obj => resolve(obj))
      }
    }).catch(e => {
      if (e.messsage === undefined) {
        reject(Error('services may be temporarily down, please see system administrators'))
      } else {
        reject(e.message)
      }
    })
  })
}
