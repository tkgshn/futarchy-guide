"use client"
import { COIN_COLOR, STARTING_USDC_BALANCE, USDC_COLOR } from "@/constants"
import { Coin, Coinsplit, USDCSplit } from "../coinsplit/coinsplit"

import { useSpring, animated } from "@react-spring/web"
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { DemoZone } from "../track/intro/DemoZone"
import { FillableBag } from "../bag/bag"
import { USDCBag } from "../bag/usdcbag/usdcbag"
import clsx from "clsx"

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

export function MisterMarket({
  condition,
  price,
  targetPosition,
}: {
  condition?: "pass" | "fail"
  price?: string
  targetPosition: [x: string, y: string]
}) {
  const spring = useSpringEnter()
  const sprong = useSpring({ top: targetPosition[1], left: targetPosition[0] })
  return (
    <animated.div style={spring}>
      <animated.div
        className={clsx(
          "rounded-xl flex flex-col justify-center items-center font-mono text-center",
          "bg-zinc-700 rounded-xl",
          condition === undefined
            ? "border-zinc-300 text-white"
            : condition === "pass"
            ? "border-lime-100 text-lime-100"
            : "border-red-100 text-red-100"
        )}
        style={{
          ...sprong,
          position: "absolute",
          transform: "translate(-50%, -50%)",
          border: "4px dashed",
          width: "250px",
          height: "250px",
        }}
      >
        <div className="text-5xl mb-3">
          {condition === undefined ? (
            "the"
          ) : condition === "pass" ? (
            <span className="text-lime-500">PASS</span>
          ) : (
            <span className="text-red-500">FAIL</span>
          )}{" "}
          market
        </div>
        <div>
          1{" "}
          <span
            style={{ color: condition === undefined ? COIN_COLOR : undefined }}
          >
            {
              {
                none: "",
                fail: <span className="text-red-500">f</span>,
                pass: <span className="text-lime-500">p</span>,
              }[condition ?? "none"]
            }
            META
          </span>{" "}
          :: {price ?? "49,000"}{" "}
          <span
            style={{ color: condition === undefined ? USDC_COLOR : undefined }}
          >
            {
              {
                none: "",
                fail: <span className="text-red-500">f</span>,
                pass: <span className="text-lime-500">p</span>,
              }[condition ?? "none"]
            }
            USDC
          </span>
        </div>
      </animated.div>
    </animated.div>
  )
}

const useStupidSprings = (
  balance: number // this is a lie. its actually like 4 minus this number
) => {
  const idiotBalance = 4 - balance
  const left1 = useSpring({
    left: idiotBalance > 0 ? "50%" : "0%",
    top: idiotBalance > 0 ? "0%" : "100%",
  })
  const left2 = useSpring({
    left: idiotBalance > 1 ? "50%" : idiotBalance > 0 ? "0%" : "3%",
    top: idiotBalance > 1 ? "0%" : idiotBalance > 0 ? "100%" : "103%",
  })
  const left3 = useSpring({
    left:
      idiotBalance > 2
        ? "50%"
        : idiotBalance > 1
        ? "0%"
        : idiotBalance > 0
        ? "3%"
        : "6%",
    top:
      idiotBalance > 2
        ? "0%"
        : idiotBalance > 1
        ? "100%"
        : idiotBalance > 0
        ? "103%"
        : "106%",
  })
  const left4 = useSpring({
    left:
      idiotBalance > 3
        ? "50%"
        : idiotBalance > 2
        ? "0%"
        : idiotBalance > 1
        ? "3%"
        : idiotBalance > 0
        ? "6%"
        : "9%",
    top:
      idiotBalance > 3
        ? "0%"
        : idiotBalance > 2
        ? "100%"
        : idiotBalance > 1
        ? "103%"
        : idiotBalance > 0
        ? "106%"
        : "109%",
  })
  return [left1, left2, left3, left4]
}

