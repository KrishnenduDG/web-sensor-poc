import { useEffect, useState } from "react";

const useGravitySensor = (options = null) => {
  const defaultOpts = { frequency: 5 };
  const [isGSLoading, setIsGSLoading] = useState(true);
  const [error, setError] = useState(null);
  const [GSData, setGSData] = useState(null);

  const [GSInstance, setGSInstance] = useState(null);

  useEffect(() => {
    navigator.permissions
      .query({ name: "accelerometer" })
      .catch(() => {
        setError({
          msg: "Some error occured",
        });
      })
      .finally(() => {
        setIsGSLoading(false);
      });
  }, []);

  useEffect(() => {
    isGSLoading
      ? null
      : setGSInstance(new GravitySensor(options || defaultOpts));
  }, [isGSLoading]);

  useEffect(() => {
    if (!GSInstance) return;

    const handleReading = () => {
      setGSData({ x: GSInstance.x, y: GSInstance.y, z: GSInstance.z });
    };

    GSInstance.addEventListener("reading", handleReading);
    GSInstance.start();

    return () => {
      GSInstance.removeEventListener("reading", handleReading);
    };
  }, [GSInstance]);

  return { gsData: GSData, isGSLoading, gsError: error };
};

export default useGravitySensor;
