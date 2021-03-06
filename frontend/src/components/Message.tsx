import React from "react";
import { Alert } from "react-bootstrap";

interface MessageProps {
  variant?: string;
  children: JSX.Element | string;
}

const Message = ({ children, variant = "info" }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
