"use client"
import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadAll } from "@tsparticles/all" // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const App = () => {
  const [init, setInit] = useState(false)

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadAll(engine)
      //await loadFull(engine);
      //await loadSlim(engine)
      //await loadBasic(engine);
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = async (container) => {
    console.log(container)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 relative">
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            /* background: {
              color: {
                value: "#0d47a1",
              },
            }, */
            //fpsLimit: 120,
            absorbers: [
              {
                position: { x: 50, y: 50 },
                size: {
                  value: 5000,
                  limit: 150,
                  random: {
                    enable: true,
                    minimumValue: 30,
                  },
                },
              },
            ],
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                //resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },

              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "destroy",
                },
                random: false,
                speed: 6,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 20,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </main>
  )
}

export default App
