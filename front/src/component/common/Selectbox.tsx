import { useState } from "react";
import styled from "styled-components";
import essentialStar from "../../image/essentialStar.png";
import arrowDown from "../../image/arrowDown.png"

interface SelectProps {
  label?: string;
  id: string;
  value: string;
  onChange: (selectValue: string) => void;
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
position: relative;
z-index: 1;
  text-align: left;
  .labelWrap {
    margin-bottom: 1.2rem;
    display: flex;
    align-items: flex-start;
    label {
      font-weight: 700;
      cursor: pointer;
    }
  }
`;

const DropDownContainer = styled.div<ListProps>`
  width: 100%;
  margin: 0 auto;
  position: relative;
  .dropDownHeader {
    position: relative;
    z-index: 1;
    color: #fff;
    width: calc(100% - 2rem);
    border: 1px solid #fff;
    padding: 1rem;
    height: 2.4rem;
    border-radius: 8px;
    font-size: var(--small-font);
    cursor: pointer;
    display: flex;
    align-items: center;
    ::after {
      content: "";
      display: block;
      width: 16px;
      height: 16px;
      background-image: url(${arrowDown});
      background-size: cover;
      position: absolute;
      right: 10px;
      transform: rotate(${props => props.isOpen && "180deg"});
      transition:0.2s transform;
    }
  }
`;
const DropDownListContainer = styled.ul<ListProps>`
  width: calc(100% - 2rem);
  max-height: 14rem;
  display: ${(props) => props.isOpen ? "block" : "none"};
  transition: 0.2s all;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 5.6rem;
  border: 1px solid #fff;
  border-radius: 8px;
  padding: .5rem 1rem;
  font-size: var(--small-font);
  overflow: scroll;
  backdrop-filter: blur(10px);
  li {
    padding: 0.5em 0;
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
    onChange(changeValue);
    handleIsOpen();
  };
  return (
    <SelectWrap>
      {label && (
          <div className="labelWrap">
            <label htmlFor={id}>{label}</label>
            <img src={essentialStar} alt="essential" />
          </div>
      )}
      <DropDownContainer id={id} isOpen={isOpen}>
        <div className="dropDownHeader" onClick={handleIsOpen}>
          {value}
        </div>
        <DropDownListContainer isOpen={isOpen}>
          {data.map((item) => (
            <li
              key={item.id}
              onClick={() => handleValue(`${item.value} (${item.date})`)}
            >
              {item.value} ({item.date})
            </li>
          ))}
        </DropDownListContainer>
      </DropDownContainer>
    </SelectWrap>
  );
};

export default SelectBox;
