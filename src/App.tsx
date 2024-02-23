import { useEffect, useRef, useState } from 'react'
import { NAMES_LIST } from './consts'
import { Button } from './Components/Button'
import styled, { keyframes } from 'styled-components'
import './App.css'
import { ApprovedNames } from './Components/ApprovedNames'

const Main = styled.main`
  background-color: antiquewhite;
  height: 100dvh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
`

const Card = styled.section`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  display: flex;
  width: 300px;
  height: 300px;
  text-align: center;
  justify-content: center;
  align-items: center;
`

const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`

const OptionsButtons = styled.section`
  display: flex;
  justify-content: space-between;
  width: 400px;
`

const clean = keyframes`
  0% { background-color: rgb(255, 146, 44); }
  50% { background-color: rgb(255, 55, 55); }
  100% { background-color: rgb(255, 146, 44); }
`

const CleanButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: black 1px solid;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: rgb(255, 146, 44);

  &:hover {
    cursor: pointer;
    scale: 1.05;
    animation: ${clean} 1s linear infinite;

    img {
      scale: 1.05;
    }
  }
`

const Buttons = styled.section`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`

function App () {
  const [currentName, setCurrentName] = useState('')
  const [approvedNames, setApprovedNames] = useState<string[]>(() => {
    const storedNames = localStorage.getItem('approvedNames')

    return storedNames !== null ? JSON.parse(storedNames) as string[] : []
  })
  const [showApprovedNames, setShowApprovedNames] = useState<boolean>(false)
  const names = useRef(NAMES_LIST)

  const getRandomName = () => {
    if (names.current.length <= 0) {
      setCurrentName('No more names available!')

      return
    }

    const randomName = names.current[Math.floor(Math.random() * names.current.length)]

    setCurrentName(randomName)
    localStorage.setItem('names', JSON.stringify(names.current))
  }

  const acceptName = () => {
    if (names.current.length <= 0) return

    const approved = [...approvedNames, currentName]

    setApprovedNames(approved)
    localStorage.setItem('approvedNames', JSON.stringify(approved))
    names.current = names.current.filter((name) => name !== currentName)

    getRandomName()
  }

  const discardName = () => {
    if (names.current.length <= 0) return

    names.current = names.current.filter((name) => name !== currentName)
    getRandomName()
  }

  const displayNames = () => {
    setShowApprovedNames(!showApprovedNames)
  }

  const clean = () => {
    names.current = NAMES_LIST
    localStorage.removeItem('names')
    localStorage.removeItem('approvedNames')
    setApprovedNames([])
    getRandomName()
  }

  useEffect(() => {
    const storedNames = localStorage.getItem('names')

    names.current = storedNames !== null ? JSON.parse(storedNames) as string[] : NAMES_LIST

    getRandomName()
  }, [])

  useEffect(() => {
    if (showApprovedNames) return

    const storageApprovedNames = localStorage.getItem('approvedNames')

    if (storageApprovedNames === null) return

    setApprovedNames(JSON.parse(storageApprovedNames) as string[])
  }, [showApprovedNames])

  return (
    <Main>
      {/* {JSON.stringify(names.current, null, 2)} */}
      <Title>Name Selector</Title>
      {showApprovedNames
        ? <ApprovedNames approvedNames={approvedNames} />
        : (
          <Card>
            <CardTitle>{currentName}</CardTitle>
          </Card>
          )}
      {!showApprovedNames
        ? (
          <OptionsButtons>
            <Button buttonstyle="no" onClick={discardName} text={'No'} />
            <Button buttonstyle="maybe" onClick={getRandomName} text={'maybe'} />
            <Button buttonstyle="yes" onClick={acceptName} text={'Yes'} />
          </OptionsButtons>
          )
        : null}
      <Buttons>
        <Button buttonstyle="approved" onClick={displayNames} text={showApprovedNames ? 'Keep looking' : 'Show Approved Names'} />
        {showApprovedNames &&
          <CleanButton onClick={clean}>
            <img src='/trash.svg' alt='Trash icon' />
          </CleanButton>
        }
      </Buttons>
      {/* {JSON.stringify(approvedNames, null, 2)} */}
    </Main>
  )
}

export default App
