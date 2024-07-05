import React, { useEffect, useState, useMemo } from "react";
import TransactionList from "../components/TransactionList";
import { Transaction } from "../types/transaction";
import { CalendarClock } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";
import { ResponsiveBar, BarDatum } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

// Define uma interface que estende BarDatum
interface BarChartData extends BarDatum {
  name: string;
  income: number;
  expenses: number;
}

// Define uma interface para as propriedades do StackedbarChart
interface StackedbarChartProps {
  data: BarChartData[];
  className?: string;
}

// Define a interface para os dados do gráfico de pizza
interface PieChartData {
  id: string;
  label: string;
  value: number;
}

// Define uma interface para as propriedades do PieChart
interface PieChartProps {
  data: PieChartData[];
  className?: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  const handleAddTransaction = (transaction: Transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  const handleDeleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  const handleEditTransaction = (updatedTransaction: Transaction) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === updatedTransaction.id
        ? updatedTransaction
        : transaction
    );
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  // Calcula entradas, saídas e saldo
  const { income, expenses, balance } = useMemo(() => {
    const income = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const expenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const balance = income - expenses;
    return { income, expenses, balance };
  }, [transactions]);

  // Tipagem para o objeto de agrupamento
  interface GroupedTransactions {
    [key: string]: number;
    income: number;
    expense: number;
  }

  // Dados para gráficos
  const barChartData: BarChartData[] = useMemo(() => {
    const groupedByType: GroupedTransactions = transactions.reduce(
      (acc: GroupedTransactions, transaction) => {
        if (!acc[transaction.type]) acc[transaction.type] = 0;
        acc[transaction.type] += transaction.amount;
        return acc;
      },
      { income: 0, expense: 0 }
    );

    return Object.keys(groupedByType).map((type) => ({
      name: type,
      income: type === "income" ? groupedByType[type] : 0,
      expenses: type === "expense" ? groupedByType[type] : 0,
    }));
  }, [transactions]);

  const pieChartData: PieChartData[] = useMemo(() => {
    const total = income + expenses;

    return [
      { id: "Income", label: "Income", value: income },
      { id: "Expenses", label: "Expenses", value: expenses },
    ].map((d) => ({ ...d, value: (d.value / total) * 100 }));
  }, [income, expenses]);

  return (
    <div className="container mx-auto">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center gap-4">
          {/* <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Button> */}
          <h1 className="font-semibold text-lg md:text-xl">
            Finance Management
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className="w-[280px] justify-start text-left font-normal"
                >
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Junho 01, 2024 - Junho 30, 2024
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar initialFocus mode="range" numberOfMonths={2} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardDescription>Despesas</CardDescription>
                <CardTitle>R$ {expenses.toFixed(2)}</CardTitle>
              </CardHeader>
              <CardContent>
                <StackedbarChart className="aspect-[4/3]" data={barChartData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Saldo</CardDescription>
                <CardTitle>R$ {balance.toFixed(2)}</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart className="aspect-[4/3]" data={pieChartData} />
              </CardContent>
            </Card>
            <h3>
              --- Implementar um Chatbot AI para falar sobre os gastos ---
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Próximos Gastos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions
                      .filter((transaction) => transaction.type === "expense")
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            {new Date(transaction.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>
                            R$ {transaction.amount.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Resumo Financeiro</CardTitle>
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
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
            onEditTransaction={handleEditTransaction}
            handleAddTransaction={handleAddTransaction}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

function PieChart({ data, className }: PieChartProps) {
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

function StackedbarChart({ data, className }: StackedbarChartProps) {
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
