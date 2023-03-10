import styled from "styled-components";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  color?: string
};
interface ComponentProps {
  readonly color?: string;
}
const ButtonWrap = styled.button<ComponentProps>`
  height: 6rem;
  width: 100%;
  border-radius: 8px;
  border: none;
  font-size: var(--button-font);
  font-weight: 700;
  background-color: ${props => props.color === "blue" ? "var(--blue-color)" : "#fff"};
  transition: 0.2s opacity;
  :hover {
    opacity: 0.9;
  }
`;

const Button: React.FC<ButtonProps> = ({ text, onClick, color }) => {
  console.log(color);
  return <ButtonWrap type="button" onClick={onClick} color={color}>{text}</ButtonWrap>;
};

export default Button;
