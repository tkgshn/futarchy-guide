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

  const splitCoinAt = 1

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
          sequences={[["Bababooey"]]}
        />
      </div>
      <DemoZone>
        <Coinsplit split={read > splitCoinAt ? true : false} />
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
