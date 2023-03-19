import { Provider } from "react-redux";
import styled from "styled-components";
import AppRouter from "./AppRouter";
import GlobalStyle from "./GrobalStyle";
import { store } from "./redux/store";



const Container = styled.div`
  display: flex;
  justify-content: center;
`;


function App() {
  return (
    
    <Container>
      <Provider store={store}>
        <GlobalStyle />
        <AppRouter />
    </Provider>
    </Container>
  );
}

export default App;
