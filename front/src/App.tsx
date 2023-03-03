import styled from "styled-components";
import AppRouter from "./AppRouter";
import GlobalStyle from "./GrobalStyle";
import backgroundDefalut from "./image/backgroundDefault.png";
interface StyledContainerProps {
  readonly background: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Background = styled.div<StyledContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${(props) => props.background});
  background-position: center center;
  background-size: cover;
`;

function App() {
  interface User {
    name: string;
    age: number;
  }
  let user: User = {
    name: "xx",
    age: 30,
  };
  console.log(user.name);
  return (
    <Container>
      <GlobalStyle />
      <Background background={backgroundDefalut} />
      <AppRouter />
    </Container>
  );
}

export default App;
