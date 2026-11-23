"use client";

type Props = {
  title: string;
  value: number;
  color: string;
};

export default function ScoreCircle({
  title,
  value,
  color,
}: Props) {
  const radius = 55;
  const stroke = 8;

  const normalizedRadius =
    radius - stroke * 2;

  const circumference =
    normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference -
    (value / 100) * circumference;

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex flex-col items-center">

        <svg
          height={radius * 2}
          width={radius * 2}
        >
          <circle
            stroke="#27272a"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{
              transition: "1s ease",
            }}
          />

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            className="fill-white text-xl font-bold"
          >
            {value}
          </text>
        </svg>

        <p className="mt-4 text-center text-zinc-400">
          {title}
        </p>

      </div>

    </div>
  );
}