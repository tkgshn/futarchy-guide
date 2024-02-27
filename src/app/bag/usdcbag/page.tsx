"use client"
import { DemoZone } from "@/app/track/intro/page"
import { USDC_COLOR } from "@/constants"
import { animated, useSpring } from "@react-spring/web"
import { useEffect, useState } from "react"

function useSpringEnter() {
  const [spring, api] = useSpring(() => ({ from: { opacity: 0, y: -500 } }), [])
  useEffect(() => {
    api.start({ to: { opacity: 1, y: 0 } })
  }, [api])
  return spring
}

export function USDCBag({ amount }: { amount: number }) {
  const spring = useSpringEnter()

  const { amountSpring, x } = useSpring({
    amountSpring: amount,
    x: amount / 10000,
  })

  return (
    <animated.div style={spring}>
      <div
        className="rounded-full border-zinc-300 flex flex-col justify-center items-center font-mono text-center select-none"
        style={{
          position: "absolute",
          background: USDC_COLOR,
          top: "0",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "4px dashed",
          width: "250px",
          height: "250px",
        }}
      >
        <div className="text-5xl mb-3">
          $
          <animated.span style={{ x }}>
            {amountSpring.to((x) => x.toFixed(0))}
          </animated.span>
        </div>
      </div>
    </animated.div>
  )
}

export default function Home() {
  const [toggle, setToggle] = useState(false)

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24"
      onClick={() => setToggle(!toggle)}
    >
      <DemoZone>
        <USDCBag amount={49000 * (toggle ? 3 : 2)} />
      </DemoZone>
    </main>
  )
}
