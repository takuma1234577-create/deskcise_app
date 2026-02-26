"use client"

import { PersonStanding } from "lucide-react"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  className?: string
  wordmarkClassName?: string
  markClassName?: string
}

export function BrandLogo({ className, wordmarkClassName, markClassName }: BrandLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <div className={cn("relative h-9 w-9 shrink-0", markClassName)}>
        <div className="absolute inset-y-0 left-0 w-[38%] rounded-l-sm bg-[#173A6A]" />
        <div className="absolute inset-y-0 right-0 w-[62%] rounded-r-full border-[5px] border-l-0 border-[#F97316]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <PersonStanding className="h-3.5 w-3.5 text-[#F97316]" strokeWidth={2.2} />
        </div>
      </div>
      <h1 className={cn("text-lg font-bold tracking-tight", wordmarkClassName)}>
        <span className="text-[#173A6A]">DEK</span>
        <span className="text-[#F97316]">CISE</span>
      </h1>
    </div>
  )
}
