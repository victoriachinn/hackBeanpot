import { useState } from 'react'
import './App.css'
import HomePage from './HomePage'
import WelcomePage from './WelcomePage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <WelcomePage/>
      {/* <HomePage/> */}
      </div>
    </>
  )
}

export default App
