import React from 'react';

type PredictionErrorProps = {
  message: string;
};

const PredictionError: React.FC<PredictionErrorProps> = ({ message }) => {
  return <div className="error">{message}</div>;
};

export default PredictionError;