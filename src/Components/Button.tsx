import styled from 'styled-components'
import { type ButtonType } from '../types'

interface ButtonProps {
  text: string
  onClick: () => void
  buttonStyle: ButtonType
}

interface StyledButtonProps {
  buttonStyle: ButtonType
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: 10px 20px;
  border: black 1px solid;
  border-radius: 10px;
  font-size: 24px;
  background-color: ${(props) =>
    props.buttonStyle === 'yes'
    ? 'rgb(21, 224, 21);'
      : props.buttonStyle === 'no'
    ? 'rgb(250, 92, 92);'
      : props.buttonStyle === 'maybe'
    ? 'rgb(242, 242, 79);'
      : 'rgb(21, 224, 255);'
  };

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.buttonStyle === 'yes'
      ? 'rgb(0, 255, 0);'
        : props.buttonStyle === 'no'
      ? 'rgb(255, 0, 0);'
        : props.buttonStyle === 'maybe'
      ? 'rgb(255, 255, 0);'
        : 'rgb(0, 255, 255);'
      }
    scale: 1.05;
  }
`

export const Button = ({ text, onClick, buttonStyle }: ButtonProps) => {
  return (
    <StyledButton buttonStyle={buttonStyle} onClick={onClick}>
      {text}
    </StyledButton>
  )
}
