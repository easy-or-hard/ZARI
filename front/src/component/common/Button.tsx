import styled from "styled-components";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

const ButtonWrap = styled.button`
  height: 6rem;
  width: 100%;
  border-radius: 8px;
  border: none;
  font-size: var(--button-font);
  font-weight: 700;
  background-color: #fff;
  transition: 0.2s all;
  :hover {
    opacity: 0.9;
  }
`;

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return <ButtonWrap type="button" onClick={onClick} >{text}</ButtonWrap>;
};

export default Button;
