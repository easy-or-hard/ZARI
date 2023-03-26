import styled from "styled-components";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  isComplete?: boolean
};
interface ComponentProps {
  readonly isComplete?: boolean;
}
const ButtonWrap = styled.button<ComponentProps>`
  height: 6rem;
  width: 100%;
  border-radius: 8px;
  border: none;
  font-size: var(--button-font);
  font-weight: 700;
  background-color: ${props => props.isComplete ? "var(--blue-color)" : "#fff"};
  cursor: ${props => props.isComplete ? "pointer" : "auto"};
  pointer-events: ${props => props.isComplete ? "auto" : "none"};
  transition: 0.2s all;
  :hover {
    opacity: ${props => props.isComplete ? "0.9" : "1"};
  }
`;

const CompleteButton: React.FC<ButtonProps> = ({ text, onClick, isComplete }) => {
  // console.log(onClick)
  return <ButtonWrap type="button" onClick={onClick} isComplete={isComplete}>{text}</ButtonWrap>;
};

export default CompleteButton;
