import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "antd";

const Logo = () => {
  return (
    <Link to="/project">
      <Typography.Text strong style={{ color: "white" }}>
        Code Send
      </Typography.Text>
    </Link>
  );
};

export default Logo;
