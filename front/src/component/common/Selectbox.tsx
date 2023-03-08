import { useState } from "react";
import styled from "styled-components";
import essentialStar from "../../image/essentialStar.png";

interface SelectProps {
  label?: string;
  id: string;
  value: string;
  onChange: (selectValue: string) => void
  data: {
    id: number;
    value: string;
    date?: string;
  }[];
}

interface ListProps {
  readonly isOpen: boolean;
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
`;

const DropDownContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  .dropDownHeader {
    margin-bottom: 0.8em;
    padding: 0.4em 2em 0.4em 1em;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    font-weight: 500;
    font-size: 1.3rem;
    color: #3faffa;
    background: #ffffff;
    cursor: pointer;
  }
`;
const DropDownListContainer = styled.ul<ListProps>`
  max-height: ${(props) => (props.isOpen ? "50rem" : "0")};
  transition: 1s max-height;
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  overflow: hidden;
  &:first-child {
    padding-top: 0.8em;
  }
  li {
    list-style: none;
    margin-bottom: 0.8em;
    cursor: pointer;
  }
`;
const SelectBox: React.FC<SelectProps> = ({
  label,
  id,
  value,
  onChange,
  data,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleValue = (changeValue: string) => {
    onChange(changeValue)
    handleIsOpen()
  }
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
      <DropDownContainer id={id}>
        <div className="dropDownHeader" onClick={handleIsOpen}>
          {value}
        </div>
        <DropDownListContainer isOpen={isOpen}>
          {data.map((item) => 
          (
            <li key={item.id} onClick={() => handleValue(`${item.value} (${item.date})`)}>
                {item.value} ({item.date})
            </li>
          ))}
        </DropDownListContainer>
      </DropDownContainer>
      {/* <input
        type="text"
        id={id}
        value={value}
        minLength={minLength}
        onChange={onChange}
      /> */}
    </SelectWrap>
  );
};

export default SelectBox;
