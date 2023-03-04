import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Main from "./page/Main";

const Container = styled.section`
  width: 100%;
  max-width: 50rem;
  position: relative;
`;
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default AppRouter;
