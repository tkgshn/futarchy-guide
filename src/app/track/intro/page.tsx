"use client"
import { useState, ReactNode, useEffect } from "react"
import { animated, useSpring } from "@react-spring/web"
import { TypeAnimation } from "react-type-animation"
import { useParams, useRouter } from "next/navigation"
import useMeasure from "react-use-measure"

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

const BetterTypeAnimation = (
  props: Parameters<typeof TypeAnimation>[0] & {
    doneWaiting: () => void
    fastForward?: boolean
  }
) => {
  const [ref, { height }] = useMeasure()

  const [spring, api] = useSpring(
    () => ({ from: { height: 0, marginTop: 0 } }),
    []
  )
  useEffect(() => {
    api.start({ to: { height: height, marginTop: 24 } })
  }, [api, height])
  console.log("height", height)

  const finalText = props.sequence.findLast(
    (x) => typeof x === "string"
  ) as string

  return (
    <animated.div className="relative" style={spring}>
      <div
        ref={ref}
        className={
          (props.fastForward ? "opacity-100" : "opacity-0") +
          " select-none " +
          defaultParams.className
        }
      >
        {finalText}
      </div>
      <span className={props.fastForward ? "opacity-0" : "opacity-100"}>
        <TypeAnimation
          aria-hidden={true}
          {...defaultParams}
          {...props}
          className={
            "absolute top-0 left-0 right-0 bottom-0 select-none " +
            defaultParams.className
          }
          sequence={[
            250,
            ...props.sequence,
            () => {
              if (!props.fastForward) {
                //TODO? this might need to use a ref, but not sure i even care.
                props.doneWaiting()
              }
            },
          ]}
        />
      </span>
    </animated.div>
  )
}

const Block1 = ({
  read,
  doneWaiting,
  fade,
}: {
  read: number
  doneWaiting: () => void
  fade: boolean
}) => {
  const spring = useSpring({
    from: { opacity: 1 },
    to: {
      opacity: fade ? 0.5 : 1,
      y: fade ? -48 : 0,
    },
  })

  return (
    <animated.div className="flex flex-col" style={spring}>
      {read > -1 && (
        <BetterTypeAnimation
          doneWaiting={doneWaiting}
          fastForward={read > 0}
          sequence={[
            "The year is 2064.",
            500,
            "The year is 2064. \n You just got word on the byte nexus that the Meta-dao might be the first corp to fit asteroid miners with hypertronic tractor beams.",
          ]}
        />
      )}
      {read > 0 && (
        <BetterTypeAnimation
          doneWaiting={doneWaiting}
          fastForward={read > 1}
          sequence={[
            "You know tractor beams.",
            500,
            "You know tractor beams. The biggest beam corps from Earth say hypertronic isn’t worth the plutonium, they say it barely moves the needle.",
          ]}
        />
      )}
      {read > 1 && (
        <BetterTypeAnimation
          doneWaiting={doneWaiting}
          fastForward={read > 2}
          sequence={[
            "Yeah right.",
            500,
            "Yeah right. Hypertronic changes everything.",
          ]}
        />
      )}
      {read > 2 && (
        <BetterTypeAnimation
          fastForward={read > 3}
          doneWaiting={doneWaiting}
          sequence={["You want in."]}
        />
      )}
    </animated.div>
  )
}

const Block = ({
  read,
  doneWaiting,
  fade,
  sequences,
}: {
  read: number
  doneWaiting: () => void
  fade: boolean
  sequences: Parameters<typeof TypeAnimation>[0]["sequence"][]
}) => {
  const spring = useSpring({
    from: { opacity: 1 },
    to: {
      opacity: fade ? 0.5 : 1,
      y: fade ? -48 : 0,
    },
  })

  return (
    <animated.div className="flex flex-col" style={spring}>
      {sequences.map(
        (sequence, index) =>
          read > index && (
            <BetterTypeAnimation
              key={
                index + sequence.filter((x) => typeof x === "string").join("")
              }
              doneWaiting={doneWaiting}
              sequence={sequence}
              fastForward={read > index + 1}
            />
          )
      )}
    </animated.div>
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
    // if (!waiting) {
    setRead((prev) => prev + 1)
    //}
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-start p-24"
      onClick={nextChat}
    >
      {/*      <Enter isVisible={step > 0}>
        <Coinsplit />
      </Enter> */}

      <div className="mb-4 h-[40vh] w-full flex flex-col gap-4 overflow-scroll justify-end">
        <Block1
          read={read}
          doneWaiting={() => setWaiting(false)}
          fade={read > 3}
        />
        <Block
          read={read - 3}
          doneWaiting={() => setWaiting(false)}
          fade={step === "2"}
          sequences={[
            [
              500,
              "You’ve traded DAO shares before. It’s not all that different from how your mom traded stocks on the oldnet in 2020. You can get all the META you want, as long as you have the cash. ",
              500,
            ],
          ]}
        />
      </div>
      {/* <button
        className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ${
          waiting ? "opacity-50" : ""
        }`}
        onClick={advance}
        disabled={waiting}
      >
        {waiting ? ". . ." : "gimme"}
      </button> */}
    </main>
  )
}
