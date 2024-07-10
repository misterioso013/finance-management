import { Transaction } from "../types/transaction";
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
  } from "./ui/card";

type SummaryProps = {
    income: number;
    expenses: number;
    balance: number;
    transactions: Transaction[];
  };
export const Summary = ({ income, expenses, balance, transactions }: SummaryProps) => {
    return (
        <Card>
              <CardHeader>
                <CardTitle>Resumo Financeiro</CardTitle>
                <CardDescription>Entradas, saídas e saldo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span>Entradas</span>
                    <span className="font-semibold">
                      R$ {income.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Saídas</span>
                    <span className="font-semibold">
                      R$ {expenses.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Saldo</span>
                    <span className="font-semibold">
                      R$ {balance.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Próximos Gastos</span>
                    <span className="font-semibold">
                      R${" "}
                      {transactions
                        .filter((transaction) => transaction.type === "expense")
                        .reduce(
                          (sum, transaction) => sum + transaction.amount,
                          0,
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
    )
}