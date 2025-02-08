import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComp from './MapComp'

function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      </div>
      <h1>Couch n Bean</h1>
      <MapComp/>
    </>
  )
}

export default HomePage