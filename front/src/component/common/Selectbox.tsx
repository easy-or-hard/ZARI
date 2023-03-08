import styled from "styled-components";
import essentialStar from "../../image/essentialStar.png";

interface SelectProps {
  label?: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
}

const SelectWrap = styled.div`
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

const SelectBox: React.FC<SelectProps> = ({
  label,
  id,
  value,
  onChange,
  minLength,
}) => {
  return (
    <SelectWrap>
      {label && (
        <>
          <div className="labelWrap">
            <label htmlFor={id}>{label}</label>
            <img src={essentialStar} alt="essential" />
          </div>
        </>
      )}
      <ul>
        <li>궁수자리 (11월23일 ~ 12월 24일)</li>
      </ul>
      <input
        type="text"
        id={id}
        value={value}
        minLength={minLength}
        onChange={onChange}
      />
    </SelectWrap>
  );
};

export default SelectBox;
