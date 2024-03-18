import { useEffect, useState } from "react";

const useAccelerometer = (options = null) => {
  const defaultOpts = { frequency: 5 };
  const [isAccLoading, setIsAccLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accData, setAccData] = useState(null);

  const [accInstance, setAccInstance] = useState(null);

  useEffect(() => {
    navigator.permissions
      .query({ name: "accelerometer" })
      .catch(() => {
        setError({
          msg: "Some error occured",
        });
      })
      .finally(() => {
        setIsAccLoading(false);
      });
  }, []);

  useEffect(() => {
    isAccLoading
      ? null
      : setAccInstance(new Accelerometer(options || defaultOpts));
  }, [isAccLoading]);

  useEffect(() => {
    if (!accInstance) return;

    const handleReading = () => {
      setAccData({ x: accInstance.x, y: accInstance.y, z: accInstance.z });
    };

    accInstance.addEventListener("reading", handleReading);
    accInstance.start();

    return () => {
      accInstance.removeEventListener("reading", handleReading);
    };
  }, [accInstance]);

  return { accData: accData, isAccLoading, accError: error };
};

export default useAccelerometer;
