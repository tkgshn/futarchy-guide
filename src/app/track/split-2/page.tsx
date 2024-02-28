"use client"
import { useState } from "react"
import { Block, DemoZone } from "../intro/page"
import { Coin, Splitter } from "@/app/coinsplit/page"
import { AnimatedEnter } from "@/app/market/page"

export default function Chapter2() {
  const [read, setRead] = useState(0)

  const [waiting, setWaiting] = useState(true)

  const nextChat = () => {
    setWaiting(true)
    // if (!waiting) {
    setRead((prev) => prev + 1)
    //}
  }

  const showPassCoinAfter = 3
  const showFailCoinAfter = 5
  const showCoinAfter = 99
  const splitCoinAfter = 99

  const combineCoins = false

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
              "You see, rolling out hypertronic tractor beams is still a *proposal*. You only want to buy META in the event that that proposal passes, right? If the proposal fails, your investment thesis -- and the MetaDAO's efforts to grow mining revenue -- will fail right along with it.",
            ],
            [
              "What you want is for your investment to be *conditional* on the proposal passing. That way, if the proposal fails, you'll have kept your money.'",
            ],
            [
              "In order to do that, we need to take a step back and explain conditional tokens.",
            ],
            [
              500,
              "What you're looking at now is 1 META, conditional upon passing the hypertronics proposal. For short, let's call it \"pass META\", or pMETA.", //insert gag about renaming the token.
            ],
            [
              "It functions like any other token: \n   you can buy it, sell it, or trade it. ",
            ],
            ["Likewise, it has a sister token: fMETA. "],
          ]}
        />
      </div>
      <DemoZone>
        {/*  {read > showPassCoinAfter && (
          <Coin condition="pass" label={"1 pMETA"} />
        )} */}
        {read > showPassCoinAfter && (
          <Splitter
            split={!combineCoins && read > showFailCoinAfter}
            left={
              <AnimatedEnter>
                <Coin
                  condition="pass"
                  label={!combineCoins ? "1 pMETA" : "1 META"}
                />
              </AnimatedEnter>
            }
            right={
              read > showFailCoinAfter ? (
                <AnimatedEnter>
                  <Coin
                    condition="fail"
                    label={!combineCoins ? "1 fMETA" : "1 META"}
                  />
                </AnimatedEnter>
              ) : null
            }
          />
        )}
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
