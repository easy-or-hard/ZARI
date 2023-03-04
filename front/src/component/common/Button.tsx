import React from "react";
import styled from "styled-components";

const ButtonWrap = styled.button`
    height: 6rem;
    width: 100%;
    border-radius: 8px;
    border:none;
    font-size: var(--button-font);
    font-weight: 700;
    cursor: pointer;
`;

type ButtonProps = {
  text: string;
};

const Button: React.FC<ButtonProps> = ({ text }) => {
  return <ButtonWrap>{text}</ButtonWrap>;
};

export default Button;
