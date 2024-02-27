"use client"
import { useState } from "react"
import { Block, DemoZone } from "../intro/page"
import { Coinsplit } from "@/app/coinsplit/page"

export default function Chapter2() {
  const [read, setRead] = useState(0)

  const [waiting, setWaiting] = useState(true)

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
      <div className="mb-4 h-[30vh] w-full flex flex-col gap-4 overflow-scroll justify-end">
        <Block
          read={read}
          doneWaiting={() => setWaiting(false)}
          fade={false}
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
              "It’s low. Meta-dao announced exploratory investment in hypertronics a month ago and the price has barely moved an inch.  ",
              250,
              "It’s low. Meta-dao announced exploratory investment in hypertronics a month ago and the price has barely moved an inch. You’re still early. ",
            ],
            [
              "You portion out your budget",
              500,
              () => setMarketStep(Math.max(marketStep, 2)),
              "You portion out your budget and buy a few META. ",
              500,
              () => setMarketStep(Math.max(marketStep, 3)),
            ],
            ["."],
            ["But that was a mistake. MetaDAO is a futarchy. "],
          ]}
        />
      </div>
      <DemoZone>
        <Coinsplit />
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
