import { useEffect, useRef, useState } from 'react'
import { NAMES_LIST } from './consts'
import './App.css'

function App () {
  const [currentName, setCurrentName] = useState('')
  const [acceptedNames, setAcceptedNames] = useState<string[]>([])
  const [showApprovedNames, setShowApprovedNames] = useState<boolean>(false)
  const names = useRef(NAMES_LIST)

  const getRandomName = () => {
    if (names.current.length <= 0) {
      setCurrentName('No more names available!')

      return
    }

    const randomName = names.current[Math.floor(Math.random() * names.current.length)]
    setCurrentName(randomName)
  }

  const acceptName = () => {
    if (names.current.length <= 0) {
      setCurrentName('No more names available!')

      return
    }

    setAcceptedNames([...acceptedNames, currentName])
    names.current = names.current.filter(name => name !== currentName)

    getRandomName()
  }

  const discardName = () => {
    names.current = names.current.filter(name => name !== currentName)
    getRandomName()
  }

  const displayNames = () => {
    setShowApprovedNames(!showApprovedNames)
  }

  useEffect(getRandomName, [])

  return (
    <main className='main'>
      {/* {JSON.stringify(names.current, null, 2)} */}
      <h1 className='title'>Name Selector</h1>
      {showApprovedNames
        ? (<div className='card approvedNames'>
            <h2>Approved Names</h2>
            <ul>
              {acceptedNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>)
        : (<div className='card'>
            <h2 className='name'>{currentName}</h2>
          </div>)
      }
      <div className='buttonsContainer'>
        <button className='no' onClick={discardName}>No</button>
        <button className='maybe' onClick={getRandomName}>Maybe</button>
        <button className='yes' onClick={acceptName}>Yes</button>
      </div>
      <button className='approved' onClick={displayNames}>Aproved names</button>
      {/* {JSON.stringify(acceptedNames, null, 2)} */}
    </main>
  )
}

export default App
