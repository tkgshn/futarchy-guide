"use client"
import { useState, ReactNode, useEffect } from "react"
import { animated, useSpring } from "@react-spring/web"
import { TypeAnimation } from "react-type-animation"
import { useParams, useRouter } from "next/navigation"
import useMeasure from "react-use-measure"
import { Market } from "@/app/market/page"
import React from "react"

const defaultParams = {
  //splitter: (str: string) => str.split(/(?= )/),
  speed: 85,
  wrapper: "div",
  cursor: false,
  className: "text-2xl whitespace-pre-line text-left w-full",
} as const

export const useHash = () => {
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

export const BetterTypeAnimation = (
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

  // trigger all callbacks if fastforwarded?

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
            "You know tractor beams like the back of your hand.",
            500,
            "You know tractor beams like the back of your hand. The biggest beam corps from Earth say hypertronic isn’t worth the plutonium, they say it barely moves the needle.",
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

type BlockSequence = (
  | Parameters<typeof TypeAnimation>[0]["sequence"]
  | ReactNode
)[]

export const Block = ({
  read,
  doneWaiting,
  fade,
  sequences,
}: {
  read: number
  doneWaiting: () => void
  fade: boolean
  sequences: BlockSequence
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
          read > index &&
          (Array.isArray(sequence) ? (
            <BetterTypeAnimation
              key={
                index + sequence.filter((x) => typeof x === "string").join("")
              }
              doneWaiting={doneWaiting}
              sequence={sequence}
              fastForward={read > index + 1}
            />
          ) : (
            <React.Fragment key={index}>{sequence}</React.Fragment>
          ))
      )}
    </animated.div>
  )
}

export function DemoZone({ children }: { children?: ReactNode }) {
  return (
    <div className="w-full flex-1 flex flex-col py-12 justify-center items-center">
      <div className="w-full h-full flex-1 max-w-[404px] max-h-[350px] relative flex justify-center items-center">
        {children}
      </div>
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
    // if (!waiting) {
    setRead((prev) => prev + 1)
    //}
  }

  const [marketStep, setMarketStep] = useState(0)

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-start p-24"
      onClick={nextChat}
    >
      {/*      <Enter isVisible={step > 0}>
        <Coinsplit />
      </Enter> */}

      <div className="mb-4 h-[30vh] w-full flex flex-col gap-4 overflow-scroll justify-end">
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
            ],
            [
              "That's where the market comes in.",
              250,
              "That's where the market comes in..",
              250,
              "That's where the market comes in...",
              500,
              () => setMarketStep(Math.max(marketStep, 1)),
              "That's where the market comes in.",
            ],
            [
              "You check out prices.",
              500,
              "You check out prices. 1 META = 49,000 USDC.", // TODO animate this
            ],
            [
              "It’s low. ",
              250,
              "It’s low. Meta-dao announced exploratory investment in hypertronics a month ago and the price has barely moved an inch.",
              250,
              "It’s low. Meta-dao announced exploratory investment in hypertronics a month ago and the price has barely moved an inch. You’re still early.",
            ],
            [
              "You portion out your budget",
              500,
              () => setMarketStep(Math.max(marketStep, 2)),
              1000,

              "You portion out your budget and buy a few META. ",
              500,
              () => setMarketStep(Math.max(marketStep, 3)),
            ],
            [
              "Woah woah, slow down. MetaDAO is a *futarchy*. Sure, you can trade this news on the spot market, but there’s a *much better* way. Go ahead and undo that purchase. You’ll thank me later.",
            ],
            /*<BetterTypeAnimation
              key="wumbo1"
              doneWaiting={() => setWaiting(false)}
              sequence={["a"]}
              fastForward={read - 3 > 8}
            />,*/
          ]}
        />
      </div>
      <DemoZone>
        <Market step={marketStep} />
      </DemoZone>
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
