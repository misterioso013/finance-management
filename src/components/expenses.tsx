import { BarChartData } from "../types/barChartData";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "./ui/card";
import { StackedbarChart } from "../components/stackedBarChart";

type ExpensesProps = {
    expenses: number;
    barChartData: BarChartData[];
    };
export function Expenses({ expenses, barChartData }: ExpensesProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Despesas</CardDescription>
        <CardTitle>R$ {expenses.toFixed(2)}</CardTitle>
      </CardHeader>
      <CardContent>
        <StackedbarChart className="aspect-[4/3]" data={barChartData} />
      </CardContent>
    </Card>
  );
}
