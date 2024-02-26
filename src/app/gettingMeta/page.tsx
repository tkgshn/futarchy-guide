"use client"
import { useState, ReactNode } from "react"
import { Coinsplit } from "../coinsplit/page"
import { animated, useSpring } from "@react-spring/web"
import { TypeAnimation } from "react-type-animation"

const Enter = ({
  isVisible,
  children,
}: {
  isVisible: boolean
  children: ReactNode
}) => {
  const animation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(-100px)",
  })

  return (
    <animated.div className="overflow-hidden" style={animation}>
      {children}
    </animated.div>
  )
}

const defaultParams = {
  splitter: (str) => str.split(/(?= )/),
  wrapper: "span",
  cursor: false,
  style: { fontSize: "2em", display: "inline-block" },
}

export default function Home() {
  const [step, setStep] = useState(0)
  const [waiting, setWaiting] = useState(true)

  const advance = () => {
    setWaiting(true)
    setStep((prev) => (prev + 1) % 3)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Enter isVisible={step > 0}>
        <Coinsplit />
      </Enter>

      <div className="mt-12 mb-4 min-h-10">
        {" "}
        {step === 0 ? (
          <TypeAnimation
            preRenderFirstString={true}
            key={step}
            splitter={(str) => str.split(/(?= )/)}
            sequence={[
              " ",
              "OK, in order to get started, you're going to need some META.", // Types 'One'
              100, // Waits 1s
              () => setWaiting(false),
            ]}
            wrapper="span"
            cursor={false}
            className="text-2xl"
          />
        ) : (
          <TypeAnimation
            preRenderFirstString={true}
            key={step}
            splitter={(str) => str.split(/(?= )/)}
            sequence={[
              " ",
              "Now you will need to split it", // Types 'One'
              100, // Waits 1s
              () => setWaiting(false),
            ]}
            wrapper="span"
            cursor={false}
            className="text-2xl"
          />
        )}
      </div>
      <button
        className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ${
          waiting ? "opacity-50" : ""
        }`}
        onClick={advance}
        disabled={waiting}
      >
        {waiting ? ". . ." : "gimme"}
      </button>
    </main>
  )
}
