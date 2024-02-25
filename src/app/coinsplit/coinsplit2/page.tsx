"use client"
import { useSpring, animated, useSpringRef, useChain } from "@react-spring/web"
import { useState } from "react"

export function Coin({
  condition,
  showPrefix,
  showLabel,
}: {
  condition: "pass" | "fail"
  showPrefix: boolean
  showLabel?: boolean
}) {
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const dashCount = 40 // Choose the number of dashes you want
  const dasharray = circumference / dashCount

  const hideLabel = showLabel === false

  return (
    <svg
      className="mix-blend-lighten"
      viewBox="0 0 210 240"
      style={{ width: "210px", height: "240px" }}
    >
      <mask id="mask">
        <rect width="210" height="240" fill="white" />
        <circle
          cx="105"
          cy="105"
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
        className={"fill-black"}
        cx="105"
        cy="105"
        r="104"
        //style={{ mixBlendMode: "multiply", mask: "url(#mask)" }}
      />
      <circle
        cx="105"
        cy="105"
        r="104"
        fill={condition === "pass" ? "#0ff" : "#f0f"}
        //style={{ mixBlendMode: "multiply", mask: "url(#mask)" }}
      />
      <circle
        className={"fill-blue-600 mix-blend-multiply"}
        cx="105"
        cy="105"
        r="100"
        style={{ mask: "url(#mask)" }}
      />

      <text
        x="50%"
        y="225"
        textAnchor="middle"
        className={
          (condition === "pass" ? "fill-lime-500 " : "fill-red-500 ") +
          (hideLabel ? "opacity-0 " : "") +
          "font-mono"
        }
        style={{ fontSize: "20px" }}
      >
        1 {showPrefix ? (condition === "pass" ? "p" : "f") : ""}META
      </text>
    </svg>
  )
}

export function Coinsplit({ active }: { active?: boolean }) {
  const [open, toggle] = useState(false)

  const peekRef = useSpringRef()
  const peek = useSpring({
    ref: peekRef,
    width: open ? 100 : 0,
    config: { friction: open ? 10 : undefined },
  })

  const pookRef = useSpringRef()
  const pook = useSpring({ ref: pookRef, width: open ? 500 : 210 })

  useChain(open ? [peekRef, pookRef] : [pookRef, peekRef], [0, open ? 0.6 : 0])

  return (
    <div
      className="flex flex-row items-center"
      onClick={active ? () => toggle(!open) : undefined}
    >
      <animated.div style={peek}>
        <Coin condition="pass" showPrefix={open} />
      </animated.div>
      <animated.div style={pook} className="flex flex-row justify-end">
        <div>
          <Coin condition="fail" showPrefix={open} />
        </div>
      </animated.div>
    </div>
  )
}

export default function Fart() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Coinsplit active />
    </main>
  )
}
