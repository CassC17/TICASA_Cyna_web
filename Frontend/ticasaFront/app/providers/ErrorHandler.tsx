import React, { ReactNode } from "react";

interface ErrorHandlerProps {
  children: ReactNode;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default ErrorHandler;
