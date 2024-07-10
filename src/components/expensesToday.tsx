import { Transaction } from "../types/transaction";
import * as dateFns from "date-fns";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
  } from "./ui/table";
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
  } from "./ui/card";
type NextExpensesProps = {
    transactions: Transaction[];
  };
  
export const ExpensesToday = ({ transactions }: NextExpensesProps) => {
    
    return(
        <Card>
              <CardHeader>
                <CardTitle>Gastos de Hoje</CardTitle>
                <CardDescription>Um breve resumo dos gastos de hoje</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions
                      .filter(
                        (transaction) =>
                          transaction.type === "expense" &&
                            dateFns.isToday(
                                dateFns.parseISO(transaction.date),
                            ),
                      )
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>R$ {transaction.amount}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
    )
    }