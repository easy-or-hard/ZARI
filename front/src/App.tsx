import { Provider } from "react-redux";
import styled from "styled-components";
import AppRouter from "./AppRouter";
import GlobalStyle from "./GrobalStyle";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { BrowserRouter } from "react-router-dom";

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Container>
            <GlobalStyle />
            <AppRouter />
          </Container>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default App;
