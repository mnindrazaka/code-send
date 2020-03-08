import React from "react";
import Main from "modules/main";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "contexts/appContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Main />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
