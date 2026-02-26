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
  { day: "\u6708", gained: 0, lost: 0 },
  { day: "\u706B", gained: 0, lost: 0 },
  { day: "\u6C34", gained: 0, lost: 0 },
  { day: "\u6728", gained: 0, lost: 0 },
  { day: "\u91D1", gained: 0, lost: 0 },
  { day: "\u571F", gained: 0, lost: 0 },
  { day: "\u65E5", gained: 0, lost: 0 },
]

const monthlyData = [
  { week: "1\u9031", gained: 0, lost: 0 },
  { week: "2\u9031", gained: 0, lost: 0 },
  { week: "3\u9031", gained: 0, lost: 0 },
  { week: "4\u9031", gained: 0, lost: 0 },
]

const conditionTrend = [
  { day: "\u6708", score: 0 },
  { day: "\u706B", score: 0 },
  { day: "\u6C34", score: 0 },
  { day: "\u6728", score: 0 },
  { day: "\u91D1", score: 0 },
  { day: "\u571F", score: 0 },
  { day: "\u65E5", score: 0 },
]

export function ReportScreen() {
  const [period, setPeriod] = useState<Period>("weekly")

  const data = period === "weekly" ? weeklyData : monthlyData
  const xKey = period === "weekly" ? "day" : "week"

  const totalGained = data.reduce((sum, d) => sum + d.gained, 0)
  const totalLost = data.reduce((sum, d) => sum + d.lost, 0)
  const netGain = totalGained - totalLost

  return (
    <div className="flex flex-col px-4 pb-24">
      {/* Header */}
      <div className="py-4">
        <h1 className="text-lg font-semibold text-foreground">{'\u30EC\u30DD\u30FC\u30C8'}</h1>
        <p className="text-xs text-muted-foreground">{'\u5BFF\u547D\u30D0\u30A4\u30D0\u30C3\u30AF\u5206\u6790'}</p>
      </div>

      {/* Period Toggle */}
      <div className="flex gap-2">
        {(["weekly", "monthly"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 rounded-lg py-2 text-xs font-medium transition-all ${
              period === p
                ? "bg-orange text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {p === "weekly" ? "\u9031\u6B21" : "\u6708\u6B21"}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-border bg-secondary p-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-success" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {'\u7372\u5F97'}
            </span>
          </div>
          <p className="mt-1 text-lg font-bold tabular-nums text-success">
            +{totalGained}
          </p>
          <p className="text-[10px] text-muted-foreground">{'\u5206'}</p>
        </div>
        <div className="rounded-xl border border-border bg-secondary p-3">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-danger" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {'\u640D\u5931'}
            </span>
          </div>
          <p className="mt-1 text-lg font-bold tabular-nums text-danger">
            -{totalLost}
          </p>
          <p className="text-[10px] text-muted-foreground">{'\u5206'}</p>
        </div>
        <div className="rounded-xl border border-border bg-secondary p-3">
          <div className="flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5 text-orange" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {'\u7D14\u5897'}
            </span>
          </div>
          <p className={`mt-1 text-lg font-bold tabular-nums ${netGain >= 0 ? "text-success" : "text-danger"}`}>
            {netGain >= 0 ? "+" : ""}{netGain}
          </p>
          <p className="text-[10px] text-muted-foreground">{'\u5206'}</p>
        </div>
      </div>

      {/* Lifespan Buyback Chart */}
      <div className="mt-6 rounded-xl border border-border bg-secondary p-4">
        <h3 className="text-sm font-semibold text-foreground">{'\u5BFF\u547D\u30D0\u30A4\u30D0\u30C3\u30AF'}</h3>
        <p className="text-xs text-muted-foreground">
          {period === "weekly" ? "\u4ECA\u9031" : "\u4ECA\u6708"}
        </p>
        <div className="mt-4 h-48">
          <ChartContainer
            config={{
              gained: { label: "\u7372\u5F97", color: "#4ADE80" },
              lost: { label: "\u640D\u5931", color: "#EF4444" },
            }}
            className="h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333358" vertical={false} />
                <XAxis
                  dataKey={xKey}
                  tick={{ fontSize: 10, fill: "#8888A4" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#8888A4" }}
                  axisLine={false}
                  tickLine={false}
                  width={30}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="gained" fill="#4ADE80" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lost" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      {/* Condition Score */}
      <div className="mt-4 rounded-xl border border-border bg-secondary p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">{'\u30B3\u30F3\u30C7\u30A3\u30B7\u30E7\u30F3\u30FB\u30B9\u30B3\u30A2'}</h3>
            <p className="text-xs text-muted-foreground">{'FITPEAK \u30B7\u30CA\u30B8\u30FC'}</p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-orange" />
            <span className="text-2xl font-bold text-orange">0</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>
        <div className="mt-4 h-32">
          <ChartContainer
            config={{
              score: { label: "\u30B9\u30B3\u30A2", color: "#F47B2A" },
            }}
            className="h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conditionTrend}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F47B2A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F47B2A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333358" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 10, fill: "#8888A4" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[50, 100]}
                  tick={{ fontSize: 10, fill: "#8888A4" }}
                  axisLine={false}
                  tickLine={false}
                  width={30}
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
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-border bg-secondary p-3">
          <Flame className="h-4 w-4 text-orange" />
          <p className="mt-2 text-xl font-bold tabular-nums text-foreground">0</p>
          <p className="text-[10px] text-muted-foreground">{period === "weekly" ? "\u4ECA\u9031" : "\u4ECA\u6708"}{'\u306E\u30BB\u30C3\u30B7\u30E7\u30F3\u6570'}</p>
        </div>
        <div className="rounded-xl border border-border bg-secondary p-3">
          <Activity className="h-4 w-4 text-success" />
          <p className="mt-2 text-xl font-bold tabular-nums text-foreground">0%</p>
          <p className="text-[10px] text-muted-foreground">{'\u4F11\u61A9\u5B8C\u4E86\u7387'}</p>
        </div>
      </div>

      <Disclaimer className="mt-6 rounded-lg border border-border/60 bg-secondary/30 p-3" />
    </div>
  )
}
