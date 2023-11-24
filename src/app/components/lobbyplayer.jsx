import React from "react";

const Player = ({ name, isPlaying }) => {
  const highlight = !isPlaying ? "" : " bg-primary text-secondary";
  return (
    <div className={`border border-primary p-2 m-2 ${highlight}`}>{name}</div>
  );
};

export default Player;
