import { ResponsiveBar } from "@nivo/bar";
import { BarChartData } from "../types/barChartData";

interface StackedbarChartProps {
  data: BarChartData[];
  className?: string;
}
export function StackedbarChart({ data, className }: StackedbarChartProps) {
  return (
    <div className={className}>
      <ResponsiveBar
        data={data}
        keys={["income", "expenses"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb", "#e11d48"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => String(id)}
        enableLabel={false}
        role="application"
        ariaLabel="A stacked bar chart"
      />
    </div>
  );
}
