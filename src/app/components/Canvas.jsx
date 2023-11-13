"use client";

import React, { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  let isDrawing = false;
  let lastPoint;
  console.log(lastPoint);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth * 0.6;
      canvas.height = window.innerHeight * 0.8;
      draw();
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    window.onresize = resize;
    resize();

    canvas.addEventListener("mouseenter", () => {
      isDrawing = true;
    });

    canvas.addEventListener("mouseleave", () => {
      isDrawing = false;
      lastPoint = null;
    });

    canvas.addEventListener("mousedown", () => {
      isDrawing = true;
      lastPoint = null;
    });

    canvas.addEventListener("mouseup", () => {
      isDrawing = false;
      lastPoint = null;
    });

    canvas.addEventListener("mousemove", () => {
      isDrawing = true;
    });

    function move(e) {
      if (e.buttons) {
        if (!lastPoint) {
          lastPoint = { x: e.offsetX, y: e.offsetY };
          return;
        }
        context.beginPath();
        context.moveTo(lastPoint.x, lastPoint.y);
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = "#715AFF";
        context.lineWidth = 3;
        context.lineCap = "round";
        context.stroke();
        lastPoint = { x: e.offsetX, y: e.offsetY };
      }
    }
    canvas.onmousemove = move;

    const key = (e) => {
      if (e.key === "Backspace") {
        context.clearRect(0, 0, canvas.width, canvas.height);
        lastPoint = null;
      }
    };

    window.onkeydown = key;
  });

  return (
    <div className=" flex items-center">
      <canvas ref={canvasRef} className="border border-primary m-20"></canvas>
    </div>
  );
};

export default Canvas;
