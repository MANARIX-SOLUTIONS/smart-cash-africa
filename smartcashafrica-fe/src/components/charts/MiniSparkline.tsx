import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface MiniSparklineProps {
  data: number[];
  color?: string;
  positive?: boolean;
}

export function MiniSparkline({
  data,
  color,
  positive = true,
}: MiniSparklineProps) {
  const chartData = data.map((value, index) => ({ index, value }));
  const strokeColor = color ?? (positive ? "#00A86B" : "#EF4444");

  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient
            id={`grad-${strokeColor}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
            <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={2}
          fill={`url(#grad-${strokeColor})`}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
