"use client"
import { MutableRefObject, ReactNode, useRef, useState } from "react"
import { animated, useTransition } from "@react-spring/web"

const Emitter = ({
  emitRef,
  source,
  target,
  particle,
}: {
  emitRef: MutableRefObject<null | (() => void)>
  source: [x: string, y: string]
  target: [x: string, y: string]
  particle: ReactNode
}) => {
  const [inFlight, setInFlight] = useState<ThingyInFlight[]>([])

  const transitions = useTransition(inFlight, {
    from: { opacity: 0, left: source[0], top: source[1] },
    to: { opacity: 1, left: target[0], top: target[1] },
    enter: (id) => async (next, cancel) => {
      console.log("entering", id)
      await next({ opacity: 1, left: target[0], top: target[1] })
      setInFlight((prev) => prev.filter((x) => x.key !== id.key))
    },
    //leave: { opacity: 1 },
  })

  const emit = () => {
    const id = Math.random().toString(36).substring(2, 8)
    setInFlight((prev) => [...prev, { key: id }])
  }
  emitRef.current = emit

  console.log("aaa", inFlight)

  return (
    <>
      {transitions((style) => (
        <animated.div className={"absolute"} style={style}>
          {particle}
        </animated.div>
      ))}
    </>
  )
}

type ThingyInFlight = { key: string }

const FillableBag = ({
  bagPosition: [bagX, bagY],
  targetPosition: [targetX, targetY],
  bag,
  thingy,
  thingies,
}: {
  bagPosition: [x: string, y: string]
  targetPosition: [x: string, y: string]
  bag: ReactNode
  thingy: ReactNode
  thingies: number
}) => {
  const emitRef = useRef<null | (() => void)>(null)
  const [nummies, setNummies] = useState(0)
  /* 
  const [spring, api] = useSpring(
    () => ({
      top: bagY,
      left: bagX,
      transform: `scale(${1 + nummies / 10})`,
      config: { tension: 200, friction: 20 },
    }),
    [nummies]
  ) */

  return (
    <>
      <Emitter
        emitRef={emitRef}
        source={[bagX, bagY]}
        target={[targetX, targetY]}
        particle={thingy}
      />
      <animated.div
        className={"absolute"}
        //style={spring}
        onClick={() => emitRef.current?.()}
      >
        {bag}
      </animated.div>
    </>
  )
}

export default function Fart() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 relative">
      <div>
        <FillableBag
          bagPosition={["50%", "50%"]}
          targetPosition={["30%", "25%"]}
          bag={<div className="opacity-10 scale-[10]">🛍️</div>}
          thingy={<div className="">🍬</div>}
          thingies={5}
        />
      </div>
    </main>
  )
}
