"use client"

import { cn } from "@/lib/utils"

interface BrandLogoProps {
  className?: string
  wordmarkClassName?: string
  markClassName?: string
}

export function BrandLogo({ className, wordmarkClassName, markClassName }: BrandLogoProps) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <img
        src="/images/dekcise-logo.png"
        alt="DEKCISE ロゴ"
        className={cn(
          "h-14 w-auto rounded-md object-contain shadow-[0_2px_12px_rgba(2,6,23,0.25)]",
          wordmarkClassName,
          markClassName
        )}
      />
    </div>
  )
}
