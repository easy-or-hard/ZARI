import styled from "styled-components";
import CompleteButton from "../common/CompleteButtom";

interface ConfirmModalProps {
  handleClose?: () => void;
  readonly isOpen: boolean;
}
interface ModalProps {
  readonly isOpen: boolean;
}

const ModalWrap = styled.div<ModalProps>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 3;
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
    text-align: left;
  }
`;
const ButtonWrap = styled.div`
  
`
const ConfirmModal: React.FC<ConfirmModalProps> = ({ handleClose, isOpen }) => {
  return (
    <ModalWrap isOpen={isOpen}>
      <div className="background" onClick={handleClose} />
      <div className="inner">
        <h3>만들 준비를 끝냈나요?</h3>
        <p>
          우주 이름은 친구들에게 공개됩니다.
          <br /> 한번 정해진 이름은 바꿀 수 없어요.
        </p>
        <ButtonWrap>
          <CompleteButton  text="취소" isComplete={true} onClick={handleClose}/>
          <CompleteButton  text="만들기" isComplete={true} />
        </ButtonWrap>
      </div>
    </ModalWrap>
  );
};
export default ConfirmModal;
