"use client"
import * as React from "react"

import { CharacterCounterProps } from "@/lib/types/input"

export function CharacterCounter({
  currentLength,
  maxLength,
  showAfter = 0,
}: CharacterCounterProps) {
  const remainingCharacters = maxLength - currentLength

  if (currentLength <= showAfter) return null

  return <p className="text-gray-500">{remainingCharacters} characters remaining.</p>
}
