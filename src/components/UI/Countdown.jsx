import React, { useEffect, useState } from "react";

const Countdown = (expiryDate) => {
  const [textTimer, setTextTimer] = useState("");

  useEffect(() => {
    setInterval(() => {
      getTimer();
    }, 0);
  }, []);

  function getTimer() {
    const time = expiryDate.time - Date.now();
    if (time < 0) {
      return setTextTimer(null);
    } else {
      const seconds = Math.floor(time / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      setTextTimer(`${hours}h ${minutes % 60}m ${seconds % 60}s`);
    }
  }

  return <div>{textTimer}</div>;
};

export default Countdown;
