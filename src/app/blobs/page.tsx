"use client"
import useMeasure from "react-use-measure"
import { useTrail, animated } from "@react-spring/web"

import styles from "./styles.module.css"
import { USDCSplit } from "../coinsplit/page"

const fast = { tension: 1200, friction: 40 }
const slow = { mass: 1, tension: 800, friction: 10 }
const trans = (x: number, y: number) =>
  `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`

const seededRandomXY = (seed: number) => {
  const random = (seed: number) => {
    let x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  const angle = random(seed) * Math.PI * 2
  const radius = random(seed + 1)
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius

  return [x * 100, y * 100] as const
}

export default function App() {
  const [trail, api] = useTrail(50, (i) => ({
    xyi: [0, 0],
    config: fast,
  }))
  const [ref, { left, top }] = useMeasure()

  const handleMouseMove = (e) => {
    api.start((i) => {
      return { xyi: i % 2 == 0 ? [e.clientX - left, e.clientY, 0] : [0, 0, 0] }
    })
  }

  return (
    <div>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="goo">
          {/* <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" /> */}
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
          />
        </filter>
      </svg>
      <div ref={ref} className={styles.hooksMain} onClick={handleMouseMove}>
        {trail.map((props, index) => (
          <animated.div
            key={index}
            style={{ zIndex: 100 - index, transform: props.xyi.to(trans) }}
          >
            <div style={{ transform: `translate3d(0px,${index * 3}px,0)` }}>
              <USDCSplit />
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}
