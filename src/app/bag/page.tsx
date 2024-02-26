import { ReactNode } from "react"

const FillableBag = ({}: {
  bagPostion: [x: string, y: string] // where the bag is
  targetPosition: [x: string, y: string] // where thingies come from when put into bag, or go to when removed from bag
  bag: ReactNode // the bag
  thingy: ReactNode // a thingy
  fillBag: (n: number) => void // fill the bag with n thingies, animated
  emptyBag: (n: number) => void // empty the bag of n thingies, animated
}) => {}
