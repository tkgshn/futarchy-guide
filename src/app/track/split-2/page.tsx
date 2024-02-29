"use client"
import { useEffect, useState } from "react"
import { Block } from "../intro/Block"
import { BetterTypeAnimation } from "../intro/BetterTypeAnimation"
import { Splitter, USDCoin } from "@/app/coinsplit/coinsplit"
import { AnimatedEnter, Market } from "@/app/market/market"
import { PMETA_PRICE, STARTING_USDC_BALANCE } from "@/constants"
import clsx from "clsx"
import { animated, useSpring } from "@react-spring/web"
import { Redeem2 } from "@/app/redeem/page"
import { Transition } from "@headlessui/react"

const usePriceAnimation = (go: boolean) => {
  const spring = useSpring({
    passPrice: !go ? PMETA_PRICE : 49800,
  })
}

/** input: number of minutes
 * output: formatted string in form of: 00d 00h 00m
 */
const formatCountdown = (minutes: number) => {
  const days = Math.floor(minutes / 1440)
  const hours = Math.floor((minutes % 1440) / 60)
  const remainingMinutes = Math.floor(minutes % 60)

  const formattedDays = days.toString().padStart(2, "0")
  const formattedHours = hours.toString().padStart(2, "0")
  const formattedMinutes = remainingMinutes.toString().padStart(2, "0")

  return `${formattedDays}d ${formattedHours}h ${formattedMinutes}m`
}

//
const TIME_LEFT = 1440 * 4 - 870

