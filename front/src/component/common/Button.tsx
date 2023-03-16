import styled from "styled-components";

type ButtonProps = {
  text: string;
  liner?: boolean;
  onClick?: () => void;
};
interface StyledProps {
  liner?: boolean;
}
const ButtonWrap = styled.button<StyledProps>`
  height: 6rem;
  width: 100%;
  border-radius: 8px;
  border: none;
  font-size: var(--button-font);
  font-weight: 700;
  transition: 0.2s all;
  ${(props) =>
    props.liner
      ? `border:1px solid #fff;
  background-color:transparent;
  color:#fff;`
      : `background-color: #fff;`}
  :hover {
    opacity: 0.9;
  }
`;

const Button: React.FC<ButtonProps> = ({ text, liner, onClick }) => {
  return (
    <ButtonWrap type="button" onClick={onClick} liner={liner}>
      {text}
    </ButtonWrap>
  );
};

export default Button;
