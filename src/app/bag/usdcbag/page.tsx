"use client"
import { DemoZone } from "@/app/track/intro/page"
import { STARTING_USDC_BALANCE, USDC_COLOR } from "@/constants"
import { animated, useSpring } from "@react-spring/web"
import { useEffect, useState } from "react"

function useSpringEnter() {
  const [spring, api] = useSpring(() => ({ from: { opacity: 0, y: -500 } }), [])
  useEffect(() => {
    api.start({ to: { opacity: 1, y: 0 } })
  }, [api])
  return spring
}

const BIGGLIEST_AMOUNT = STARTING_USDC_BALANCE
const SMOLLEST_AMOUNT = STARTING_USDC_BALANCE - 50000 * 3

const radiusFromArea = (area: number) => Math.sqrt(area / Math.PI)
const BIGGLIEST_AREA = 125 * 125 * Math.PI
const SMOLLEST_AREA = 75 * 75 * Math.PI

export function USDCBag({ amount }: { amount: number }) {
  const spring = useSpringEnter()

  const progress =
    (amount - SMOLLEST_AMOUNT) / (BIGGLIEST_AMOUNT - SMOLLEST_AMOUNT)
  const area = SMOLLEST_AREA + progress * (BIGGLIEST_AREA - SMOLLEST_AREA)
  const { amountSpring, size } = useSpring({
    amountSpring: amount,
    size: radiusFromArea(area) * 2 + "px",
    config: { duration: 1500 },
  })

  return (
    <animated.div style={spring}>
      <animated.div
        className="rounded-full border-white flex flex-col justify-center items-center font-mono text-center select-none border-4"
        style={{
          position: "absolute",
          background: USDC_COLOR,
          top: "0",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: size,
          height: size,
        }}
      >
        <div className="text-5xl">
          $<animated.span>{amountSpring.to((x) => x.toFixed(0))}</animated.span>
        </div>
      </animated.div>
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
