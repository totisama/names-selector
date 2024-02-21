interface ButtonProps {
  text: string
  onClick: () => void
  buttonClass: string
}

export const Button = ({ text, onClick, buttonClass }: ButtonProps) => {
  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  )
}
