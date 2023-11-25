import React from "react";

const Player = ({ name, isPlaying }) => {
  const highlight = !isPlaying ? "" : " bg-primary text-secondary";
  return (
    <div className={`border border-primary my-2 mr-2 p-2 ${highlight}`}>
      {name}
    </div>
  );
};

export default Player;
