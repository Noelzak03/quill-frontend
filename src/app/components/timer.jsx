import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";

export default function Timer({ expiryTimestamp, shouldRestart }) {
  const { seconds, restart } = useTimer({
    expiryTimestamp
  });

  useEffect(() => {
    if (shouldRestart) {
      restart(expiryTimestamp);
    }
  }, [shouldRestart, expiryTimestamp]);

  return (
    <div className="text-primary text-lg font-semibold">
      <span>Time Left: {seconds} s</span>
    </div>
  );
}
