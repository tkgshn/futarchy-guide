import { MutableRefObject, useRef } from "react"

type Emitter = {}
const makeEmitter = (): Emitter => {
  return {}
}

type Pos = [top: string, left: string]

const useEmitter = (
  source: MutableRefObject<HTMLDivElement | null>,
  options: {}
) => {
  const emitter = useRef<Emitter>(makeEmitter())

  const emitTo = (target: Pos) => {}

  return {}
}
