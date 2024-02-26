"use client"
import { ReactNode, useEffect, useState } from "react"
import { useTrail, useSpring, animated } from "@react-spring/web"

const Thingy = ({
  to: [toX, toY],
  from: [fromX, fromY],
  children,
  count,
  onResolve,
}: {
  count: number
  to: [x: string, y: string]
  from: [x: string, y: string]
  children: ReactNode
  onResolve?: () => void
}) => {
  const spring = useTrail(count, {
    onResolve: () => console.log("resolved"),
    from: { left: fromX, top: fromY },
    to: async (next, cancel) => {
      console.log("bong!", new Date().getTime())
      await next({ left: toX, top: toY })
      onResolve?.()
      console.log("bing!", new Date().getTime())
    },
    config: { tension: 200, friction: 20 },
  })

  return (
    <>
      {spring.map((props, index) => (
        <animated.div className={"absolute"} key={index} style={props}>
          {children}
        </animated.div>
      ))}
    </>
  )
}

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
  const [a, setA] = useState(true)

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

  useEffect(() => {
    // Perform any additional logic or side effects here
    // when the number of thingies changes
  }, [thingies])

  return (
    <>
      <Thingy
        count={8}
        to={a ? [bagX, bagY] : [targetX, targetY]}
        from={a ? [targetX, targetY] : [bagX, bagY]}
        onResolve={() => setNummies((prev) => prev + 1)}
      >
        {thingy}
      </Thingy>
      <animated.div
        className={"absolute"}
        style={spring}
        onClick={() => setA(!a)}
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
          bag={<div className="scale-[10]">🛍️</div>}
          thingy={<div className="">🍬</div>}
          thingies={5}
        />
      </div>
    </main>
  )
}