export function MarketBase({
  left,
  right,
  buyLeft,
  sellLeft,
  leftBalance, // this is a lie. its actually like 4 minus this number
  bagPosition,
  targetPosition,
}: {
  left: React.ReactNode
  right: React.ReactNode
  buyLeft: MutableRefObject<null | (() => void)>
  sellLeft: MutableRefObject<null | (() => void)>
  leftBalance: number
  bagPosition: [x: string, y: string]
  targetPosition: [x: string, y: string]
}) {
  const [left1, left2, left3, left4] = useStupidSprings(leftBalance)

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
          emitRefSell={sellLeft}
          bagPosition={bagPosition}
          targetPosition={targetPosition}
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

const ANIMATION_DURATION = 1500
export function Market({
  bagPosition,
  marketPosition,
  amountRight,
  amountLeft,
  showMarket,
  showCoins,
  showLeftCoins,
  condition,
  rightLabel,
  price,
}: {
  bagPosition: [x: string, y: string]
  marketPosition: [x: string, y: string]
  amountRight: number
  amountLeft: number
  showMarket: boolean
  showCoins: boolean
  showLeftCoins: boolean
  condition?: "pass" | "fail"
  rightLabel?: string
  price?: string
}) {
  const buyLeft = useRef<null | (() => void)>(null)
  const sellLeft = useRef<null | (() => void)>(null)

  const prevAmountRight = useRef(amountRight)
  const prevAmountLeft = useRef(amountLeft)

  const [awaitedLeftAmount, setAwaitedLeftBalance] = useState(amountLeft)
  const [awaitedRightAmount, setAwaitedRightBalance] = useState(amountRight)

  useEffect(() => {
    const diffRight = amountRight - prevAmountRight.current
    const coinsBought = Math.floor(Math.abs(diffRight / 49000))
    const actionCount = coinsBought * 15
    const actionType = diffRight < 0 ? "buyLeft" : "sellLeft"

    const coinsBought2 = amountLeft - prevAmountLeft.current

    const buyStuff = async () => {
      if (actionType === "buyLeft") {
        setAwaitedRightBalance(amountRight)
        for (let i = 0; i < actionCount; i++) {
          buyLeft.current?.()
          await sleep(ANIMATION_DURATION / actionCount)
        }
      }

      for (let a = 0; a < Math.abs(coinsBought2); a++) {
        await sleep(200)
        setAwaitedLeftBalance(
          (prev) => prev + coinsBought2 / Math.abs(coinsBought2)
        )
        await sleep(200)
      }

      if (actionType === "sellLeft") {
        setAwaitedRightBalance(amountRight)
        for (let b = 0; b < actionCount; b++) {
          await sleep(ANIMATION_DURATION / actionCount)
          sellLeft.current?.()
        }
      }

      setAwaitedLeftBalance(amountLeft) // just to avoid race conditions.
    }
    buyStuff()
    prevAmountRight.current = amountRight
    prevAmountLeft.current = amountLeft
  }, [amountLeft, amountRight])

  return (
    <>
      {showCoins && (
        <MarketBase
          bagPosition={bagPosition}
          targetPosition={marketPosition}
          leftBalance={awaitedLeftAmount}
          buyLeft={buyLeft}
          sellLeft={sellLeft}
          left={
            showLeftCoins &&
            (condition === undefined ? (
              <Coinsplit />
            ) : (
              <Coin condition={condition} />
            ))
          }
          right={
            <USDCBag
              amount={awaitedRightAmount}
              condition={condition}
              label={rightLabel}
            />
          }
        />
      )}
      {showMarket && (
        <MisterMarket
          targetPosition={marketPosition}
          condition={condition}
          price={price}
        />
      )}
    </>
  )
}

export default function Home() {
  const [amountRight, setAmountRight] = useState(STARTING_USDC_BALANCE)
  const [amountLeft, setAmountLeft] = useState(0)

  const buy = () => {
    setAmountRight((prev) => prev - 49000)
    setAmountLeft((prev) => prev + 1)
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24"
      onClick={buy}
    >
      <DemoZone>
        <Market
          showCoins
          showMarket
          marketPosition={["50%", "0%"]}
          bagPosition={["100%", "100%"]}
          amountLeft={amountLeft}
          amountRight={amountRight}
          showLeftCoins
        />
      </DemoZone>
    </main>
  )
}
