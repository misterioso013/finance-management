import React, { FormEventHandler, useEffect, useState } from "react";
import { Transaction } from "../types/transaction";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { FilePenIcon } from "lucide-react";
import { Button } from "./ui/button";

type EditarProps = {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  onEditTransaction: (transaction: Transaction) => void;
};

export const Editar: React.FC<EditarProps> = ({
  id,
  description,
  amount,
  date,
  type,
  onEditTransaction,
}) => {
  const [newDescription, setNewDescription] = useState(description);
  const [newAmount, setNewAmount] = useState(amount);
  const [newDate, setNewDate] = useState(date);
  const [newType, setNewType] = useState(type);
  const [buttonSubmit, setButtonSubmit] = useState(true);

  const handleEditTransaction: FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const editedTransaction: Transaction = {
      id,
      description: newDescription,
      amount: newAmount,
      date: newDate,
      type: newType,
    };

    onEditTransaction(editedTransaction);
  };

  useEffect(() => {
    if (newDescription && newAmount && newDate && newType) {
      setButtonSubmit(false);
    } else {
      setButtonSubmit(true);
    }
  }, [newDescription, newAmount, newDate, newType]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="w-4 h-4 p-0">
          <FilePenIcon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Transação</AlertDialogTitle>
          <AlertDialogDescription>
            Edite os campos que deseja alterar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleEditTransaction}>
          <div className="mb-2">
            <label className="block">Descrição</label>
            <Input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Valor</label>
            <Input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(Number(e.target.value))}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Data</label>
            <Input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Tipo</label>
            <Select
              value={newType}
              onValueChange={(value) =>
                setNewType(value as "income" | "expense")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Receita</SelectItem>
                <SelectItem value="expense">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit" disabled={buttonSubmit}>
              Editar
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
