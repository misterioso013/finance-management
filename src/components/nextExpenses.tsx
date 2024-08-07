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
  
export const NextExpenses = ({ transactions }: NextExpensesProps) => {
    
    return(
        <Card>
              <CardHeader>
                <CardTitle>Próximos Gastos</CardTitle>
                <CardDescription>Próximos 15 dias</CardDescription>
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
                      .filter(
                        (transaction) =>
                          transaction.type === "expense" &&
                            dateFns.isWithinInterval(
                                new Date(transaction.date),
                                {
                                start: new Date(),
                                end: dateFns.addDays(new Date(), 15),
                                },
                            ),

                      )
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            {dateFns.parseISO(transaction.date).toLocaleDateString('pt-BR',{
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                })
                            }
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>
                            R$ {transaction.amount.toFixed(2).replace(".", ",")}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
    )
    }