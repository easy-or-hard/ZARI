import styled from "styled-components";
import { modalSettings } from "./ModalStyle";

interface ModalSettingProps {
  handleClose?: () => void;
  readonly isOpen: boolean;
  isFirst?: boolean;
  children: React.ReactNode;
}

const DefaultModalSetting = (props: ModalSettingProps) => {
  const { isOpen, handleClose, isFirst } = props;
  return (
    <ModalWrap isOpen={isOpen} isFirst={isFirst}>
      <div
        className="background"
        onClick={() => {
          handleClose && handleClose();
        }}
      />
      <div className="modalWrap">
        <button
          type="button"
          onClick={() => handleClose && handleClose()}
          className="closeButton"
        >
          <span>닫기</span>
        </button>
        {props.children}
      </div>
    </ModalWrap>
  );
};

const ModalWrap = styled.div<ModalSettingProps>`
  ${(props) => modalSettings(props.isOpen)}
  z-index: ${(props) => (props.isFirst ? "16" : "15")};
  .background {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .modalWrap {
    position: relative;
    background-color: #222;
    padding: 48px 32px 36px;
    border-radius: 24px;
    text-align: center;
    width: calc(100% - 104px);
    max-width: 520px;
    .closeButton {
      position: absolute;
      top: 24px;
      right: 24px;
    }
  }
`;

export default DefaultModalSetting;
