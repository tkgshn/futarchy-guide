"use client"
import { animated, useSpring } from "@react-spring/web"
import { ReactNode, useState } from "react"
import { Coin } from "../coinsplit/coinsplit"

export const Redeem = ({
  left,
  right,
  phase,
}: {
  phase: boolean
  left: ReactNode
  right: ReactNode
}) => {
  const animation = useSpring({
    maxHeight: phase ? "100%" : "0%",
  })
  const animation2 = useSpring({
    maxHeight: phase ? "0%" : "100%",
  })
  const animation3 = useSpring({ top: phase ? 0 : 240 })

  return (
    <div className="relative">
      {/*    <animated.div
        style={animation3}
        className="w-full h-0 border-2 z-10 absolute border-black"
      /> */}
      <animated.div style={animation2} className="overflow-hidden">
        {left}
      </animated.div>

      <animated.div style={animation} className="overflow-hidden relative">
        <div className="absolute bottom-0">{right}</div>
      </animated.div>
    </div>
  )
}

export const Redeem2 = ({
  left,
  right,
  phase,
}: {
  phase: boolean
  left: ReactNode
  right: ReactNode
}) => {
  const animation = useSpring({
    opacity: phase ? 1 : 0,
  })
  const animation2 = useSpring({
    opacity: phase ? 1 : 1,
  })
  const animation3 = useSpring({ top: phase ? 0 : 240 })

  return (
    <div className="">
      {/*    <animated.div
        style={animation3}
        className="w-full h-0 border-2 z-10 absolute border-black"
      /> */}
      <animated.div style={animation2} className="h-0">
        {left}
      </animated.div>

      <animated.div style={animation} className="">
        {right}
      </animated.div>
    </div>
  )
}

export default function Home() {
  const [phase, setPhase] = useState(false)
  return (
    <main
      className="flex min-h-screen flex-col items-center p-24"
      onClick={() => setPhase(!phase)}
    >
      <div>
        <Redeem2
          phase={phase}
          left={<Coin condition="pass" />}
          right={<Coin condition="fail" />}
        />
      </div>
      <div>bbbbb</div>
    </main>
  )
}
