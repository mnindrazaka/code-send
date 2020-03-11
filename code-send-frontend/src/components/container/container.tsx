import React, { FunctionComponent } from "react";

const Container: FunctionComponent = ({ children }) => {
  return <div style={{ paddingLeft: 24, paddingRight: 24 }}>{children}</div>;
};

export default Container;
