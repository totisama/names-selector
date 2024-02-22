import { useEffect, useRef, useState } from 'react'
import { NAMES_LIST } from './consts'
import { Button } from './Components/Button'
import styled from 'styled-components'
import './App.css'

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

  h2 {
    font-size: 24px;
    font-weight: bold;
  }
`

const ApprovedNames = styled(Card)`
  flex-direction: column;
  width: 500px;
  height: 500px;

  h2 {
    font-size: 28px;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
    height: 400px;
    width: 300px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
      font-size: 20px;
      font-weight: semi-bold;
      margin: 5px 0;
      width: min-content;
      background-color: rgb(191, 228, 217);
      padding: 5px 15px;
      border-radius: 15px;
    }
  }
`

const ButtonsContainer = styled.section`
  display: flex;
  justify-content: space-between;
  width: 400px;
`

function App () {
  const [currentName, setCurrentName] = useState('')
  const [approvedNames, setAcceptedNames] = useState<string[]>(() => {
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

    setAcceptedNames(approved)
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

  useEffect(() => {
    const storedNames = localStorage.getItem('names')

    names.current = storedNames !== null ? JSON.parse(storedNames) as string[] : NAMES_LIST

    getRandomName()
  }, [])

  return (
    <Main>
      {/* {JSON.stringify(names.current, null, 2)} */}
      <Title>Name Selector</Title>
      {showApprovedNames
        ? (
          <ApprovedNames>
            <h2>Approved Names</h2>
            {approvedNames.length === 0
              ? <p>No names approved yet</p>
              : <ul>
                {approvedNames.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            }
          </ApprovedNames>
          )
        : (
          <Card >
            <h2>{currentName}</h2>
          </Card>
          )}
      {!showApprovedNames
        ? (
          <ButtonsContainer>
            <Button buttonstyle="no" onClick={discardName} text={'No'} />
            <Button buttonstyle="maybe" onClick={getRandomName} text={'maybe'} />
            <Button buttonstyle="yes" onClick={acceptName} text={'Yes'} />
          </ButtonsContainer>
          )
        : null}
      <Button buttonstyle="approved" onClick={displayNames} text={showApprovedNames ? 'Keep looking' : 'Show Approved Names'} />
      {/* {JSON.stringify(approvedNames, null, 2)} */}
    </Main>
  )
}

export default App
