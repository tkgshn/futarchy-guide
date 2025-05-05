"use client"
import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import i18nConfig from '../../next-i18next.config';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { Block } from "./track/intro/Block"
import { BetterTypeAnimation } from "./track/intro/BetterTypeAnimation"
import { Splitter, USDCoin } from "@/app/coinsplit/coinsplit"
import { AnimatedEnter, Market } from "@/app/market/market"
import { PMETA_PRICE, STARTING_USDC_BALANCE } from "@/constants"
import clsx from "clsx"
import { animated, useSpring } from "@react-spring/web"
import { Redeem2 } from "@/app/redeem/redeem"
import { Transition } from "@headlessui/react"
import ReactMarkdown from 'react-markdown';
import React, { Suspense } from 'react';

i18n
  .use(HttpBackend)
  // Disable language detection for now to force Japanese
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Force Japanese language
    lng: 'ja',
    fallbackLng: 'ja', // Set fallback to Japanese as well
    supportedLngs: i18nConfig.i18n.locales, // Keep supported languages
    defaultNS: 'common',
    ns: ['common'],
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // detection options are not needed when lng is forced
    /* detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
    }, */
    react: {
      useSuspense: true,
    },
  });

const usePriceAnimation = (go: boolean) => {
  const spring = useSpring({
    passPrice: !go ? PMETA_PRICE : 49800,
  })
}

/** input: number of minutes
 * output: formatted string in form of: 00d 00h 00m
 */
const formatCountdown = (minutes: number, t: (key: string, options?: any) => string) => {
  const days = Math.floor(minutes / 1440)
  const hours = Math.floor((minutes % 1440) / 60)
  const remainingMinutes = Math.floor(minutes % 60)

  const formattedDays = days.toString().padStart(2, "0")
  const formattedHours = hours.toString().padStart(2, "0")
  const formattedMinutes = remainingMinutes.toString().padStart(2, "0")

  return t('countdown', { days: formattedDays, hours: formattedHours, minutes: formattedMinutes });
}

//
const TIME_LEFT = 1440 * 4 - 870

const Block1 = ({
  read,
  doneWaiting,
  fade,
}: {
  read: number
  doneWaiting: () => void
  fade: boolean
}) => {
  const { t } = useTranslation('common');
  const spring = useSpring({
    from: { opacity: 1 },
    to: {
      opacity: fade ? 0.5 : 1,
      y: fade ? -48 : 0,
    },
  })

  return (
    <animated.div className="flex flex-col" style={spring}>
      {read > -1 && (
        <BetterTypeAnimation
          doneWaiting={doneWaiting}
          fastForward={read > 0}
          sequence={[
            t('intro.block1_1'),
            500,
            t('intro.block1_1_full'),
          ]}
        />
      )}
      {read > 0 && (
        <BetterTypeAnimation
          doneWaiting={doneWaiting}
          fastForward={read > 1}
          sequence={[
            t('intro.block1_2'),
            500,
            t('intro.block1_2_full'),
          ]}
        />
      )}
      {read > 1 && (
        <BetterTypeAnimation
          doneWaiting={doneWaiting}
          fastForward={read > 2}
          sequence={[
            t('intro.block1_3'),
            500,
            t('intro.block1_3_full'),
          ]}
        />
      )}
      {read > 2 && (
        <BetterTypeAnimation
          fastForward={read > 3}
          doneWaiting={doneWaiting}
          sequence={[t('intro.block1_4')]}
        />
      )}
    </animated.div>
  )
}

const EndCard = () => {
  const { t } = useTranslation('common');
  return (
    <main className="endcard flex min-h-screen flex-col items-center justify-start p-24 absolute top-0 left-0 right-0 bottom-0">
      <div className="mb-20 h-[30vh] w-full flex flex-col justify-end max-w-3xl">
        <Block
          neverFade
          read={1}
          doneWaiting={() => { }}
          sequences={[
            [
              t('outro.thankYou'),
              500,
              t('outro.welcome'),
            ],
          ]}
        />
      </div>
    </main>
  )
}

