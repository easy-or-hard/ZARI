import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import essentialStar from "../../image/essentialStar.png";

interface InputProps {
  id: string;
  placeholder?: string;
  rule?: { max: number; min: number };
}

const InputWrap = styled.div`
  text-align: left;
  .labelWrap {
    margin-bottom: 1.2rem;
    display: flex;
    align-items: flex-start;
    label {
      cursor: pointer;
    }
  }
  input {
    color: #fff;
    width: calc(100% - 2rem);
    border: 1px solid #fff;
    padding: 1rem;
    height: 2.4rem;
    border-radius: 8px;
    font-size: var(--small-font);
  }
`;
const Input: React.FC<InputProps> = ({ id, placeholder, rule }) => {
  const [isValue, setValue] = useState("");
  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  
  return (
    <InputWrap>
      <div className="labelWrap">
        <label htmlFor={id}>나의 우주 이름은?</label>
        <img src={essentialStar} alt="essential" />
      </div>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        minLength={rule?.min}
        maxLength={rule?.max}
        onChange={handleValue}
      />
      {/* {rule? (<span>{isValue.length}</span>/<span>8</span>)} */}
    </InputWrap>
  );
};

export default Input;
