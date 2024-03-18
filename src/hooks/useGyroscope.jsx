import { useEffect, useState } from "react";

const useGyroscope = (options = null) => {
  const defaultOpts = { frequency: 5 };
  const [isGyroLoading, setIsGyroLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gyroData, setGyroData] = useState(null);

  const [gyroInstance, setGyroInstance] = useState(null);

  useEffect(() => {
    navigator.permissions
      .query({ name: "gyroscope" })
      .catch(() => {
        setError({
          msg: "Some error occured",
        });
      })
      .finally(() => {
        setIsGyroLoading(false);
      });
  }, []);

  useEffect(() => {
    isGyroLoading
      ? null
      : setGyroInstance(new Gyroscope(options || defaultOpts));
  }, [isGyroLoading]);

  useEffect(() => {
    if (!gyroInstance) return;

    const handleReading = () => {
      setGyroData({ x: gyroInstance.x, y: gyroInstance.y, z: gyroInstance.z });
    };

    gyroInstance.addEventListener("reading", handleReading);
    gyroInstance.start();

    return () => {
      gyroInstance.removeEventListener("reading", handleReading);
    };
  }, [gyroInstance]);

  return { gyroData: gyroData, isGyroLoading, gyroError: error };
};

export default useGyroscope;
