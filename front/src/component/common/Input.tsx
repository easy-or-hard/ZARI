import styled from "styled-components";
import essentialStar from "../../image/essentialStar.png";

interface InputProps {
  label?: string
  id: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
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

const LengthChecker = styled.div`
  text-align: right;
  color: var(--gray-color);
  font-size: var(--small-font);
  margin-top: 0.2rem;
`;
const Input: React.FC<InputProps> = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  minLength,
}) => {
  return (
    <InputWrap>
      {label && (
        <>
          <div className="labelWrap">
            <label htmlFor={id}>{label}</label>
            <img src={essentialStar} alt="essential" />
          </div>
        </>
      )}
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        minLength={minLength}
        onChange={onChange}
      />

      {id === "space" && (
        <LengthChecker>
          <span>{value.length}</span>/<span>8</span>
        </LengthChecker>
      )}
    </InputWrap>
  );
};

export default Input;
