import { BrowserRouter, Route, Routes } from "react-router-dom";
import backgroundDefalut from "./image/backgroundDefault.png";
import styled from "styled-components";
import Main from "./page/Main";
import { RootState } from "./redux/reducers/rootReducer";
import { useSelector } from "react-redux";

interface StyledContainerProps {
  readonly background: string;
  readonly backgroundColor: string;
}

const Container = styled.section`
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
  background-image: url(${(props) => props.background}), var(--${props=> props.backgroundColor}-gd);
  background-position: center center;
  background-size: cover;
  background-blend-mode: multiply;
`;
const AppRouter = () => {
  const backgroundColor = useSelector((state: RootState) => state.backgroundGd);

  return (
    <BrowserRouter>
      <Container>
      <Background background={backgroundDefalut} backgroundColor={backgroundColor}/>
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default AppRouter;
