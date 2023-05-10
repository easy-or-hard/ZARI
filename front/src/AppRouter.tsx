import { Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import Main from "./page/Main";
import { RootState } from "./redux/reducers/rootReducer";
import { useSelector } from "react-redux";
import ConfirmModal from "./component/modal/ConfirmModal";
import AlertModal from "./component/modal/AlertModal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useToggle from "./util/useToggle";
import { alertHandler, confirmHandler } from "./redux/actions/modalAction";

interface StyledContainerProps {
  readonly background?: string;
  readonly backgroundColor: string;
}

const AppRouter = () => {
  const { pathname } = useLocation();
  const backgroundColor = useSelector((state: RootState) => state.backgroundGd);
  const { alert, confirm } = useSelector(
    (state: RootState) => state.modalHandlerReducer
  );
  const dispatch = useDispatch();
  const {
    alertContent: alertContentSelector,
    confirmContent: confirmContentSelector,
  } = useSelector((state: RootState) => state.modalContentsReducer);

  const {
    value: alertModal,
    handleValue: handleAlertModal,
    setValue: setAlertModal,
  } = useToggle();
  const [alertContent, setAlertContent] = useState("");
  const {
    value: confirmModal,
    handleValue: handleConfirmModal,
    setValue: setConfirmModal,
  } = useToggle();
  const [confirmData, setConfirmData] = useState({
    content: "",
    confirmFunc: () => {},
  });

  useEffect(() => {
    if (alert) {
      handleAlertModal();
      dispatch(alertHandler(false));
    }
    if (confirm) {
      handleConfirmModal();
      dispatch(confirmHandler(false));
    }
    if (alertContentSelector) {
      setAlertContent(alertContentSelector);
    }
    if (confirmContentSelector) {
      setConfirmData(confirmContentSelector);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert, confirm]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Container>
      <Background backgroundColor={backgroundColor} />
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>

      {/* 확인모달 */}
      <ConfirmModal
        data={{ isOpen: confirmModal, content: confirmData.content }}
        handleClose={() => setConfirmModal(false)}
        confirmFunc={() => {
          confirmData.confirmFunc();
          setConfirmModal(false);
        }}
      />

      {/* 공지모달 */}
      <AlertModal
        data={{
          isOpen: alertModal,
          content: alertContent,
        }}
        handleClose={() => setAlertModal(false)}
      />
    </Container>
  );
};

const Container = styled.main`
  width: 100%;
  max-width: 50rem;
  position: relative;
`;

const Background = styled.div<StyledContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: var(--${(props) => props.backgroundColor}-gd);
  background-position: center center;
  background-size: cover;
  background-blend-mode: multiply;
`;

export default AppRouter;