function Chapter2Content() {
  const { t } = useTranslation('common');
  const [read, setRead] = useState(-9)

  const chapterOneRead = read + 9
  const chapterOneEnded = read > 0
  const [marketStep, setMarketStep] = useState(0)

  const [waiting, setWaiting] = useState(true)

  const nextChat = () => {
    setWaiting(true)
    setRead((prev) => prev + 1)
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
  const discardFail = read > 32
  const discardFail2 = discardFail
  const REDEEEM = read > 33
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
        ? "606px"
        : "606px",
  })

  //const fudr = useSpringRef()
  const fusdcLeaveSpring = useSpring({
    //ref: fudr,
    opacity: discardFail ? 0 : 1,
    //maxWidth: discardFail ? "0%" : "100%",
  })
  //useChain([fudr, asr])

  const itsOver = read > 34

  // Calculate USDC amounts for translation interpolation
  const usdcAmountRemaining = STARTING_USDC_BALANCE - PMETA_PRICE * 2;
  const usdcAmountStart = STARTING_USDC_BALANCE;

  // Calculate prices for translation interpolation
  const formattedPassPrice = (PMETA_PRICE + 2).toLocaleString();
  const formattedFailPrice = (49003).toLocaleString();

  return (
    <>
      {itsOver && <EndCard />}
      <Transition
        show={!itsOver}
        leave="transition-opacity duration-[5000ms]"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <main
          className="flex min-h-screen flex-col items-center justify-start p-24"
          onClick={nextChat}
        >
          <div className="mb-20 h-[30vh] w-full flex flex-col justify-end max-w-3xl">
            <Block1
              read={chapterOneRead}
              doneWaiting={() => setWaiting(false)}
              fade={chapterOneRead > 3}
            />
            <Block
              read={chapterOneRead - 3}
              doneWaiting={() => setWaiting(false)}
              sequences={[
                [
                  500,
                  t('intro.block2_1'),
                ],
                [
                  t('intro.block2_2'),
                  250,
                  t('intro.block2_2') + "..",
                  250,
                  t('intro.block2_2') + "...",
                  500,
                  () => setMarketStep(Math.max(marketStep, 1)),
                  t('intro.block2_2'),
                ],
                [
                  t('intro.block2_3'),
                  500,
                  t('intro.block2_3_price'),
                ],
                [
                  t('intro.block2_4'),
                  250,
                  t('intro.block2_4_full'),
                  250,
                  t('intro.block2_4_early'),
                ],
                [
                  t('intro.block2_5'),
                  500,
                  () => setMarketStep(Math.max(marketStep, 2)),
                  1000,
                  t('intro.block2_5_full'),
                  500,
                  () => setMarketStep(Math.max(marketStep, 3)),
                  1500,
                ],
                [
                  t('intro.block2_6'),
                  () => setMarketStep(Math.max(marketStep, 4)),
                  1500,
                ],
              ]}
            />
            <Block
              read={read}
              doneWaiting={() => setWaiting(false)}
              sequences={[
                <ReactMarkdown
                  key="ct1_1"
                  components={{
                    p: ({ node, ...props }) => <p className="text-2xl whitespace-pre-line" {...props} />
                  }}
                >
                  {t('conditionalTokens.block1_1')}
                </ReactMarkdown>,
                <ReactMarkdown
                  key="ct1_2"
                  components={{
                    p: ({ node, ...props }) => <p className="text-2xl whitespace-pre-line" {...props} />
                  }}
                >
                  {t('conditionalTokens.block1_2')}
                </ReactMarkdown>,
                [t('conditionalTokens.block1_3')],
                [t('conditionalTokens.block1_4')],
                [
                  500,
                  t('conditionalTokens.block1_5'),
                  500,
                  t('conditionalTokens.block1_5_full'),
                ],
                [t('conditionalTokens.block1_6')],
                [t('conditionalTokens.block1_7')],
                [t('conditionalTokens.block1_8')],
                [t('conditionalTokens.block1_9')],
                <ReactMarkdown
                  key="ct1_10"
                  components={{
                    p: ({ node, ...props }) => <p className="text-2xl whitespace-pre-line" {...props} />
                  }}
                >
                  {t('conditionalTokens.block1_10')}
                </ReactMarkdown>,
                [t('conditionalTokens.block1_11')],
                [t('conditionalTokens.block1_12')],
                [
                  t('conditionalTokens.block1_13'),
                  500,
                  t('conditionalTokens.block1_13_full'),
                ],
                [
                  t('conditionalTokens.block1_14'),
                  500,
                  t('conditionalTokens.block1_14_cyber'),
                  500,
                  t('conditionalTokens.block1_14_full', { usdc: usdcAmountRemaining, usdc_start: usdcAmountStart }),
                ],
                <span key="great" className="text-yellow-400 ml-8 -mr-8 text-2xl">
                  <BetterTypeAnimation
                    doneWaiting={() => setWaiting(false)}
                    sequence={[t('conditionalTokens.block1_15_prompt')]}
                    fastForward={read > 15}
                  />
                </span>,
                [t('conditionalTokens.block1_16')],
              ]}
            />
            <Block
              read={read - 16}
              doneWaiting={() => setWaiting(false)}
              sequences={[
                <ReactMarkdown
                  key="f1_1"
                  components={{
                    p: ({ node, ...props }) => <p className="text-2xl whitespace-pre-line" {...props} />
                  }}
                >
                  {t('futarchy.block1_1')}
                </ReactMarkdown>,
                [t('futarchy.block1_2')],
                [t('futarchy.block1_3')],
                [t('futarchy.block1_4')],
                <span key="thatsit" className="text-yellow-400 ml-8 -mr-8 text-2xl">
                  <BetterTypeAnimation
                    doneWaiting={() => setWaiting(false)}
                    sequence={[t('futarchy.block1_5_prompt')]}
                    fastForward={read > 21}
                  />
                </span>,
                [t('futarchy.block1_6')],
                [t('futarchy.block1_7', { passPrice: formattedPassPrice, failPrice: formattedFailPrice })],
                <span key="what" className="text-yellow-400 ml-8 -mr-8 text-2xl">
                  <BetterTypeAnimation
                    doneWaiting={() => setWaiting(false)}
                    sequence={[t('futarchy.block1_8_prompt')]}
                    fastForward={read > 24}
                  />
                </span>,
                <span key="huh" className="text-yellow-400 ml-8 -mr-8 text-2xl">
                  <BetterTypeAnimation
                    doneWaiting={() => setWaiting(false)}
                    sequence={[
                      t('futarchy.block1_9_prompt'),
                      500,
                      t('futarchy.block1_9_prompt_full'),
                    ]}
                    fastForward={read > 25}
                  />
                </span>,
                [
                  t('futarchy.block1_10'),
                  500,
                  t('futarchy.block1_10_full'),
                ],
              ]}
            />
            <Block
              read={read - 27}
              doneWaiting={() => setWaiting(false)}
              sequences={[
                [
                  t('resolution.block1_1'),
                  500,
                  t('resolution.block1_1_full'),
                ],
                [t('resolution.block1_2')],
                <span key="rational" className="text-yellow-400 ml-8 -mr-8 text-2xl">
                  <BetterTypeAnimation
                    doneWaiting={() => setWaiting(false)}
                    sequence={[t('resolution.block1_3_prompt')]}
                    fastForward={read > 30}
                  />
                </span>,
                [t('resolution.block1_4')],
                [t('resolution.block1_5')],
                [t('resolution.block1_6')],
                [t('resolution.block1_7')],
              ]}
            />
            <Block
              neverFade
              read={itsOver ? 1 : 0}
              doneWaiting={() => setWaiting(false)}
              sequences={[
                [
                  t('outro.thankYou'),
                  500,
                  t('outro.welcome'),
                ],
              ]}
            />
          </div>
          <animated.div
            className={"text-2xl"}
            style={clockOpacity}
          >
            {clockSpring.clock.to((x) => formatCountdown(x, t))}
          </animated.div>
          <div className="w-full flex-1 flex flex-col py-12 justify-center items-center select-none mb-20">
            <animated.div
              className={"w-full h-full flex-1 max-h-[350px] relative scale-90"}
              style={areaSizeSpring}
            >
              <Transition
                show={!chapterOneEnded}
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Market
                  showLeftCoins={marketStep > 2}
                  amountRight={
                    marketStep !== 3
                      ? STARTING_USDC_BALANCE
                      : STARTING_USDC_BALANCE - 49000 * 2
                  }
                  amountLeft={marketStep !== 3 ? 0 : 2}
                  marketPosition={["50%", "0%"]}
                  bagPosition={["100%", "100%"]}
                  showMarket={marketStep > 0}
                  showCoins={marketStep > 1}
                />
              </Transition>
              {
                <Splitter
                  split={
                    !combineCoins && read > showFailCoinAfter && !discardFail2
                  }
                  left={
                    <>
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
                          condition="pass"
                          label={t(combineCoins ? 'usdcLabel' : 'pusdcLabel')}
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
                                  showCoins={read <= discussFutarchyAfter || itsTimeToBeginRedemption}
                                  showMarket={read > showMarketsAfter}
                                  hideLPMeta={startedWatchingMarket}
                                  showLeftCoins={read > buypMetaAfter || itsTimeToBeginRedemption}
                                  bagPosition={read > showMarketsAfter ? ["100%", "100%"] : ["50%", "50%"]}
                                  marketPosition={read <= discussFutarchyAfter || itsTimeToBeginRedemption ? ["50%", "0%"] : ["50%", "50%"]}
                                  amountLeft={read <= buypMetaAfter ? 0 : 2}
                                  amountRight={read <= buypMetaAfter ? STARTING_USDC_BALANCE : STARTING_USDC_BALANCE - PMETA_PRICE * 2}
                                  condition="pass"
                                  rightLabel={t(combineCoins ? 'usdcLabel' : 'pusdcLabel')}
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
                                  "relative w-[404px] h-[300px] transition-transform ease-in-out duration-700",
                                  read > discussFutarchyAfter &&
                                    (!itsTimeToBeginRedemption || discardFail)
                                    ? "scale-100"
                                    : "scale-75"
                                )}
                              >
                                <Market
                                  showCoins={read <= discussFutarchyAfter || itsTimeToBeginRedemption}
                                  showMarket={read > showMarketsAfter}
                                  hideLPMeta={startedWatchingMarket}
                                  showLeftCoins={read > buypMetaAfter || itsTimeToBeginRedemption}
                                  bagPosition={read > showMarketsAfter ? ["100%", "100%"] : ["50%", "50%"]}
                                  marketPosition={read <= discussFutarchyAfter || itsTimeToBeginRedemption ? ["50%", "0%"] : ["50%", "50%"]}
                                  amountLeft={read <= buypMetaAfter ? 0 : 2}
                                  amountRight={read <= buypMetaAfter ? STARTING_USDC_BALANCE : STARTING_USDC_BALANCE - PMETA_PRICE * 2}
                                  rightLabel={t(combineCoins ? 'usdcLabel' : 'pusdcLabel')}
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
                            label={t(combineCoins ? 'usdcLabel' : 'fusdcLabel')}
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
                                showCoins={read <= discussFutarchyAfter || itsTimeToBeginRedemption}
                                showMarket={read > showMarketsAfter}
                                hideLPMeta={startedWatchingMarket}
                                showLeftCoins={false}
                                bagPosition={read > showMarketsAfter ? ["100%", "100%"] : ["50%", "50%"]}
                                marketPosition={read <= discussFutarchyAfter || itsTimeToBeginRedemption ? ["50%", "0%"] : ["50%", "50%"]}
                                amountLeft={0}
                                amountRight={STARTING_USDC_BALANCE}
                                condition="fail"
                                rightLabel={t(combineCoins ? 'usdcLabel' : 'fusdcLabel')}
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
            </animated.div>
          </div>
        </main>
      </Transition>
    </>
  );
}

export default function Chapter2() {
  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <Chapter2Content />
    </Suspense>
  );
}
