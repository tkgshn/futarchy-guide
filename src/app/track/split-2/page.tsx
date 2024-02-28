"use client"
import { useState } from "react"
import { Block, DemoZone } from "../intro/page"
import { Splitter, USDCoin } from "@/app/coinsplit/page"
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
  const showFailCoinAfter = 6
  const demonstrateMergeAfter = 8
  const recombineCoinsAfter = 9
  const showCoinAfter = 99
  const splitCoinAfter = 99

  const combineCoins =
    read > demonstrateMergeAfter && read < recombineCoinsAfter

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
              "You need a way to be holding 100% META in the case where the proposal passes, while at the same time holding 100% USDC in the case where the proposal fails.",
            ],
            [
              "How? Let's take a step back. It's time to learn about conditional tokens. For every active proposal, the MetaDAO lets you create conditional tokens.",
            ],
            [
              500,
              "What you're looking at now is 1 USDC, *conditional* upon passing the hypertronics proposal.", // todo insert gag about renaming the token.
              500,
              "What you're looking at now is 1 USDC, *conditional* upon passing the hypertronics proposal. If the proposal passes, it will turn into 1 USDC.", //insert gag about renaming the token.
            ],
            ['For short, we\'ll call it "pass USDC", or pUSDC.'],
            ["Likewise, it has a sister token: fUSDC."],
            [
              "If the proposal passes, the pUSDC will become USDC. If the proposal fails, the fUSDC will become USDC.",
            ],
            ["Thus, having one of each is the same as just having 1 USDC."],
            [
              "That's not the interesting part. The interesting part is that you can *trade* each of them separately, for conditional meta.",
            ], // todo timing
            ["Let's split your USDC bag now."],
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
                <USDCoin
                  condition="pass"
                  label={!combineCoins ? "1 pUSDC" : "1 USDC"}
                />
              </AnimatedEnter>
            }
            right={
              read > showFailCoinAfter ? (
                <AnimatedEnter>
                  <USDCoin
                    condition="fail"
                    label={!combineCoins ? "1 fUSDC" : "1 USDC"}
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
