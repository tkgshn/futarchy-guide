import { ReactNode } from "react"

const FillableBag = ({}: {
  bagPostion: [x: string, y: string] // where the bag is
  targetPosition: [x: string, y: string] // where thingies come from when put into bag, or go to when removed from bag
  bag: ReactNode // the bag
  thingy: ReactNode // a thingy
  thingies: number // the number of thingies in the bag
}) => {
  // use useEffect to watch for the number of thingies in the bag changing, and animate the thingies moving to and from the bag

  // use useTrail to animate the thingies moving to and from the bag

  // use useSpring to animate the bag growing and shrinking based on the number of thingies in it

  return <></>
}
