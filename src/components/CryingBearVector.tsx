import React from "react";

type CryingBearVectorProps = {
  className?: string;
  title?: string;
};

/**
 * Inline SVG bear so there's no baked background (unlike some PNG exports).
 * Colors are tied to existing design tokens via CSS variables.
 */
export default function CryingBearVector({
  className,
  title = "Crying bear",
}: CryingBearVectorProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 320"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      <defs>
        {/* Soft circular background gradient matching the page */}
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--rose-light))" stopOpacity="0.6" />
          <stop offset="60%" stopColor="hsl(var(--rose-light))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--rose-light))" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="bearFace" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="hsl(var(--cream))" />
          <stop offset="65%" stopColor="hsl(var(--secondary))" />
          <stop offset="100%" stopColor="hsl(var(--secondary) / 0.9)" />
        </radialGradient>

        <linearGradient id="tear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(200 70% 70%)" />
          <stop offset="50%" stopColor="hsl(200 60% 75% / 0.6)" />
          <stop offset="100%" stopColor="hsl(200 50% 80% / 0.3)" />
        </linearGradient>

        <filter id="softShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.85
                    0 0 0 0 0.65
                    0 0 0 0 0.7
                    0 0 0 0.35 0"
            result="shadow"
          />
          <feOffset in="shadow" dx="0" dy="10" result="offsetShadow" />
          <feMerge>
            <feMergeNode in="offsetShadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Soft circular background glow to integrate with page */}
      <circle cx="160" cy="160" r="155" fill="url(#bgGlow)" />
      <g filter="url(#softShadow)">
        {/* Ears */}
        <circle cx="86" cy="92" r="44" fill="hsl(var(--secondary))" />
        <circle cx="234" cy="92" r="44" fill="hsl(var(--secondary))" />
        <circle cx="86" cy="92" r="26" fill="hsl(var(--cream))" opacity="0.9" />
        <circle cx="234" cy="92" r="26" fill="hsl(var(--cream))" opacity="0.9" />

        {/* Head */}
        <path
          d="M160 54c62 0 114 42 114 106 0 73-55 116-114 116S46 233 46 160C46 96 98 54 160 54Z"
          fill="url(#bearFace)"
          stroke="hsl(var(--foreground) / 0.15)"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Cheeks */}
        <ellipse cx="106" cy="170" rx="32" ry="20" fill="hsl(var(--rose-light))" opacity="0.75" />
        <ellipse cx="214" cy="170" rx="32" ry="20" fill="hsl(var(--rose-light))" opacity="0.75" />

        {/* Eyes */}
        <g>
          <ellipse cx="120" cy="148" rx="22" ry="26" fill="hsl(var(--foreground))" opacity="0.9" />
          <ellipse cx="200" cy="148" rx="22" ry="26" fill="hsl(var(--foreground))" opacity="0.9" />
          <circle cx="112" cy="140" r="6" fill="hsl(var(--background))" opacity="0.95" />
          <circle cx="192" cy="140" r="6" fill="hsl(var(--background))" opacity="0.95" />
          <circle cx="128" cy="154" r="4" fill="hsl(var(--background))" opacity="0.6" />
          <circle cx="208" cy="154" r="4" fill="hsl(var(--background))" opacity="0.6" />
        </g>

        {/* Brows */}
        <path
          d="M95 120c14-14 34-18 50-10"
          fill="none"
          stroke="hsl(var(--foreground) / 0.55)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M225 120c-14-14-34-18-50-10"
          fill="none"
          stroke="hsl(var(--foreground) / 0.55)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Snout */}
        <path
          d="M160 170c30 0 54 16 54 38s-24 40-54 40-54-18-54-40 24-38 54-38Z"
          fill="hsl(var(--cream))"
          opacity="0.92"
          stroke="hsl(var(--foreground) / 0.12)"
          strokeWidth="6"
        />
        <path
          d="M160 182c12 0 22 8 22 18s-10 18-22 18-22-8-22-18 10-18 22-18Z"
          fill="hsl(var(--foreground) / 0.85)"
        />

        {/* Mouth */}
        <path
          d="M140 224c10 10 30 10 40 0"
          fill="none"
          stroke="hsl(var(--foreground) / 0.55)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Tears */}
        <path
          d="M106 170c0 24 18 38 18 56 0 10-8 18-18 18s-18-8-18-18c0-18 18-32 18-56Z"
          fill="url(#tear)"
          opacity="0.9"
        />
        <path
          d="M214 170c0 24 18 38 18 56 0 10-8 18-18 18s-18-8-18-18c0-18 18-32 18-56Z"
          fill="url(#tear)"
          opacity="0.9"
        />
      </g>
    </svg>
  );
}
