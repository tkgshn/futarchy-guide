import { Market } from "@/app/market/page"
import { DemoZone } from "@/app/track/intro/page"
import { COIN_COLOR } from "@/constants"
import { animated, useSpring } from "@react-spring/web"
import { useEffect } from "react"

function useSpringEnter() {
  const [spring, api] = useSpring(() => ({ from: { opacity: 0, y: -500 } }), [])
  useEffect(() => {
    api.start({ to: { opacity: 1, y: 0 } })
  }, [api])
  return spring
}

export function MisterMarket() {
  const spring = useSpringEnter()
  return (
    <animated.div style={spring}>
      <div
        className="bg-zinc-600 rounded-xl border-zinc-300 flex flex-col justify-center items-center font-mono text-center select-none"
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
    </animated.div>
  )
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <DemoZone>
        <Market step={4} />
      </DemoZone>
    </main>
  )
}
