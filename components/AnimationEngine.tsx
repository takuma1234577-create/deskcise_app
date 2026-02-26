"use client"

import { motion } from "framer-motion"

type ExerciseId = "seated-leg-extension"

interface JointPoint {
  x: number
  y: number
}

interface HumanTemplate {
  hip: JointPoint
  shoulder: JointPoint
  neck: JointPoint
  head: JointPoint
  supportKnee: JointPoint
  supportAnkle: JointPoint
  movingKnee: JointPoint
  thighLength: number
  shinLength: number
  footLength: number
}

interface MotionData {
  kneeAngleKeyframes: [number, number, number]
  highlight: "lower-leg"
}

const ORANGE = "#F97316"
const NAVY_DARK = "#0F172A"

const SKELETON: HumanTemplate = {
  hip: { x: 152, y: 142 },
  shoulder: { x: 148, y: 106 },
  neck: { x: 150, y: 92 },
  head: { x: 150, y: 78 },
  supportKnee: { x: 136, y: 160 },
  supportAnkle: { x: 132, y: 196 },
  movingKnee: { x: 190, y: 150 },
  thighLength: 42,
  shinLength: 44,
  footLength: 20,
}

function getMotionData(exerciseId: ExerciseId): MotionData {
  switch (exerciseId) {
    case "seated-leg-extension":
    default:
      // Same start/end keyframes eliminate loop jitter.
      return {
        // Degrees relative to +X axis around movingKnee.
        // Constraint range: -62..6 (never bends backward).
        kneeAngleKeyframes: [6, -58, 6],
        highlight: "lower-leg",
      }
  }
}

export function AnimationEngine({
  exerciseId = "seated-leg-extension",
}: {
  exerciseId?: ExerciseId
}) {
  const motionData = getMotionData(exerciseId)

  return (
    <section className="w-full rounded-2xl border border-[#315B90] bg-gradient-to-b from-[#173A6A] to-[#102B52] p-4">
      <div className="rounded-2xl border border-[#274A78] bg-gradient-to-b from-[#101C33] to-[#0A1426] p-4">
        <svg viewBox="0 0 360 240" className="h-[280px] w-full">
          <defs>
            <linearGradient id="deskGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#203A66" />
              <stop offset="100%" stopColor="#132A4D" />
            </linearGradient>
            <linearGradient id="chairGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#214572" />
              <stop offset="100%" stopColor="#18385F" />
            </linearGradient>
            <radialGradient id="accentGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor={ORANGE} stopOpacity="0.5" />
              <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Base scene layer: fixed desk/chair/pc coordinates */}
          <ellipse cx="184" cy="214" rx="126" ry="14" fill="#091225" opacity="0.65" />

          <rect x="210" y="72" width="100" height="10" rx="4" fill="url(#deskGrad)" />
          <rect x="220" y="80" width="8" height="98" rx="4" fill="url(#deskGrad)" />
          <rect x="290" y="80" width="8" height="98" rx="4" fill="url(#deskGrad)" />
          <rect x="228" y="45" width="52" height="30" rx="4" fill="#1D3458" />
          <rect x="248" y="76" width="12" height="4" rx="2" fill="#1D3458" />

          <rect x="112" y="142" width="96" height="10" rx="5" fill="url(#chairGrad)" />
          <rect x="116" y="96" width="12" height="46" rx="5" fill="url(#chairGrad)" />
          <rect x="164" y="152" width="12" height="48" rx="5" fill="url(#chairGrad)" opacity="0.85" />
          <rect x="152" y="198" width="36" height="6" rx="3" fill="#1B3D67" />

          {/* Human template layer: fixed torso + support leg */}
          <g stroke={ORANGE} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <line x1={SKELETON.neck.x} y1={SKELETON.neck.y} x2={SKELETON.shoulder.x} y2={SKELETON.shoulder.y} />
            <line x1={SKELETON.shoulder.x} y1={SKELETON.shoulder.y} x2={SKELETON.hip.x} y2={SKELETON.hip.y} />
            <line x1={SKELETON.shoulder.x} y1={SKELETON.shoulder.y} x2="118" y2="118" />
            <line x1="118" y1="118" x2="124" y2="144" />

            {/* support leg (keeps floor contact) */}
            <line x1={SKELETON.hip.x} y1={SKELETON.hip.y} x2={SKELETON.supportKnee.x} y2={SKELETON.supportKnee.y} />
            <line
              x1={SKELETON.supportKnee.x}
              y1={SKELETON.supportKnee.y}
              x2={SKELETON.supportAnkle.x}
              y2={SKELETON.supportAnkle.y}
            />
            <line
              x1={SKELETON.supportAnkle.x}
              y1={SKELETON.supportAnkle.y}
              x2={SKELETON.supportAnkle.x + 18}
              y2={SKELETON.supportAnkle.y}
            />
          </g>
          <circle cx={SKELETON.head.x} cy={SKELETON.head.y} r="11" fill={ORANGE} />

          {/* Fixed thigh (seat contact lock) */}
          <g stroke={ORANGE} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <line x1={SKELETON.hip.x} y1={SKELETON.hip.y} x2={SKELETON.movingKnee.x} y2={SKELETON.movingKnee.y} />
          </g>

          {/* Action injection layer: only lower leg receives motion data */}
          <motion.g
            animate={{
              rotate: motionData.kneeAngleKeyframes,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              mass: 0.7,
              duration: 2.2,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.5, 1],
            }}
            style={{
              transformBox: "fill-box",
              transformOrigin: `${SKELETON.movingKnee.x}px ${SKELETON.movingKnee.y}px`,
            }}
          >
            {motionData.highlight === "lower-leg" && (
              <>
                <ellipse cx="224" cy="132" rx="26" ry="22" fill="url(#accentGlow)" />
                <motion.ellipse
                  cx="226"
                  cy="132"
                  rx="24"
                  ry="20"
                  fill="url(#accentGlow)"
                  animate={{ opacity: [0.25, 0.7, 0.25] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}
            <g stroke={ORANGE} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <line
                x1={SKELETON.movingKnee.x}
                y1={SKELETON.movingKnee.y}
                x2={SKELETON.movingKnee.x + SKELETON.shinLength}
                y2={SKELETON.movingKnee.y}
              />
              <line
                x1={SKELETON.movingKnee.x + SKELETON.shinLength}
                y1={SKELETON.movingKnee.y}
                x2={SKELETON.movingKnee.x + SKELETON.shinLength + SKELETON.footLength}
                y2={SKELETON.movingKnee.y}
              />
            </g>
          </motion.g>

          {/* Arc indicator: visual guidance for knee extension */}
          <path
            d="M 206 170 A 58 58 0 0 1 252 118"
            stroke={ORANGE}
            strokeWidth="4"
            fill="none"
            opacity="0.75"
            strokeLinecap="round"
            strokeDasharray="5 7"
          />
          <polygon points="249,112 259,116 252,124" fill={ORANGE} opacity="0.9" />
        </svg>

        <p className="mt-2 text-center text-xs text-white/70">
          シーテッド・レッグエクステンション（膝下のみ可動 / 始点終点固定）
        </p>
      </div>

      <div className="mt-3 rounded-lg border border-[#355E93] bg-[#112746] px-3 py-2 text-[11px] text-white/70">
        <span className="font-semibold text-[#FDBA74]">Engine Note:</span> ベースシーン座標は固定、人体はジョイント分離、
        動作は膝ジョイントへのキーフレーム注入のみで制御しています。
      </div>
    </section>
  )
}

export default AnimationEngine
