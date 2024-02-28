import { ReactNode } from "react"

export function DemoZone({ children }: { children?: ReactNode }) {
  return (
    <div className="w-full flex-1 flex flex-col py-12 justify-center items-center select-none">
      <div className="w-full h-full flex-1 max-w-[404px] max-h-[350px] relative scale-90">
        {children}
      </div>
    </div>
  )
}
