import styled from "styled-components";

interface ConfirmModalProps {
  handleClose?: () => void;
  readonly isOpen: boolean;
}
interface ModalProps {
    readonly isOpen: boolean
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
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(10px);
  }
`;
const ConfirmModal: React.FC<ConfirmModalProps> = ({ handleClose, isOpen }) => {
  return (
    <ModalWrap isOpen={isOpen}>
      <div className="background" onClick={handleClose} />
    </ModalWrap>
  );
};
export default ConfirmModal;
