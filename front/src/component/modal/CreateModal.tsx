import styled from "styled-components";
import Button from "../common/Button";
import btnClose from "../../image/btnClose.png";
import Input from "../common/Input";
import useInput from "../../util/useInput";
import SelectBox from "../common/Selectbox";
import Constellation from "../../dummyData/Constellation";
import useSelect from "../../util/useSelect";
import ThemeSelect from "../createModal/ThemeSelect";

interface CreateModalProps {
  handleClose?: () => void;
  readonly isOpen: boolean;
}

const CreateModalWrap = styled.div<CreateModalProps>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(10px);
  }
  .inner {
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(100% - 9rem);
    max-width: calc(50rem);
    padding: 5rem 2rem 2rem;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    .closeBtn {
      position: absolute;
      top: 2rem;
      right: 2rem;
    }
  }
  form > div {
    margin-bottom: 3rem;
  }
`;

const CreateModal: React.FC<CreateModalProps> = ({ handleClose, isOpen }) => {
  const maxLength = (value: string) => value.length <= 8; // vaidator예시함수 글자수 최대 10
  const { value: spaceValue, onChange: spaceOnChange } = useInput(
    "",
    maxLength
  );
  const { value: selectValue, onChange: selectOnChange } = useSelect(
    `${Constellation[0].value} (${Constellation[0].date})`
  );
  const { value: themeValue, onChange: themeOnChange } = useSelect("green");
  // console.log({
  //   space: spaceValue,
  //   select: selectValue,
  //   theme: themeValue
  // })

  return (
    <CreateModalWrap isOpen={isOpen}>
      <div className="background" onClick={handleClose} />
      <form className="inner">
        <button type="button" className="closeBtn" onClick={handleClose}>
          <img src={btnClose} alt="closeBtn" />
        </button>
        <Input
          id="space"
          label="나의 우주 이름은?"
          placeholder="2글자 이상 8글자 이하(공백포함)"
          value={spaceValue}
          minLength={2}
          onChange={spaceOnChange}
        />
        <SelectBox
          id="Constellation"
          label="나의 별자리는?"
          value={selectValue}
          onChange={selectOnChange}
          data={Constellation}
        />
        <ThemeSelect value={themeValue} onChange={themeOnChange}/>
        <Button text="만들기 완료" />
      </form>
    </CreateModalWrap>
  );
};

export default CreateModal;
