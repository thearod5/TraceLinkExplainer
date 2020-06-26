import React, { useEffect, useState } from 'react'
import '../styles/App.css'
import { testCall } from '../api/base'

function Home () {
  const [response, setResponse] = useState('loading ...')

  useEffect(() => {
    testCall().then(response => setResponse(response.message))
  }, [response])

  return (
    <p>{response}</p>
  )
}

export default Home
