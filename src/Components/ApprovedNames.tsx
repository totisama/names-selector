import styled from 'styled-components'
import { DraggableList } from './DraggableList'

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

const ApprovedNamesContainer = styled(Card)`
  flex-direction: column;
  width: 500px;
  height: 500px;
`

const ApprovedNamesTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  `

const ApprovedNamesSub = styled.p`
  font-size: 18px;
  font-weight: semi-bold;
  margin-top: 0px;
`

interface ApprovedNamesProps {
  approvedNames: string[]
  setApprovedNames: (names: string[]) => void
}

export const ApprovedNames = ({ approvedNames, setApprovedNames }: ApprovedNamesProps) => {
  return (
    <ApprovedNamesContainer>
      <ApprovedNamesTitle>Approved Names</ApprovedNamesTitle>
      <ApprovedNamesSub>Drag your favorite name to the top!</ApprovedNamesSub>
      {approvedNames.length === 0
        ? <p>No names approved yet</p>
        : <DraggableList setApprovedNames={setApprovedNames} items={approvedNames} />
      }
    </ApprovedNamesContainer>
  )
}
