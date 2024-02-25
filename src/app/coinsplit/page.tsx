"use client";
import { useSpring, animated, useSpringRef, useChain } from "@react-spring/web";
import { useState } from "react";

export default function Coinsplit() {
  const [open, toggle] = useState(false);

  const peekRef = useSpringRef();
  const peek = useSpring({
    ref: peekRef,
    width: open ? 100 : 0,
    config: { friction: open ? 10 : undefined },
  });

  const pookRef = useSpringRef();
  const pook = useSpring({ ref: pookRef, width: open ? 500 : 200 });

  useChain(open ? [peekRef, pookRef] : [pookRef, peekRef], [0, open ? 0.6 : 0]);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const dashCount = 40; // Choose the number of dashes you want
  const dasharray = circumference / dashCount;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row items-center" onClick={() => toggle(!open)}>
        <animated.div style={peek}>
          <svg
            viewBox="0 0 200 240"
            style={{ width: "200px", height: "240px" }}
          >
            <mask id="mask">
              <rect width="200" height="240" fill="white" />
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="black"
                fill="none"
                strokeWidth="5"
                strokeDasharray={`${dasharray}`}
              />
              <text
                x="50%"
                y="48%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="120"
                fontWeight="bold"
                fontFamily="monospace"
                fill="black"
              >
                M
              </text>
            </mask>
            <circle
              className="fill-lime-500"
              cx="100"
              cy="100"
              r="100"
              style={{ mixBlendMode: "multiply", mask: "url(#mask)" }}
            />
            <text
              x="50%"
              y="220"
              textAnchor="middle"
              className="fill-lime-500 font-mono"
              style={{ mixBlendMode: "multiply", fontSize: "20px" }}
            >
              1 {open ? "p" : ""}META
            </text>
          </svg>
        </animated.div>
        <animated.div style={pook} className="flex flex-row justify-end">
          <div>
            <svg
              viewBox="0 0 200 240"
              style={{ width: "200px", height: "240px" }}
            >
              <circle
                className="fill-red-500"
                cx="100"
                cy="100"
                r="100"
                style={{ mixBlendMode: "multiply", mask: "url(#mask)" }}
              />
              <text
                x="50%"
                y="220"
                textAnchor="middle"
                className="fill-red-500 font-mono"
                style={{ mixBlendMode: "multiply", fontSize: "20px" }}
              >
                1 {open ? "f" : ""}META
              </text>
            </svg>
          </div>
        </animated.div>
      </div>
    </main>
  );
}
