"use client"
import { MutableRefObject, ReactNode, useEffect, useRef, useState } from "react"
import { useSpring, animated } from "@react-spring/web"
import React from "react"

const Particle = ({
  to: [toX, toY],
  from: [fromX, fromY],
  children,
  onResolve,
  id,
}: {
  to: [x: string, y: string]
  from: [x: string, y: string]
  children: ReactNode
  onResolve?: () => void
  id: string
}) => {
  console.log(" i rerendered!")
  const spring = useSpring({
    from: { opacity: 0, left: fromX, top: fromY },
    to: async (next, cancel) => {
      console.log("bagool", id)
      await next({ opacity: 1, left: toX, top: toY })
      console.log("beep", id)
      onResolve?.()
    },
    //config: { tension: 200, friction: 20 },
  }) /* 
  useEffect(() => {
    const f = async () => {
      const a = api.start(() => ({ left: toX, top: toY }))
      console.log("a", a)
      await a[0]
      console.log(id, "fulffillment!", new Date().toISOString())
      onResolve?.()
    }
    f()
  }, [api, id, onResolve, toX, toY]) */

  useEffect(() => {
    console.log("i rerendered cause of children")
  }, [children])

  return (
    <>
      <animated.div className={"absolute"} style={spring}>
        {children}
      </animated.div>
    </>
  )
}

const MemoParticle = React.memo(Particle)

type EmitterArgs = {
  source: [x: string, y: string]
  target: [x: string, y: string]
  particle: ReactNode
}

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

  const emit = () => {
    const id = Math.random().toString(36).substring(2, 8)
    setInFlight((prev) => [...prev, { key: id }])
  }
  emitRef.current = emit

  console.log("aaa", inFlight)

  return (
    <>
      {inFlight.map((thingy) => (
        <MemoParticle
          key={thingy.key}
          id={thingy.key.toString()}
          to={target}
          from={source}
          onResolve={() =>
            setInFlight((prev) => {
              console.log("purging", thingy.key, prev)
              const next = prev.filter((x) => x.key !== thingy.key)
              console.log(next)
              return next
            })
          }
        >
          {particle}
        </MemoParticle>
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

  const [spring, api] = useSpring(
    () => ({
      top: bagY,
      left: bagX,
      transform: `scale(${1 + nummies / 10})`,
      config: { tension: 200, friction: 20 },
    }),
    [nummies]
  )

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
        style={spring}
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
          bag={<div className="scale-[10] opacity-10">🛍️</div>}
          thingy={<div className="">🍬</div>}
          thingies={5}
        />
      </div>
    </main>
  )
}
