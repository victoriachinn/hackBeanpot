import { useState } from 'react'
import './App.css'
import HomePage from './HomePage'
import WelcomePage from './WelcomePage'
import BeanPopup from './Popup/BeanPopup'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <WelcomePage/>
      {/* <HomePage/> */}
      <BeanPopup/>
      </div>
    </>
  )
}

export default App
