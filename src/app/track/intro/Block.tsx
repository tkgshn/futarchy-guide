"use client"
import { animated, useSpring } from "@react-spring/web"
import React from "react"
import { BetterTypeAnimation } from "./BetterTypeAnimation"
import { BlockSequence } from "./page"

export const Block = ({
  read,
  doneWaiting,
  //fade,
  sequences,
  neverFade,
}: {
  read: number
  doneWaiting: () => void
  //fade: boolean
  sequences: BlockSequence
  neverFade?: boolean
}) => {
  const fade = !neverFade && read > sequences.length

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