export default function Chapter2() {
  const [read, setRead] = useState(1)

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
  const discussFutarchyAfter = 17

  const startedWatchingMarket = read > 26
  const finishedWatchingMarket = read > 27

  const itsTimeToBeginRedemption = read > 29
  const discardFail = read > 30
  const discardFail2 = discardFail
  const REDEEEM = read > 32
  //const hideMarketsFinal

  const combineCoins = read > demonstrateMergeAfter && read <= splitBagAFter //&& read <= recombineCoinsAfter

  const passPrice =
    read <= buypMetaAfter
      ? PMETA_PRICE
      : !startedWatchingMarket
      ? PMETA_PRICE + 2
      : 51200
  const failPrice = !startedWatchingMarket ? 49003 : 48300
  const [priceSpring, priceApi] = useSpring(
    () => ({
      from: { passPrice: PMETA_PRICE, failPrice: 49003 },
    }),
    []
  )

  useEffect(() => {
    if (!startedWatchingMarket) {
      priceApi.start({
        to: { passPrice, failPrice },
        config: { duration: 1500 },
      })
    } else {
      const totalDuration = 10000

      priceApi.start({
        to: async (next) => {
          await next({
            passPrice: PMETA_PRICE + 400,
            failPrice: 49003 - 500,
            config: { duration: 2000 },
          })
          await next({
            passPrice: PMETA_PRICE + 1000,
            failPrice: 49003 - 300,
            config: { duration: 2000 },
          })
          await next({
            passPrice: PMETA_PRICE + 2000,
            failPrice: 49003 - 800,
            config: { duration: 2000 },
          })
          await next({
            passPrice: PMETA_PRICE + 2100,
            failPrice: 49003 - 500,
            config: { duration: 2000 },
          })
          await next({
            passPrice: passPrice,
            failPrice: failPrice,
            config: { duration: 2000 },
          })
        },
      })
    }
  }, [failPrice, passPrice, priceApi, startedWatchingMarket])

  const clockSpring = useSpring({
    clock: startedWatchingMarket ? 0 : TIME_LEFT,
    config: { duration: 10000 },
  })
  const clockOpacity = useSpring({
    opacity: !startedWatchingMarket || finishedWatchingMarket ? 0 : 1,
  })

  // const asr = useSpringRef()
  const areaSizeSpring = useSpring({
    //ref: asr,
    maxWidth:
      (read < beginTradingDemoAfter || read > discussFutarchyAfter) &&
      !itsTimeToBeginRedemption
        ? "404px"
        : "808px",
  })

  //const fudr = useSpringRef()
  const fusdcLeaveSpring = useSpring({
    //ref: fudr,
    opacity: discardFail ? 0 : 1,
    //maxWidth: discardFail ? "0%" : "100%",
  })
  //useChain([fudr, asr])

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-start p-24"
      onClick={nextChat}
    >
      <div className="mb-20 h-[30vh] w-full flex flex-col gap-4 justify-end max-w-3xl">
        <Block
          read={read}
          doneWaiting={() => setWaiting(false)}
          //fade={false}
          sequences={[
            [
              "You see, rolling out hypertronic tractor beams is still a *proposal*. You only want to buy META in the event that that proposal passes, right? If the proposal fails, your investment thesis -- and the MetaDAO's efforts to grow mining revenue -- will fail right along with it.",
            ], // 1
            [
              "What you want is for your investment to be *conditional* on the proposal passing. That way, if the proposal fails, you'll have kept your money.",
            ], // 2
            [
              "You need a way to be holding META in the case where the proposal passes, while at the same time holding USDC in the case where the proposal fails.",
            ], // 3
            [
              "How? Let's take a step back. It's time to learn about conditional tokens. For every active proposal, the MetaDAO lets you create conditional tokens.",
            ], // 4
            [
              500,
              "What you're looking at now is 1 USDC, *conditional* upon passing the hypertronics proposal.", // todo insert gag about renaming the token.
              500,
              "What you're looking at now is 1 USDC, *conditional* upon passing the hypertronics proposal. If the proposal passes, it will turn into 1 USDC.", //insert gag about renaming the token.
            ], // 5
            ['For short, we\'ll call it "pass USDC", or pUSDC.'], // 6
            ["Likewise, it has a sister token: fUSDC."], //7
            [
              "If the proposal passes, the pUSDC will become USDC. If the proposal fails, the fUSDC will become USDC.",
            ], //8
            ["Thus, having one of each is the same as just having 1 USDC."], //9
            [
              "That's not the interesting part. The interesting part is that you can *trade* each of them separately, for conditional META.",
            ], //10  // todo timing
            ["Get out your USDC again, let's split it."], // 11 //todo timing
            [
              "As I mentioned, you can trade your pUSDC and fUSDC separately. There's a market for each.",
            ], //12 //todo timing
            [
              "What you want is to have META in the event that the proposal passes, but keep your USDC in the event that the proposal fails.",
              500,
              "What you want is to have META in the event that the proposal passes, but keep your USDC in the event that the proposal fails. That means you want to trade your pUSDC for pMETA, but keep your fUSDC.",
            ], //13
            [
              "Perfect.",
              500,
              "Perfect. Now you've invested like a proper futarchic cyberdenizen.",
              500,
              `Perfect. Now you've invested like a proper futarchic cyberdenizen. If the proposal passes, you'll have 2 META and $${
                STARTING_USDC_BALANCE - PMETA_PRICE * 2
              } USDC. If the proposal fails, you'll have $${STARTING_USDC_BALANCE} USDC, just as you started.`,
            ], //14
            <span key="great" className="text-yellow-400 ml-8 -mr-8">
              <BetterTypeAnimation
                doneWaiting={() => setWaiting(false)}
                sequence={["Great. When will the DAO vote on the proposal?"]}
                fastForward={read > 15}
              />
            </span>, //15
            ["Right. I forgot. You're clueless."], //16
          ]}
        />
        <Block
          read={read - 16}
          doneWaiting={() => setWaiting(false)}
          //fade={false}
          sequences={[
            [
              "You didn't realize it yet, but this *is* the vote, and you just voted.",
            ], //17
            [
              "You're done investing, so let's forget about your tokens for a moment and just focus on the markets.",
            ], //18
            /*  [
              "To be clear-- your investment doesn't actually require you to understand how the MetaDAO is governed. If the proposal passes, you invest, and if it doesn't, you don't; you don't need to predict whether the proposal passes, because in either case, you've already allocated your funds the way you wanted.",
            ], */
            [
              "Because the markets are separate, their prices will diverge; traders come to a consensus on the price of META in the world where the proposal passes, and a separate consensus on the price of META if the proposal fails.",
            ], //19
            [
              "A futarchic DAO is market-driven; for every proposal made, a pair of conditional markets like these is created. If the pass market prices META at a higher price than the fail market, the proposal passes. Otherwise, it fails.",
            ], //20
            <span key="thatsit" className="text-yellow-400 ml-8 -mr-8">
              <BetterTypeAnimation
                doneWaiting={() => setWaiting(false)}
                sequence={[
                  "That's it? The DAO is just governed by conditional markets? So I've influenced the DAO to pass this proposal, because I pushed the price of pMETA upwards in the pass market?",
                ]}
                fastForward={read > 21}
              />
            </span>, //21
            ["Yes. Welcome to Futarchy, cyberanon."], //22
            [
              `The market price for META in the world where this proposal passes is $${(
                PMETA_PRICE + 2
              ).toLocaleString()}, and $49,003 in the world where the proposal fails.`,
            ], //23
            <span key="what" className="ml-8 -mr-8 text-yellow-400">
              <BetterTypeAnimation
                doneWaiting={() => setWaiting(false)}
                sequence={["Wait, that's crazy. "]}
                fastForward={read > 24} // todo
              />
            </span>, //24
            <span key="huh" className="ml-8 -mr-8 text-yellow-400">
              <BetterTypeAnimation
                doneWaiting={() => setWaiting(false)}
                sequence={[
                  "Shouldn't the price in the pass market be higher?",
                  500,

                  "Shouldn't the price in the pass market be higher? There is no way the MetaDAO is worth more without using hypertronics. The crystallic yields are over 500% greater than conventional tractor beams!",
                ]}
                fastForward={read > 25} //todo
              />
            </span>, //25
            [
              "Indeed. Not every market participant is a beamjunkie like yourself, and the big players in conventional beamtech have say-for-pay goons all over socialnet FUDing hypertronic.",
              500,
              "Indeed. Not every market participant is a beamjunkie like yourself, and the big players in conventional beamtech have say-for-pay goons all over socialnet FUDing hypertronic. Give it time, you might be glued to the nexus feed, but other tractor beam experts will take time to filter in.",
            ], // 26
          ]}
        />
        <Block
          read={read - 27}
          doneWaiting={() => setWaiting(false)}
          sequences={[
            [
              "Nice.",
              500,
              "Nice. Once word spread on minetech postfeeds, every beamjunkie wanted a chance to ride the hypertronics wave.",
            ], //27
            [
              "Once that happened, META started trading higher on the pass market than in the fail market. Therefore, the proposal passes.",
            ], //28
            <span key="huh" className="ml-8 -mr-8 text-yellow-400">
              <BetterTypeAnimation
                doneWaiting={() => setWaiting(false)}
                sequence={[
                  "POGGERS.", // todo replace with pog sticker
                  500,
                  "POGGERS. I'm now an early hypertronics investor. To the moon!",
                  500,
                ]}
                fastForward={read > 29} //todo
              />
            </span>, //29
            [""],
            [
              "Now i has to make a brief redeem animation? and fade to white? and polish up animation timings? and figure out how to salvage fastforward? and make a text version? and merge chapters 1 and 2? and make a back button maybe? (that would be painful). or at least ability to scroll up in the text",
            ],
          ]}
        />
      </div>
      <animated.div
        /** the countdown */ className={"text-2xl"}
        style={clockOpacity}
      >
        {clockSpring.clock.to((x) => formatCountdown(x))}
      </animated.div>
      <div className="w-full flex-1 flex flex-col py-12 justify-center items-center select-none">
        <animated.div
          className={"w-full h-full flex-1 max-h-[350px] relative scale-90"}
          style={areaSizeSpring}
        >
          {
            <Splitter
              split={!combineCoins && read > showFailCoinAfter && !discardFail2}
              left={
                <>
                  <Transition
                    appear
                    show={read > showPassCoinAfter && read <= endCoinDemoAfter}
                    enter="transition-opacity duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <USDCoin
                      condition="pass"
                      label={!combineCoins ? "1 pUSDC" : "1 USDC"}
                    />
                  </Transition>
                  {read <= beginTradingDemoAfter ? null : (
                    <AnimatedEnter key="trading" from="below">
                      <Redeem2
                        phase={REDEEEM}
                        left={
                          <div
                            className={clsx(
                              "relative w-[404px] h-[300px] transition-transform ease-in-out duration-700",
                              read > discussFutarchyAfter &&
                                (!itsTimeToBeginRedemption || discardFail)
                                ? "scale-100"
                                : "scale-75"
                            )}
                          >
                            <Market
                              showCoins={
                                read <= discussFutarchyAfter ||
                                itsTimeToBeginRedemption
                              }
                              showMarket={read > showMarketsAfter}
                              hideLPMeta={startedWatchingMarket}
                              showLeftCoins={
                                read > buypMetaAfter || itsTimeToBeginRedemption
                              }
                              bagPosition={
                                read > showMarketsAfter
                                  ? ["100%", "100%"]
                                  : ["50%", "50%"]
                              }
                              marketPosition={
                                read <= discussFutarchyAfter ||
                                itsTimeToBeginRedemption
                                  ? ["50%", "0%"]
                                  : ["50%", "50%"]
                              }
                              amountLeft={read <= buypMetaAfter ? 0 : 2}
                              amountRight={
                                read <= buypMetaAfter
                                  ? STARTING_USDC_BALANCE
                                  : STARTING_USDC_BALANCE - PMETA_PRICE * 2
                              }
                              condition="pass"
                              rightLabel={!combineCoins ? "pUSDC" : "USDC"}
                              price={
                                <animated.span>
                                  {priceSpring.passPrice.to((x) =>
                                    Math.floor(x).toLocaleString()
                                  )}
                                </animated.span>
                              }
                            />
                          </div>
                        }
                        right={
                          <div
                            className={clsx(
                              "relative w-[404px] h-[300px] transition-transform ease-in-out duration-700", //I honestly dont even know why -75% is the (close enough to) right number here and im sorry
                              read > discussFutarchyAfter &&
                                (!itsTimeToBeginRedemption || discardFail)
                                ? "scale-100"
                                : "scale-75"
                            )}
                          >
                            <Market
                              showCoins={
                                read <= discussFutarchyAfter ||
                                itsTimeToBeginRedemption
                              }
                              showMarket={read > showMarketsAfter}
                              hideLPMeta={startedWatchingMarket}
                              showLeftCoins={
                                read > buypMetaAfter || itsTimeToBeginRedemption
                              }
                              bagPosition={
                                read > showMarketsAfter
                                  ? ["100%", "100%"]
                                  : ["50%", "50%"]
                              }
                              marketPosition={
                                read <= discussFutarchyAfter ||
                                itsTimeToBeginRedemption
                                  ? ["50%", "0%"]
                                  : ["50%", "50%"]
                              }
                              amountLeft={read <= buypMetaAfter ? 0 : 2}
                              amountRight={
                                read <= buypMetaAfter
                                  ? STARTING_USDC_BALANCE
                                  : STARTING_USDC_BALANCE - PMETA_PRICE * 2
                              }
                              rightLabel={!combineCoins ? "pUSDC" : "USDC"}
                              price={
                                <animated.span>
                                  {priceSpring.passPrice.to((x) =>
                                    Math.floor(x).toLocaleString()
                                  )}
                                </animated.span>
                              }
                            />
                          </div>
                        }
                      />
                    </AnimatedEnter>
                  )}
                </>
              }
              right={
                read > showFailCoinAfter ? (
                  read <= endCoinDemoAfter ? (
                    <Transition
                      appear
                      show={
                        read > showPassCoinAfter && read <= endCoinDemoAfter
                      }
                      enter="transition-opacity duration-150"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity duration-150"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <USDCoin
                        condition="fail"
                        label={!combineCoins ? "1 fUSDC" : "1 USDC"}
                      />
                    </Transition>
                  ) : read <= beginTradingDemoAfter ? null : (
                    <AnimatedEnter from="below" key="trading">
                      <animated.div style={fusdcLeaveSpring}>
                        <div
                          className={clsx(
                            "relative w-[404px] h-[300px] transition-transform ease-in-out duration-700",
                            read > discussFutarchyAfter &&
                              !itsTimeToBeginRedemption
                              ? "scale-100"
                              : "scale-75"
                          )}
                        >
                          <Market
                            showCoins={
                              read <= discussFutarchyAfter ||
                              itsTimeToBeginRedemption
                            }
                            showMarket={read > showMarketsAfter}
                            hideLPMeta={startedWatchingMarket}
                            showLeftCoins={false}
                            bagPosition={
                              read > showMarketsAfter
                                ? ["100%", "100%"]
                                : ["50%", "50%"]
                            }
                            marketPosition={
                              read <= discussFutarchyAfter ||
                              itsTimeToBeginRedemption
                                ? ["50%", "0%"]
                                : ["50%", "50%"]
                            }
                            amountLeft={0}
                            amountRight={STARTING_USDC_BALANCE}
                            condition="fail"
                            rightLabel={!combineCoins ? "fUSDC" : "USDC"}
                            price={
                              <animated.span>
                                {priceSpring.failPrice.to((x) =>
                                  Math.floor(x).toLocaleString()
                                )}
                              </animated.span>
                            }
                          />
                        </div>
                      </animated.div>
                    </AnimatedEnter>
                  )
                ) : null
              }
            />
          }
          {/* {itsTimeToBeginRedemption && (
            <div className="flex flex-row">
              <div className="flex-1 flex-grow flex justify-center items-center">
                <div className="relative">
                  <div className="absolute top-[3%] left-[3%] translate-x-0">
                    <Coin condition={"pass"} />
                  </div>
                  <div className="mix-blend-normal translate-x-0">
                    <Coin condition={"pass"} />
                  </div>
                </div>
              </div>
              <div className="flex-1 flex-grow flex justify-center items-center">
                <div
                  className={
                    "rounded-full flex flex-col justify-center items-center font-mono text-center select-none border-4" +
                    " " +
                    "border-lime-100"
                  }
                  style={{
                    //position: "absolute",
                    background: "#0891b2",

                    //transform: "translate(-50%, -50%)",
                    width: 191,
                    height: 191,
                  }}
                >
                  <div className="text-5xl">
                    ${STARTING_USDC_BALANCE - 2 * PMETA_PRICE}
                  </div>
                  <div className="flex-0 h-0 text-lg">pUSDC</div>
                </div>
              </div>
              <div className="flex-1 flex-grow flex justify-center items-center">
                <div
                  className={
                    "rounded-full flex flex-col justify-center items-center font-mono text-center select-none border-4" +
                    " " +
                    "border-red-100"
                  }
                  style={{
                    //position: "absolute",
                    background: "#7c3aed",
                    top: "50%",
                    left: "50%",
                    //transform: "translate(-50%, -50%)",
                    width: 225,
                    height: 225,
                  }}
                >
                  <div className="text-5xl text-nowrap">
                    ${STARTING_USDC_BALANCE}
                  </div>
                  <div className="flex-0 h-0 text-lg">fUSDC</div>
                </div>
              </div>
            </div>
          )} */}
        </animated.div>
      </div>
    </main>
  )
}
