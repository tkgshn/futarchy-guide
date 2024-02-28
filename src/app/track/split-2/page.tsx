"use client"
import { useState } from "react"
import { Block } from "../intro/Block"
import { BetterTypeAnimation } from "../intro/BetterTypeAnimation"
import { Splitter, USDCoin } from "@/app/coinsplit/coinsplit"
import { AnimatedEnter, Market } from "@/app/market/market"
import { PMETA_PRICE, STARTING_USDC_BALANCE } from "@/constants"

export default function Chapter2() {
  const [read, setRead] = useState(0)

  const [waiting, setWaiting] = useState(true)

  const nextChat = () => {
    setWaiting(true)
    // if (!waiting) {
    setRead((prev) => prev + 1)
    //}
  }

  const showPassCoinAfter = 4
  const showFailCoinAfter = 6
  const demonstrateMergeAfter = 8
  const endCoinDemoAfter = 9

  const beginTradingDemoAfter = 10
  const splitBagAFter = 11
  const showMarketsAfter = 12
  const buypMetaAfter = 13

  //const recombineCoinsAfter = 9
  const showCoinAfter = 99
  const splitCoinAfter = 99

  const combineCoins = read > demonstrateMergeAfter && read <= splitBagAFter //&& read <= recombineCoinsAfter

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-start p-24"
      onClick={nextChat}
    >
      <div className="mb-4 h-[30vh] w-full flex flex-col gap-4 overflow-y-scroll justify-end max-w-3xl">
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
              "That's not the interesting part. The interesting part is that you can *trade* each of them separately, for conditional META.",
            ], // todo timing
            ["Get out your USDC again, let's split it."], //todo timing
            [
              "As I mentioned, you can trade your pUSDC and fUSDC separately. There's a market for each.",
            ], //todo timing
            [
              "What you want is to have META in the event that the proposal passes, but keep your USDC in the event that the proposal fails.",
              500,
              "What you want is to have META in the event that the proposal passes, but keep your USDC in the event that the proposal fails. That means you want to trade your pUSDC for pMETA, and but not trade your fUSDC.",
            ],
            [
              "Perfect.",
              500,
              "Perfect. Now you've invested like a proper futarchic cyberdenizen.",
              500,
              `Perfect. Now you've invested like a proper futarchic cyberdenizen. If the proposal passes, you'll have 2 META and $${
                STARTING_USDC_BALANCE - PMETA_PRICE * 2
              } USDC. If the proposal fails, you'll have $${STARTING_USDC_BALANCE} USDC, just as you started.`,
            ],
            <span key="great" className="text-right text-yellow-400">
              <BetterTypeAnimation
                doneWaiting={() => setWaiting(false)}
                sequence={["Great. When will the DAO vote on the proposal?"]}
                fastForward={read - 3 > 8}
              />
            </span>,
            ["Right. I forgot. You're clueless."],
            [
              "Because the pass market and fail market are separate, their prices can diverge. Each market shows us what traders believe META is worth if the proposal passes versus if it fails.",
            ],
            ["In this case, pMETA is trading below "],
          ]}
        />
      </div>

      <div className="w-full flex-1 flex flex-col py-12 justify-center items-center select-none">
        <div
          className={
            "w-full h-full flex-1 max-h-[350px] relative scale-90" +
            " " +
            (read < beginTradingDemoAfter ? "max-w-[404px]" : "max-w-[808px]")
          }
        >
          {/*  {read > showPassCoinAfter && (
          <Coin condition="pass" label={"1 pMETA"} />
        )} */}
          {read > showPassCoinAfter && (
            <Splitter
              split={!combineCoins && read > showFailCoinAfter}
              left={
                read <= endCoinDemoAfter ? (
                  <AnimatedEnter key="conditional tokens">
                    <USDCoin
                      condition="pass"
                      label={!combineCoins ? "1 pUSDC" : "1 USDC"}
                    />
                  </AnimatedEnter>
                ) : read <= beginTradingDemoAfter ? null : (
                  <AnimatedEnter key="trading">
                    <div className="relative w-[404px] h-[300px] scale-75">
                      <Market
                        showCoins={true}
                        showMarket={read > showMarketsAfter}
                        showLeftCoins={read > buypMetaAfter}
                        bagPosition={
                          read > showMarketsAfter
                            ? ["100%", "100%"]
                            : ["50%", "50%"]
                        }
                        marketPosition={["50%", "0%"]}
                        amountLeft={read <= buypMetaAfter ? 0 : 2}
                        amountRight={
                          read <= buypMetaAfter
                            ? STARTING_USDC_BALANCE
                            : STARTING_USDC_BALANCE - PMETA_PRICE * 2
                        }
                        condition="pass"
                        rightLabel={!combineCoins ? "pUSDC" : "USDC"}
                        price={PMETA_PRICE.toLocaleString()}
                      />
                    </div>
                  </AnimatedEnter>
                )
              }
              right={
                read > showFailCoinAfter ? (
                  read <= endCoinDemoAfter ? (
                    <AnimatedEnter key="conditional tokens">
                      <USDCoin
                        condition="fail"
                        label={!combineCoins ? "1 fUSDC" : "1 USDC"}
                      />
                    </AnimatedEnter>
                  ) : read <= beginTradingDemoAfter ? null : (
                    <AnimatedEnter key="trading">
                      <div className="relative w-[404px] h-[300px] scale-75">
                        <Market
                          showCoins={true}
                          showMarket={read > showMarketsAfter}
                          showLeftCoins={false}
                          bagPosition={
                            read > showMarketsAfter
                              ? ["100%", "100%"]
                              : ["50%", "50%"]
                          }
                          marketPosition={["50%", "0%"]}
                          amountLeft={0}
                          amountRight={STARTING_USDC_BALANCE}
                          condition="fail"
                          rightLabel={!combineCoins ? "fUSDC" : "USDC"}
                          price={"49,003"}
                        />
                      </div>
                    </AnimatedEnter>
                  )
                ) : null
              }
            />
          )}
          {}
        </div>
      </div>
    </main>
  )
}
