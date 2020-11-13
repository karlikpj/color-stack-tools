import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "./Store";

import ColorStackGenerator from "./components/ColorStackGenerator";
import AppStyles from "./styles/global.less";

const Main = () => {
  return (
    <StoreProvider>
      <ColorStackGenerator className={AppStyles.container} />
    </StoreProvider>
  );
};

ReactDOM.render(<Main />, document.getElementById("react-mount"));
