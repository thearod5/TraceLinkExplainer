
const BASE_URL = 'http://localhost:5000'
const TEST_ENDPOINT = 'test'

async function testCall () {
  return await fetch([BASE_URL, TEST_ENDPOINT].join('/'))
    .then(response => response.json())
}

export { testCall }
