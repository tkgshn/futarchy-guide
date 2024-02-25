"use client"
import { COIN_COLOR } from "@/constants"
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
  const left4 = useSpring({
    left:
      balance > 3
        ? "50%"
        : balance > 2
        ? "0%"
        : balance > 1
        ? "3%"
        : balance > 0
        ? "6%"
        : "9%",
    top:
      balance > 3
        ? "0%"
        : balance > 2
        ? "100%"
        : balance > 1
        ? "103%"
        : balance > 0
        ? "106%"
        : "109%",
  })

  const right1 = useSpring({
    left: balance > 3 ? "100%" : "50%",
    top: balance > 3 ? "100%" : "0%",
  })
  const right2 = useSpring({
    left: balance > 3 ? "103%" : balance > 2 ? "100%" : "50%",
    top: balance > 3 ? "103%" : balance > 2 ? "100%" : "0%",
  })
  const right3 = useSpring({
    left:
      balance > 3
        ? "106%"
        : balance > 2
        ? "103%"
        : balance > 1
        ? "100%"
        : "50%",
    top:
      balance > 3 ? "106%" : balance > 2 ? "103%" : balance > 1 ? "100%" : "0%",
  })
  const right4 = useSpring({
    left:
      balance > 3
        ? "109%"
        : balance > 2
        ? "106%"
        : balance > 1
        ? "103%"
        : balance > 0
        ? "100%"
        : "50%",
    top:
      balance > 3
        ? "109%"
        : balance > 2
        ? "106%"
        : balance > 1
        ? "103%"
        : balance > 0
        ? "100%"
        : "0%",
  })

  return (
    <div className="relative w-[400px] h-[300px]">
      <div className="mix-blend-lighten">
        {[left4, left3, left2, left1].map((spring, index) => (
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
      <div className="mix-blend-lighten">
        {[right4, right3, right2, right1].map((spring, index) => (
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
        className="bg-zinc-600 rounded-xl border-zinc-300 flex flex-col justify-center items-center font-mono text-center"
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "4px dashed",
          width: "250px",
          height: "250px",
        }}
      >
        <div className="text-5xl mb-3">the market</div>
        <div>
          1 <span className={`text-[${COIN_COLOR}]`}>META</span> :: 49,000 USDC
        </div>
      </div>
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
