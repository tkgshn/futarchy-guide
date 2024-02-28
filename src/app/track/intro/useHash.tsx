"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export const useHash = () => {
  const router = useRouter()

  const params = useParams()
  const [hash, setHash] = useState("")

  useEffect(() => {
    const currentHash = window.location.hash.replace("#", "")
    setHash(currentHash)
  }, [params])

  const pushHash = (x: string) => router.push(`#${x}`)

  return [hash, pushHash] as const
}
