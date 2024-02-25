"use client"
import { Coinsplit, USDCSplit } from "../coinsplit/page"

import { useSpring, animated } from "@react-spring/web"
import { useState } from "react"

export function Market({
  left,
  right,
}: {
  left: React.ReactNode
  right: React.ReactNode
}) {
  const [balance, setBalance] = useState(2)
  const left1 = useSpring({
    left: balance > 0 ? "50%" : "0%",
    top: balance > 0 ? "0%" : "100%",
  })
  const left2 = useSpring({
    left: balance > 1 ? "50%" : balance > 0 ? "0%" : "3%",
    top: balance > 1 ? "0%" : balance > 0 ? "100%" : "103%",
  })
  const left3 = useSpring({
    left: balance > 2 ? "50%" : balance > 1 ? "0%" : balance > 0 ? "3%" : "6%",
    top:
      balance > 2 ? "0%" : balance > 1 ? "100%" : balance > 0 ? "103%" : "106%",
  })
  const right1 = useSpring({
    left: balance > 2 ? "100%" : "50%",
    top: balance > 2 ? "100%" : "0%",
  })
  const right2 = useSpring({
    left: balance > 2 ? "103%" : balance > 1 ? "100%" : "50%",
    top: balance > 2 ? "103%" : balance > 1 ? "100%" : "0%",
  })
  const right3 = useSpring({
    left:
      balance > 2
        ? "106%"
        : balance > 1
        ? "103%"
        : balance > 0
        ? "100%"
        : "50%",
    top:
      balance > 2 ? "106%" : balance > 1 ? "103%" : balance > 0 ? "100%" : "0%",
  })
  // Set the drag hook and define component movement based on gesture data

  const doSomething = () => {
    // Perform the desired action when left or right is dragged into the dashed rectangle
  }

  const [hovered, setHovered] = useState(false)

  return (
    <div className="relative w-[400px] h-[300px] bg-white ">
      <div className="mix-blend-multiply">
        {[left3, left2, left1].map((spring, index) => (
          <animated.div
            /** LEFT side */
            key={index}
            className="absolute translate-x-[-50%] translate-y-[-50%]"
            style={spring}
            onClick={() => setBalance((prev) => prev + 1)}
          >
            {left}
          </animated.div>
        ))}
      </div>
      <div className="mix-blend-multiply">
        {[right3, right2, right1].map((spring, index) => (
          <animated.div
            /** RIGHT side */
            key={index}
            className="absolute translate-x-[-50%] translate-y-[-50%]"
            style={spring}
            onClick={() => setBalance((prev) => prev - 1)}
          >
            {right}
          </animated.div>
        ))}
      </div>
      <div
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        className="bg-blue-200 rounded-xl"
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "4px dashed black",
          width: "250px",
          height: "250px",
        }}
      ></div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Market
        left={<Coinsplit active={false} />}
        right={<USDCSplit active={false} />}
      />
    </main>
  )
}
