"use client"
import { useEffect } from "react"
import { animated, useSpring } from "@react-spring/web"
import { TypeAnimation } from "react-type-animation"
import useMeasure from "react-use-measure"
import clsx from "clsx"

export const defaultParams = {
  //splitter: (str: string) => str.split(/(?= )/),
  speed: 85,
  cursor: false,
  className: "text-2xl whitespace-pre-line w-full",
} as const

export const BetterTypeAnimation = (
  props: Parameters<typeof TypeAnimation>[0] & {
    doneWaiting: () => void
    fastForward?: boolean
  }
) => {
  const [ref, { height }] = useMeasure()
  //const [donetyping, setDoneTyping] = useState(false)

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
      <span className={clsx(props.fastForward ? "opacity-0" : "opacity-100")}>
        <TypeAnimation
          aria-hidden={true}
          {...defaultParams}
          {...props}
          className={clsx(
            "absolute top-0 left-0 right-0 bottom-0 select-none",
            defaultParams.className
          )}
          sequence={[
            250,
            ...props.sequence,
            (el) => {
              el?.classList.add("typey-waiting") // so fucking dumb
              //setDoneTyping(true)
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
