import styled from "styled-components";

type CreateModalProps = {
  handleClose: () => void;
  isOpen: boolean;
};

interface ModalWrapProps {
  readonly isOpen: boolean;
}

const CreateModalWrap = styled.div<ModalWrapProps>`
    display: ${props => props.isOpen ? "fxied": "none"};
`;

const CreateModal = ({ handleClose, isOpen }: CreateModalProps) => {
  console.log(typeof isOpen);
  return (
    <CreateModalWrap isOpen={isOpen}>
      <div></div>
      <button onClick={handleClose} />
    </CreateModalWrap>
  );
};

export default CreateModal;
