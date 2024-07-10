import { ResponsivePie } from "@nivo/pie";
export interface PieChartData {
  id: string;
  label: string;
  value: number;
}

interface PieChartProps {
  data: PieChartData[];
  className?: string;
}

export function PieChart({ data, className }: PieChartProps) {
  return (
    <div className={className}>
      <ResponsivePie
        data={data}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={0}
        padAngle={0}
        borderWidth={1}
        borderColor={"#ffffff"}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.id}`}
        arcLabelsTextColor={"#ffffff"}
        arcLabelsRadiusOffset={0.65}
        colors={["#2563eb", "#e11d48"]}
        theme={{
          labels: {
            text: {
              fontSize: "18px",
            },
          },
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
        }}
        role="application"
      />
    </div>
  );
}
