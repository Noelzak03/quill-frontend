
"use client";
import React from "react";
import Particle from "../components/Particle";

function page() {
  return (
    <>
      <div className="z-0 absolute">
        <Particle />
      </div>
      <div className="z-10 absolute bg-transparent flex h-full w-full items-center justify-center">
        <h1 className="text-8xl text-white text-center">Quill</h1>
      </div>
    </>
  );
}

export default page;
