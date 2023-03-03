import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Main from "./page/Main";

const Container = styled.div`
  width: 100%;
  max-width: 50rem;
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
