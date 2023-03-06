import styled from "styled-components";
import Button from "../common/Button";
import btnClose from "../../image/btnClose.png";
import Input from "../common/Input";

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
    width: 100%;
    max-width: calc(50rem - 8rem);
    padding: 5rem 2rem 2rem;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    .closeBtn {
      position: absolute;
      top: 2rem;
      right: 2rem;
    }
  }
`;

const CreateModal: React.FC<CreateModalProps> = ({ handleClose, isOpen }) => {
  return (
    <CreateModalWrap isOpen={isOpen}>
      <div className="background" onClick={handleClose} />
      <form className="inner">
        <button type="button" className="closeBtn" onClick={handleClose}>
          <img src={btnClose} alt="closeBtn" />
        </button>
        <Input id="space" placeholder="2글자 이상 8글자 이하(공백포함)" rule={{max:8, min:2}}/>
        <Button text="만들기 완료" />
      </form>
    </CreateModalWrap>
  );
};

export default CreateModal;
