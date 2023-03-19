import styled from "styled-components";
import Theme from "../../dummyData/Theme";
import check from "../../image/check.png"

interface ThemeProps {
  value: string;
  onChange: (selectValue: string) => void;
}
interface ListProps {
  key: number;
  value: string;
  color: string;
  select?: boolean;
}

const SelectWrap = styled.div`
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
  #themeSelect {
    display: flex;
    flex-direction: row;
  }
`;

const ThemeList = styled.li<ListProps>`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-image: ${(props) => props.color};
  margin-right: 1.5rem;
  box-sizing: border-box;
  position: relative;
  border: ${(props) => props.select && "2px solid #fff"};
  cursor: pointer;
  ::after {
    content: "";
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    display: ${props => props.select ? "block" : "none"};
    background-image: url(${check});

  }
`;

const ThemeSelect: React.FC<ThemeProps> = ({ value, onChange }) => {

  return (
    <SelectWrap>
      <div className="labelWrap">
        <label htmlFor="themeSelect">나의 우주 컬러는?</label>
      </div>
      <ul id="themeSelect">
        {Theme.map((item) => (
          <ThemeList
            key={item.id}
            value={item.value}
            color={item.color}
            select={item.value === value ? true : false}
            onClick={() => onChange(item.value)}
          />
        ))}
      </ul>
    </SelectWrap>
  );
};

export default ThemeSelect;
