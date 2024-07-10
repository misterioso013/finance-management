import React, { useEffect, useState, useMemo } from "react";
import TransactionList from "../components/TransactionList";
import { Transaction } from "../types/transaction";

import { PieChartData } from "../components/pieChart";
import { BarChartData } from "../types/barChartData";
import { Expenses } from "../components/expenses";
import { Balance } from "../components/balance";
import { Filter } from "../components/filter";
import { NextExpenses } from "../components/nextExpenses";
import { Summary } from "../components/summary";

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
      (transaction) => transaction.id !== id,
    );
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  const handleEditTransaction = (updatedTransaction: Transaction) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === updatedTransaction.id
        ? updatedTransaction
        : transaction,
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
      { income: 0, expense: 0 },
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
            <Filter />
          </div>
        </div>
        <div className="grid gap-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Expenses
            expenses={expenses}
            barChartData={barChartData}
            />
            <Balance balance={balance} pieChartData={pieChartData} />
            <h3>
              --- Implementar um Chatbot AI para falar sobre os gastos ---
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <NextExpenses transactions={transactions} />
            <Summary income={income} expenses={expenses} balance={balance} transactions={transactions} />
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
