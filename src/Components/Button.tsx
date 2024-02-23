import styled, { css, keyframes } from 'styled-components'
import { type ButtonType } from '../types'

interface ButtonProps {
  text: string
  onClick: () => void
  buttonstyle: ButtonType
}

interface StyledButtonProps {
  buttonstyle: ButtonType
}

const yes = keyframes`
  0% { transform: rotate3d(1, 0, 0, 60deg); }
  50% { transform: rotate3d(1, 0, 0, -60deg); }
  100% { transform: rotate3d(1, 0, 0, 60deg); }
`

const no = keyframes`
  0% { transform: rotate3d(0, 1, 0, 45deg); }
  50% { transform: rotate3d(0, 1, 0, -45deg); }
  100% { transform: rotate3d(0, 1, 0, 45deg); }
`

const maybe = keyframes`
0% { transform: rotate3d(0, 0, 1, 15deg); }
50% { transform: rotate3d(0, 0, 1, -15deg); }
100% { transform: rotate3d(0, 0, 1, 15deg); }
`

const main = keyframes`
  0% { scale: 0.8; }
  50% {transform: 1.2; }
  100% { transform: 1; }
`

const yesAnimation = css`
  animation: ${yes} 1s linear infinite;
  scale: 1.05;
`

const noAnimation = css`
  animation: ${no} 1s linear infinite;
  scale: 1.05;
`

const mayBeAnimation = css`
  animation: ${maybe} 1s linear infinite;
  scale: 1.05;
`

const mainAnimation = css`
  animation: ${main} 0.75s linear infinite;
`

const StyledButton = styled.button<StyledButtonProps>`
  padding: 10px 20px;
  border: black 1px solid;
  border-radius: 10px;
  font-size: 24px;
  background-color: ${(props) =>
    props.buttonstyle === 'yes'
    ? 'rgb(21, 224, 21);'
      : props.buttonstyle === 'no'
    ? 'rgb(250, 92, 92);'
      : props.buttonstyle === 'maybe'
    ? 'rgb(242, 242, 79);'
      : 'rgb(21, 224, 255);'
  };

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.buttonstyle === 'yes'
      ? 'rgb(0, 255, 0);'
      : props.buttonstyle === 'no'
      ? 'rgb(255, 0, 0);'
      : props.buttonstyle === 'maybe'
      ? 'rgb(255, 255, 0);'
      : 'rgb(0, 255, 255);'
    }
    ${({ buttonstyle }) =>
    buttonstyle === 'yes'
    ? yesAnimation
    : buttonstyle === 'no'
    ? noAnimation
    : buttonstyle === 'maybe'
    ? mayBeAnimation
    : mainAnimation
  }
  }
`

export const Button = ({ text, onClick, buttonstyle }: ButtonProps) => {
  return (
    <StyledButton buttonstyle={buttonstyle} onClick={onClick}>
      {text}
    </StyledButton>
  )
}
