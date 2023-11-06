
import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function Loading() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
  <div className="h-screen w-full flex justify-center items-center">

  <Progress value={progress} className="w-[60%] " />
  </div>
  )
}

export default Loading