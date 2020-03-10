import React from "react";
import Main from "modules/main";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "stores";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Main />
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
