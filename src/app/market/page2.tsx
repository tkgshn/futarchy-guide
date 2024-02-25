"use client"
import { Coin } from "../coinsplit/page"

import { useSpring, animated } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"
import { useState } from "react"

export function Market({
  left,
  right,
}: {
  left: React.ReactNode
  right: React.ReactNode
}) {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ dragging, memo, movement: [mx, my] }) => {
    console.log("down", dragging)
    console.log("memo", memo)

    set({ x: dragging ? mx : 0, y: dragging ? my : 0 })
    if (!dragging && memo === true) {
      console.log("drag ended")
    }
    return dragging
  })

  const doSomething = () => {
    // Perform the desired action when left or right is dragged into the dashed rectangle
  }

  const [hovered, setHovered] = useState(false)

  return (
    <div>
      <div style={{ mixBlendMode: "multiply" }}>
        <animated.div /** LEFT side */
          {...bind()}
          style={{ x, y, touchAction: "none" }}
        >
          {left}
        </animated.div>
      </div>
      <animated.div /** RIGHT side */>{right}</animated.div>
      <div
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: hovered ? "3px dashed red" : "2px dashed black",
          width: "200px",
          height: "200px",
        }}
      ></div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Market
        left={<Coin condition="pass" showPrefix showLabel={false} />}
        right={<Coin condition="fail" showPrefix />}
      />
    </main>
  )
}
