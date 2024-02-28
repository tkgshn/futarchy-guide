"use client"
import { COIN_COLOR, USDC_COLOR } from "@/constants"
import { Coinsplit, USDCSplit } from "../coinsplit/page"

import { useSpring, animated } from "@react-spring/web"
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { DemoZone } from "../track/intro/page"
import { FillableBag } from "../bag/page"
import { USDCBag } from "../bag/usdcbag/page"

function useSpringEnter() {
  const [spring, api] = useSpring(() => ({ from: { opacity: 0, y: -500 } }), [])
  useEffect(() => {
    api.start({ to: { opacity: 1, y: 0 } })
  }, [api])
  return spring
}

export function AnimatedEnter({ children }: { children: React.ReactNode }) {
  const spring = useSpringEnter()
  return <animated.div style={spring}>{children}</animated.div>
}

export function MisterMarket() {
  const spring = useSpringEnter()
  return (
    <animated.div style={spring}>
      <div
        className="bg-zinc-700 rounded-xl border-zinc-300 flex flex-col justify-center items-center font-mono text-center select-none"
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
          1 <span style={{ color: COIN_COLOR }}>META</span> :: 49,000{" "}
          <span style={{ color: USDC_COLOR }}>USDC</span>
        </div>
      </div>
    </animated.div>
  )
}

export function MarketBase({
  left,
  right,
  buyLeft,
  leftBalance, // this is a lie. its actually like 4 minus this number
}: {
  left: React.ReactNode
  right: React.ReactNode
  buyLeft: MutableRefObject<null | (() => void)>
  leftBalance: number
}) {
  const balance = leftBalance
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

  return (
    <>
      <div className="mix-blend-lighten">
        {[left4, left3, left2, left1].map((spring, index) => (
          <animated.div
            /** LEFT side */
            key={index}
            className="absolute translate-x-[-50%] translate-y-[-50%]"
            style={spring}
            //onClick={() => setBalance((prev) => prev + 1)}
          >
            {left}
          </animated.div>
        ))}
      </div>
      <div>
        <FillableBag
          emitRef={buyLeft}
          bagPosition={["100%", "100%"]}
          targetPosition={["50%", "0%"]}
          bag={right}
          thingy={
            <div className="scale-[0.5]">
              <USDCSplit active={false} />
            </div>
          }
        />
      </div>
    </>
  )
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const LEFT_BALANCE_EACH_STEP = {
  0: 4,
  1: 4,
}

const STARTING_USDC_BALANCE = 147000
export function Market({ step }: { step: number }) {
  const buyLeft = useRef<null | (() => void)>(null)

  const [leftBalance, setLeftBalance] = useState(4) // this is a lie. its actually like 4 minus this number
  const [rightBalance, setRightBalance] = useState(147000)

  const prevStep = useRef(0)
  useEffect(() => {
    const buyStuff = async () => {
      setRightBalance(147000 - 49000)
      buyLeft.current?.()
      await sleep(100)
      buyLeft.current?.()
      await sleep(100)
      buyLeft.current?.()
      await sleep(100)
      buyLeft.current?.()
      await sleep(100)
      buyLeft.current?.()
      await sleep(100)
      buyLeft.current?.()
      await sleep(100)
      buyLeft.current?.()
      await sleep(100)
      buyLeft.current?.()
      await sleep(100)
      buyLeft.current?.()
      await sleep(100)
      buyLeft.current?.()
      await sleep(100)
      buyLeft.current?.()
      await sleep(100)
      buyLeft.current?.()
      await sleep(100)
      buyLeft.current?.()
      await sleep(100)
      buyLeft.current?.()
      await sleep(100)
      buyLeft.current?.()
      await sleep(400)

      setLeftBalance(3)
      await sleep(500)
      setLeftBalance(2)
    }

    if (prevStep.current < 3 && step === 3) {
      buyStuff()
    }
    prevStep.current = step
  }, [step])

  return (
    <div className="flex flex-col items-center justify-center select-none">
      {step > 1 && (
        <MarketBase
          leftBalance={leftBalance}
          buyLeft={buyLeft}
          left={<Coinsplit />}
          right={<USDCBag amount={rightBalance} />}
        />
      )}
      {step > 0 && <MisterMarket />}
    </div>
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
