import styled from "styled-components";
import Button from "../common/Button";
import DefaultModalSetting from "./DefaultModalSetting";

interface ModalData {
  isOpen: boolean;
  content: string | string[];
}
interface ModalSettingProps {
  handleClose?: () => void;
  confirmFunc?: () => void;
  data: ModalData;
}

const ConfirmModal = (props: ModalSettingProps) => {
  const { data, handleClose, confirmFunc } = props;

  return (
    <DefaultModalSetting isOpen={data.isOpen} handleClose={handleClose}>
      <ModalWrap>
        {Array.isArray(data.content) ? (
          data.content.map((content, idx) => <p key={idx}>{content}</p>)
        ) : (
          <p>{data.content}</p>
        )}
        <div className="buttonWrap">
          <Button
            type={"button"}
            text="아니요"
            onClick={handleClose}
            disabled={false}
          />
          <Button
            type={"button"}
            text="네"
            onClick={confirmFunc}
            disabled={false}
          />
        </div>
      </ModalWrap>
    </DefaultModalSetting>
  );
};

const ModalWrap = styled.div`
  p {
    font-weight: 500;
  }

  .buttonWrap {
    display: flex;
    margin-top: 50px;
    justify-content: space-between;
    button {
      height: 50px;
      flex-basis: calc(50% - 7px);
      :first-child {
        /* background-color: var(--white-color); */

        background-color: var(--gray-color);
        /* color: #000; */
      }
    }
  }
`;

export default ConfirmModal;
