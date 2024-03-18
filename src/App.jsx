import React, { useEffect } from "react";
import useAccelerometer from "./hooks/useAccelerometer";
import useGravitySensor from "./hooks/useGravitySensor";
import useGyroscope from "./hooks/useGyroscope";

const App = () => {
  const { isAccLoading, accData, accError } = useAccelerometer();
  const { isGyroLoading, gyroData, gyroError } = useGyroscope();
  const { isGSLoading, gsData, gsError } = useGravitySensor();

  return (
    <div>
      <div style={{ background: "cyan" }}>
        <h3>Accelerometer Reading (x,y,z)</h3>
        {isAccLoading ? (
          <h1>Acc Loading</h1>
        ) : accError ? (
          <h1>Acc Error</h1>
        ) : (
          <div>
            <div>{accData?.x}</div>
            <div>{accData?.y}</div>
            <div>{accData?.z}</div>
          </div>
        )}
      </div>

      <div style={{ background: "pink" }}>
        <h3>Gyroscope Reading (x,y,z)</h3>
        {isGyroLoading ? (
          <h1>Gyro Loading..</h1>
        ) : gyroError ? (
          <h1>Gyro Error</h1>
        ) : (
          <div>
            <div>{gyroData?.x}</div>
            <div>{gyroData?.y}</div>
            <div>{gyroData?.z}</div>
          </div>
        )}
      </div>

      <div style={{ background: "lightgreen" }}>
        <h3>Gravity Sensor Reading (x,y,z)</h3>
        {isGSLoading ? (
          <h1>Gravity Sensor Loading..</h1>
        ) : gsError ? (
          <h1>GS Error</h1>
        ) : (
          <div>
            <div>{gsData?.x}</div>
            <div>{gsData?.y}</div>
            <div>{gsData?.z}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
