"use client";
import { useEffect, useMemo, useState } from "react";
import {
  loadExpenses,
  loadRecoveries,
  saveExpenses,
  saveRecoveries,
  storageKeys,
} from "../lib/storage";
import { Expense, Recovery } from "../lib/types";
import { useCurrencySettings } from "./useCurrencySettings";
import { useExchangeRate } from "./useExchangeRate";

export const useExpenses = () => {
  const { settings } = useCurrencySettings();
  const { convertToHomeCurrency } = useExchangeRate();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [recoveries, setRecoveries] = useState<Recovery[]>([]);

  useEffect(() => {
    setExpenses(loadExpenses());
    setRecoveries(loadRecoveries());
  }, []);

  useEffect(() => {
    if (!settings) return;
    const updated = loadExpenses().map((expense) => ({
      ...expense,
      homeAmount: convertToHomeCurrency(
        expense.amount,
        expense.currency,
        settings.homeCurrency.code
      ),
    }));
    setExpenses(updated);
    saveExpenses(updated);
  }, [settings]);

  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.key === storageKeys.expenses) {
        setExpenses(loadExpenses());
      }
      if (event.key === storageKeys.recoveries) {
        setRecoveries(loadRecoveries());
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const addExpense = (expense: Omit<Expense, "id">) => {
    const id = crypto.randomUUID();
    const enriched: Expense = { ...expense, id };
    const nextExpenses = [enriched, ...expenses];
    setExpenses(nextExpenses);
    saveExpenses(nextExpenses);

    if (expense.isShared && expense.totalBillAmount) {
      const shareAmount = expense.totalBillAmount - expense.amount;
      const recovery: Recovery = {
        id: crypto.randomUUID(),
        expenseId: id,
        personName: "Friend",
        status: "Pending",
        dateCreated: new Date().toISOString(),
        amountOwed: shareAmount,
      };
      const nextRecoveries = [recovery, ...recoveries];
      setRecoveries(nextRecoveries);
      saveRecoveries(nextRecoveries);
    }
  };

  const deleteExpense = (id: string) => {
    const nextExpenses = expenses.filter((exp) => exp.id !== id);
    setExpenses(nextExpenses);
    saveExpenses(nextExpenses);
    const nextRecoveries = recoveries.filter((rec) => rec.expenseId !== id);
    setRecoveries(nextRecoveries);
    saveRecoveries(nextRecoveries);
  };

  const updateRecoveryStatus = (id: string, status: Recovery["status"]) => {
    const nextRecoveries = recoveries.map((rec) =>
      rec.id === id ? { ...rec, status, dateRecovered: new Date().toISOString() } : rec
    );
    setRecoveries(nextRecoveries);
    saveRecoveries(nextRecoveries);
  };

  const totals = useMemo(() => {
    const totalHome = expenses.reduce((sum, exp) => sum + (exp.homeAmount ?? exp.amount), 0);
    const pendingRecovery = recoveries
      .filter((rec) => rec.status === "Pending")
      .reduce((sum, rec) => sum + rec.amountOwed, 0);
    const recovered = recoveries
      .filter((rec) => rec.status === "Recovered")
      .reduce((sum, rec) => sum + rec.amountOwed, 0);
    return { totalHome, pendingRecovery, recovered };
  }, [expenses, recoveries]);

  return {
    expenses,
    recoveries,
    totals,
    addExpense,
    deleteExpense,
    updateRecoveryStatus,
  };
};
