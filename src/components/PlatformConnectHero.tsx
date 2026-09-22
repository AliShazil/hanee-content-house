import type { ReactElement } from "react";
import { FacebookIcon } from "./FacebookIcon";
import { InstagramIcon } from "./InstagramIcon";
import { ThreadsIcon } from "./ThreadsIcon";
import { TikTokIcon } from "./TikTokIcon";
import { XIcon } from "./XIcon";
import { YouTubeIcon } from "./YouTubeIcon";

// Diagram geometry. Everything below is in a fixed 900x500 coordinate
// space (flatter than a square so the whole section fits one screen);
// icon/center positions are placed as percentages so the whole thing
// scales down together on smaller screens.
const DIAGRAM_WIDTH = 900;
const DIAGRAM_HEIGHT = 500;

const CENTER = { x: 450, y: 250 };

type Platform = {
  id: string;
  icon: (props: { className?: string }) => ReactElement;
  x: number;
  y: number;
  // Perpendicular bend applied to the connecting curve; sign controls
  // which side it arcs toward, magnitude controls how pronounced it is.
  bend: number;
  // Animation stagger, in seconds.
  delay: number;
};

const PLATFORMS: Platform[] = [
  { id: "youtube", icon: YouTubeIcon, x: 280, y: 110, bend: -0.32, delay: 0 },
  { id: "tiktok", icon: TikTokIcon, x: 620, y: 110, bend: 0.32, delay: 0.4 },
  { id: "instagram", icon: InstagramIcon, x: 205, y: 250, bend: -0.12, delay: 0.8 },
  { id: "x", icon: XIcon, x: 695, y: 250, bend: 0.12, delay: 1.2 },
  { id: "facebook", icon: FacebookIcon, x: 280, y: 390, bend: -0.32, delay: 1.6 },
  { id: "threads", icon: ThreadsIcon, x: 620, y: 390, bend: 0.32, delay: 2.0 },
];

function curvePath(from: { x: number; y: number }, to: { x: number; y: number }, bend: number) {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  // Perpendicular unit vector, scaled by bend * distance.
  const nx = -dy / length;
  const ny = dx / length;
  const offset = bend * length;
  const ctrlX = midX + nx * offset;
  const ctrlY = midY + ny * offset;
  return `M ${from.x} ${from.y} Q ${ctrlX} ${ctrlY} ${to.x} ${to.y}`;
}

function toPercent(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

export function PlatformConnectHero() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0a0a0a] px-6 pt-24 pb-10 sm:pt-28">
      <div className="mx-auto flex w-full max-w-[900px] flex-col items-center text-center">
        <span className="font-inter text-xs font-semibold tracking-[0.2em] text-[#888] uppercase">
          Everywhere You Post
        </span>

        <h2 className="mt-3 font-inter text-4xl font-bold text-white sm:text-[56px] sm:leading-[1.1]">
          One edit. Every platform.
        </h2>

        <p className="mt-4 max-w-[500px] font-inter text-base leading-[1.5] text-[#999] sm:text-lg">
          Vertical for the feeds, horizontal for the long cut. We edit it once and it
          goes wherever your audience already is.
        </p>

        <div
          className="relative mt-10 w-full max-w-[780px]"
          style={{ aspectRatio: `${DIAGRAM_WIDTH} / ${DIAGRAM_HEIGHT}` }}
        >
          <svg
            viewBox={`0 0 ${DIAGRAM_WIDTH} ${DIAGRAM_HEIGHT}`}
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <filter id="platform-glow-blur" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="2.2" />
              </filter>
              {PLATFORMS.map((platform) => (
                <linearGradient
                  key={platform.id}
                  id={`platform-gradient-${platform.id}`}
                  gradientUnits="userSpaceOnUse"
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={platform.x}
                  y2={platform.y}
                >
                  <stop offset="0%" stopColor="#d946ef" stopOpacity="0" />
                  <stop offset="45%" stopColor="#e9a3ff" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#f5d0fe" stopOpacity="1" />
                  <stop offset="55%" stopColor="#e9a3ff" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
              ))}
            </defs>

            {PLATFORMS.map((platform) => {
              const d = curvePath(CENTER, platform, platform.bend);
              return <path key={`base-${platform.id}`} d={d} stroke="#333" strokeWidth={1} opacity={0.5} fill="none" />;
            })}

            {PLATFORMS.map((platform) => {
              const d = curvePath(CENTER, platform, platform.bend);
              return (
                <path
                  key={`glow-outer-${platform.id}`}
                  d={d}
                  stroke={`url(#platform-gradient-${platform.id})`}
                  strokeWidth={4}
                  fill="none"
                  filter="url(#platform-glow-blur)"
                  strokeLinecap="round"
                  strokeDasharray="90 500"
                  opacity={0.7}
                  className="platform-connect-glow"
                  style={{ animationDelay: `${platform.delay}s` }}
                />
              );
            })}

            {PLATFORMS.map((platform) => {
              const d = curvePath(CENTER, platform, platform.bend);
              return (
                <path
                  key={`glow-core-${platform.id}`}
                  d={d}
                  stroke={`url(#platform-gradient-${platform.id})`}
                  strokeWidth={1.5}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="90 500"
                  className="platform-connect-glow"
                  style={{ animationDelay: `${platform.delay}s` }}
                />
              );
            })}
          </svg>

          {/* Center node */}
          <div
            className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 sm:h-20 sm:w-20"
            style={{
              left: toPercent(CENTER.x, DIAGRAM_WIDTH),
              top: toPercent(CENTER.y, DIAGRAM_HEIGHT),
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 40px 10px rgba(168, 85, 247, 0.4)",
            }}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white sm:h-9 sm:w-9" aria-hidden="true">
              <path d="M6 4.5v15l14-7.5-14-7.5z" />
            </svg>
          </div>

          {/* Platform icon nodes */}
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.id}
                className="absolute flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1a] sm:h-14 sm:w-14"
                style={{
                  left: toPercent(platform.x, DIAGRAM_WIDTH),
                  top: toPercent(platform.y, DIAGRAM_HEIGHT),
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Icon className="h-4 w-4 fill-white/80 sm:h-6 sm:w-6" />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes platform-connect-flow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -590;
          }
        }
        .platform-connect-glow {
          animation: platform-connect-flow 3s ease-in-out infinite;
        }
        @media (max-width: 640px) {
          .platform-connect-glow {
            animation-duration: 2.5s;
          }
        }
      `}</style>
    </section>
  );
}
