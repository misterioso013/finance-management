import { PieChart, PieChartData } from "./pieChart";
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
  } from "./ui/card";

  type BalanceProps = {
    balance: number;
    pieChartData: PieChartData[];
  };
export function Balance({ balance, pieChartData }: BalanceProps) {
    return (
        <Card>
              <CardHeader>
                <CardDescription>Saldo</CardDescription>
                <CardTitle>R$ {balance.toFixed(2)}</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart className="aspect-[4/3]" data={pieChartData} />
              </CardContent>
            </Card>
    )
}