import styled from "styled-components";

type ButtonProps = {
  type: "button" | "submit";
  text: string;
  onClick?: () => void;
  disabled: boolean;
};
const Button = (props: ButtonProps) => {
  const { type, text, onClick, disabled } = props;
  console.log(onClick);
  return (
    <ButtonWrap
      type={type}
      onClick={() => {
        onClick && onClick();
        console.log("test");
      }}
      disabled={disabled}
    >
      {text}
    </ButtonWrap>
  );
};

const ButtonWrap = styled.button`
  height: 6rem;
  width: 100%;
  border-radius: 8px;
  border: none;
  font-size: var(--button-font);
  font-weight: 700;
  transition: 0.2s all;
`;

export default Button;
