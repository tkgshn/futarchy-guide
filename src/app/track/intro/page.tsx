"use client"
import { useState, ReactNode, useEffect } from "react"
import { animated, useSpring } from "@react-spring/web"
import { TypeAnimation } from "react-type-animation"
import { useParams, useRouter } from "next/navigation"

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
  //splitter: (str: string) => str.split(/(?= )/),
  speed: 85,
  wrapper: "div",
  cursor: false,
  className: "text-2xl whitespace-pre-line text-left w-full",
  preRenderFirstString: true,
} as const

const useHash = () => {
  const router = useRouter()

  const params = useParams()
  const [hash, setHash] = useState("")

  useEffect(() => {
    const currentHash = window.location.hash.replace("#", "")
    setHash(currentHash)
  }, [params])

  const pushHash = (x: string) => router.push(`#${x}`)

  return [hash, pushHash] as const
}

const Block1 = ({
  read,
  doneWaiting,
}: {
  read: number
  doneWaiting: () => void
}) => {
  return (
    <div className="flex flex-col gap-4">
      {
        <TypeAnimation
          {...defaultParams}
          sequence={[
            " ",
            "The year is 2064.",
            500,
            "The year is 2064. \n\r You just got word on the byte nexus that the Meta-dao might be the first corp to fit asteroid miners with hypertronic tractor beams.",
            doneWaiting,
          ]}
        />
      }
      {read > 0 && (
        <TypeAnimation
          {...defaultParams}
          sequence={[
            " ",
            "You know tractor beams.",
            500,
            "You know tractor beams. The biggest beam corps from Earth say hypertronic isn’t worth the plutonium, they say it barely moves the needle.",
            doneWaiting,
          ]}
        />
      )}
      {read > 1 && (
        <TypeAnimation
          {...defaultParams}
          sequence={[
            " ",
            "Yeah right.",
            500,
            "Yeah right. Hypertronic changes everything.",
            doneWaiting,
          ]}
        />
      )}
      {read > 2 && (
        <TypeAnimation
          {...defaultParams}
          sequence={[" ", "You want in.", doneWaiting]}
        />
      )}
    </div>
  )
}

export default function Intro() {
  const [read, setRead] = useState(0)

  const [hash, pushStep] = useHash()
  const step = hash === "" ? "0" : hash

  const [waiting, setWaiting] = useState(true)

  const advance = () => {
    setWaiting(true)
    console.log("ss", step)
    pushStep((parseInt(step) + 1).toString())
  }

  const nextChat = () => {
    setWaiting(true)
    if (!waiting) {
      setRead((prev) => prev + 1)
    }
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24"
      onClick={nextChat}
    >
      {/*      <Enter isVisible={step > 0}>
        <Coinsplit />
      </Enter> */}

      <div className="mt-12 mb-4 min-h-10 w-full flex flex-col gap-4">
        <Block1 read={read} doneWaiting={() => setWaiting(false)} />
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
