"use client"

import { useState } from "react"
import { TrendingUp, Activity, Heart, Flame, Clock } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Disclaimer } from "@/src/components/legal/Disclaimer"

type Period = "weekly" | "monthly"

const weeklyData = [
  { day: "月", gained: 0, lost: 0 },
  { day: "火", gained: 0, lost: 0 },
  { day: "水", gained: 0, lost: 0 },
  { day: "木", gained: 0, lost: 0 },
  { day: "金", gained: 0, lost: 0 },
  { day: "土", gained: 0, lost: 0 },
  { day: "日", gained: 0, lost: 0 },
]

const monthlyData = [
  { week: "1週", gained: 0, lost: 0 },
  { week: "2週", gained: 0, lost: 0 },
  { week: "3週", gained: 0, lost: 0 },
  { week: "4週", gained: 0, lost: 0 },
]

const conditionTrend = [
  { day: "月", score: 0 },
  { day: "火", score: 0 },
  { day: "水", score: 0 },
  { day: "木", score: 0 },
  { day: "金", score: 0 },
  { day: "土", score: 0 },
  { day: "日", score: 0 },
]

export function ReportScreen() {
  const [period, setPeriod] = useState<Period>("weekly")

  const data = period === "weekly" ? weeklyData : monthlyData
  const xKey = period === "weekly" ? "day" : "week"

  const totalGained = data.reduce((sum, d) => sum + d.gained, 0)
  const totalLost = data.reduce((sum, d) => sum + d.lost, 0)
  const netGain = totalGained - totalLost

  return (
    <div className="flex flex-col px-5 pb-24 pt-safe-top">
      {/* Header */}
      <header className="py-4 animate-fade-in-up">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
          ANALYTICS
        </p>
        <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-foreground">
          レポート
        </h1>
      </header>

      {/* Period Toggle */}
      <div className="flex gap-2 p-1 rounded-xl bg-muted/30 animate-fade-in-up">
        {(["weekly", "monthly"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 rounded-lg py-2.5 text-xs font-medium transition-all duration-200 ${
              period === p
                ? "bg-orange text-white shadow-lg shadow-orange/20"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {p === "weekly" ? "週次" : "月次"}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="mt-4 grid grid-cols-3 gap-2 animate-fade-in-up">
        <div className="glass-card rounded-2xl p-3">
          <div className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
              <TrendingUp className="h-3 w-3 text-success" />
            </div>
          </div>
          <p className="mt-2 text-xl font-semibold tabular-nums text-success">
            +{totalGained}
          </p>
          <p className="text-[10px] text-muted-foreground/60">獲得</p>
        </div>
        <div className="glass-card rounded-2xl p-3">
          <div className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10">
              <Clock className="h-3 w-3 text-destructive" />
            </div>
          </div>
          <p className="mt-2 text-xl font-semibold tabular-nums text-destructive">
            -{totalLost}
          </p>
          <p className="text-[10px] text-muted-foreground/60">損失</p>
        </div>
        <div className="glass-card rounded-2xl p-3">
          <div className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange/10">
              <Heart className="h-3 w-3 text-orange" />
            </div>
          </div>
          <p className={`mt-2 text-xl font-semibold tabular-nums ${netGain >= 0 ? "text-success" : "text-destructive"}`}>
            {netGain >= 0 ? "+" : ""}{netGain}
          </p>
          <p className="text-[10px] text-muted-foreground/60">純増</p>
        </div>
      </div>

      {/* Lifespan Buyback Chart */}
      <div className="mt-5 glass-card rounded-2xl p-4 animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-foreground">寿命バイバック</h3>
            <p className="text-[10px] text-muted-foreground/60">
              {period === "weekly" ? "今週" : "今月"}の推移
            </p>
          </div>
        </div>
        <div className="h-44">
          <ChartContainer
            config={{
              gained: { label: "獲得", color: "#4ADE80" },
              lost: { label: "損失", color: "#EF4444" },
            }}
            className="h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey={xKey}
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                  axisLine={false}
                  tickLine={false}
                  width={25}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="gained" fill="#4ADE80" radius={[6, 6, 0, 0]} />
                <Bar dataKey="lost" fill="#EF4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      {/* Condition Score */}
      <div className="mt-3 glass-card rounded-2xl p-4 animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-foreground">コンディション</h3>
            <p className="text-[10px] text-muted-foreground/60">FITPEAK スコア</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-orange/10 px-3 py-1.5">
            <Activity className="h-3.5 w-3.5 text-orange" />
            <span className="text-lg font-semibold tabular-nums text-orange">0</span>
            <span className="text-[10px] text-muted-foreground/60">/100</span>
          </div>
        </div>
        <div className="h-28">
          <ChartContainer
            config={{
              score: { label: "スコア", color: "#F47B2A" },
            }}
            className="h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conditionTrend}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F47B2A" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#F47B2A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[50, 100]}
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                  axisLine={false}
                  tickLine={false}
                  width={25}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#F47B2A"
                  strokeWidth={2}
                  fill="url(#scoreGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-3 grid grid-cols-2 gap-2 animate-fade-in-up">
        <div className="glass-card rounded-2xl p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange/10">
            <Flame className="h-4 w-4 text-orange" />
          </div>
          <p className="mt-3 text-2xl font-semibold tabular-nums text-foreground">0</p>
          <p className="text-[10px] text-muted-foreground/60">{period === "weekly" ? "今週" : "今月"}のセッション</p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
            <Activity className="h-4 w-4 text-success" />
          </div>
          <p className="mt-3 text-2xl font-semibold tabular-nums text-foreground">0%</p>
          <p className="text-[10px] text-muted-foreground/60">休憩完了率</p>
        </div>
      </div>

      <Disclaimer className="mt-5 rounded-2xl glass-card p-4 animate-fade-in-up" />
    </div>
  )
}
