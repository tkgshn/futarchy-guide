import { ReactNode, createContext, useContext, useState } from "react"

const defaultValue = {
  currentStep: 0,
  updateCurrentStep: (step: number) => {},
}

// Create the context
const GuidedTrackContext = createContext(defaultValue)

// Create a provider component
const GuidedTrackProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0)

  // Function to update the current step
  const updateCurrentStep = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <GuidedTrackContext.Provider value={{ currentStep, updateCurrentStep }}>
      {children}
    </GuidedTrackContext.Provider>
  )
}

export const useStepperContext = () => useContext(GuidedTrackContext)

export { GuidedTrackContext, GuidedTrackProvider }
