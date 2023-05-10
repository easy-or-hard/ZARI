import styled from "styled-components";
import Button from "../common/Button";
import DefaultModalSetting from "./DefaultModalSetting";

interface AlertProps {
  data: { isOpen: boolean; content: String };
  handleClose: () => void;
}

const AlertModal = ({ data, handleClose }: AlertProps) => {
  return (
    <DefaultModalSetting
      isOpen={data.isOpen}
      handleClose={handleClose}
      isFirst={true}
    >
      <Contents>
        <p>{data.content}</p>
        <Button
          type={"button"}
          text="확인"
          onClick={handleClose}
          disabled={false}
        />
      </Contents>
    </DefaultModalSetting>
  );
};

const Contents = styled.div`
  p {
    /* margin-bottom: 74px; */
    font-weight: 500;
  }
  button {
    height: 50px;
    margin-top: 50px;
  }
`;

export default AlertModal;
