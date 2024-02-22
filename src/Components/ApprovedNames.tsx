import styled from 'styled-components'

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
`

const ApprovedNamesList = styled.ul`
  list-style: none;
  padding: 0;
  height: 400px;
  width: 300px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ApprovedNamesItem = styled.li`
  font-size: 20px;
  font-weight: semi-bold;
  margin: 5px 0;
  width: min-content;
  background-color: rgb(191, 228, 217);
  padding: 5px 15px;
  border-radius: 15px;
`

interface ApprovedNamesProps {
  approvedNames: string[]
}

export const ApprovedNames = ({ approvedNames }: ApprovedNamesProps) => {
  return (
    <ApprovedNamesContainer>
      <ApprovedNamesTitle>Approved Names</ApprovedNamesTitle>
      {approvedNames.length === 0
        ? <p>No names approved yet</p>
        : <ApprovedNamesList>
          {approvedNames.map((name, index) => (
            <ApprovedNamesItem key={index}>{name}</ApprovedNamesItem>
          ))}
        </ApprovedNamesList>
      }
    </ApprovedNamesContainer>
  )
}
