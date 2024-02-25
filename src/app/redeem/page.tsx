"use client"
import { animated, useSpring } from "@react-spring/web"
import { ReactNode, useState } from "react"
import { Coin } from "../coinsplit/page"

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
    height: phase ? 240 : 0,
  })
  const animation2 = useSpring({
    height: phase ? 0 : 240,
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

export default function Home() {
  const [phase, setPhase] = useState(false)
  return (
    <main
      className="flex min-h-screen flex-col items-center p-24"
      onClick={() => setPhase(!phase)}
    >
      <div>
        <Redeem
          phase={phase}
          left={<Coin condition="pass" showPrefix={true} />}
          right={<Coin condition="fail" showPrefix={true} />}
        />
      </div>
      <div>bbbbb</div>
    </main>
  )
}
