import { useEffect, useRef, useState } from 'react'
import { NAMES_LIST } from './consts'
import './App.css'
import { Button } from './Components/Button'

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

    const randomName =
      names.current[Math.floor(Math.random() * names.current.length)]
    setCurrentName(randomName)
  }

  const acceptName = () => {
    if (names.current.length <= 0) {
      setCurrentName('No more names available!')

      return
    }

    setAcceptedNames([...acceptedNames, currentName])
    names.current = names.current.filter((name) => name !== currentName)

    getRandomName()
  }

  const discardName = () => {
    names.current = names.current.filter((name) => name !== currentName)
    getRandomName()
  }

  const displayNames = () => {
    setShowApprovedNames(!showApprovedNames)
  }

  useEffect(getRandomName, [])

  return (
    <main className="main">
      {/* {JSON.stringify(names.current, null, 2)} */}
      <h1 className="title">Name Selector</h1>
      {showApprovedNames
        ? (
          <div className="card approvedNames">
            <h2>Approved Names</h2>
            {acceptedNames.length === 0
              ? <p>No names approved yet</p>
              : <ul>
                {acceptedNames.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            }
          </div>
          )
        : (
          <div className="card">
            <h2 className="name">{currentName}</h2>
          </div>
          )}
      {!showApprovedNames
        ? (
          <div className="buttonsContainer">
            <Button buttonClass="no" onClick={discardName} text={'No'} />
            <Button buttonClass="maybe" onClick={getRandomName} text={'maybe'} />
            <Button buttonClass="yes" onClick={acceptName} text={'Yes'} />
          </div>
          )
        : null}
      <Button buttonClass="approved" onClick={displayNames} text={showApprovedNames ? 'Keep looking' : 'Show Approved Names'} />
      {/* {JSON.stringify(acceptedNames, null, 2)} */}
    </main>
  )
}

export default App
