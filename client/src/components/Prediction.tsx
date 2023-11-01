import React, { useEffect, useState } from 'react';

type PredictionData = {
  status: string;
  value: string;
  valueType: string;
  explanation: string;
};

type Props = {
  predictionId: string;
};

const Prediction: React.FC<Props> = ({ predictionId }) => {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
  const [isRunning, setIsRunning] = useState(true);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`/api/predictions/${predictionId}`);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data: PredictionData = await response.json();
//       console.log(`data=${JSON.stringify(data)}`);
//       setPredictionData(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     const interval = setInterval(() => {
//       fetchData();
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [predictionId]);

  // This effect runs when `count` changes
  useEffect(() => {
    console.log('predictionId updated:', predictionId);
    setIsRunning(true)
    setPredictionData(null)
  }, [predictionId]);
  
  useEffect(() => {
    let intervalId: number;
    const fetchData = async () => {
      try {
        console.log("cleaning");
        setPredictionData(null);
        const response = await fetch(`/api/predictions/${predictionId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: PredictionData = await response.json();
        console.log(`data=${JSON.stringify(data)}`);
        setPredictionData(data);
        if (data.status === 'success') {
          setIsRunning(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    console.log(`predictionId || isRunning updated: ${predictionId} ${isRunning}`);
    // fetchData();
    if (isRunning) {
      intervalId = setInterval(fetchData, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, predictionId]);

  return (
    <div>
      {predictionData?.status === 'success' ? (
        <div>
          <p>Id: {predictionId}</p>
          <p>Value: {predictionData.value}</p>
          <p>Value Type: {predictionData.valueType}</p>
          <p>Explanation: {predictionData.explanation}</p>
        </div>
      ) : (
        <div>
            <p>Status: running {predictionId}</p>
        </div>
      )}
    </div>
  );
};

export default Prediction;
