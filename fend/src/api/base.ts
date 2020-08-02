export const BASE_URL = "http://localhost:5000";
const TEST_ENDPOINT = "test";
export const DATASET_ENDPOINT = "dataset";

export async function testCall() {
  return await fetch([BASE_URL, TEST_ENDPOINT].join("/")).then((response) =>
    response.json()
  );
}

export async function post(url: string, data: object): Promise<any> {
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((res) => res.json())
    .catch((e) => {
      alert(e);
    });
}
