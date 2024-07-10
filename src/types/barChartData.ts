import { BarDatum } from "@nivo/bar";
export interface BarChartData extends BarDatum {
  name: string;
  income: number;
  expenses: number;
}
