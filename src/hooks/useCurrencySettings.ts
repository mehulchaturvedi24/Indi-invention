"use client";
import { useEffect, useMemo, useState } from "react";
import { loadExpenses, loadUserSettings, saveExpenses, saveUserSettings, storageKeys } from "../lib/storage";
import { CurrencySetting, Expense, UserSettings } from "../lib/types";

const defaultCurrencies: CurrencySetting[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "$" },
];

const defaultSettings: UserSettings = {
  homeCurrency: defaultCurrencies[0],
  localCurrency: defaultCurrencies[1],
  customCategories: ["Food", "Housing", "Transport", "Entertainment"],
  enableSubcategories: false,
  enableBudgeting: false,
};

export const useCurrencySettings = () => {
  const [settings, setSettings] = useState<UserSettings | null>(null);

  useEffect(() => {
    const stored = loadUserSettings();
    if (stored) {
      setSettings(stored);
    } else {
      saveUserSettings(defaultSettings);
      setSettings(defaultSettings);
    }
  }, []);

  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.key === storageKeys.settings) {
        setSettings(loadUserSettings());
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const currencyOptions = useMemo(() => defaultCurrencies, []);

  const updateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    saveUserSettings(newSettings);
  };

  const updateExpensesForCategoryChange = (updatedCategory: string, newCategory: string | null) => {
    const expenses = loadExpenses();
    const nextExpenses: Expense[] = expenses.map((expense) =>
      expense.category === updatedCategory && newCategory
        ? { ...expense, category: newCategory }
        : expense.category === updatedCategory && !newCategory
          ? { ...expense, category: "Uncategorized" }
          : expense
    );
    saveExpenses(nextExpenses);
  };

  const addCustomCategory = (category: string) => {
    if (!settings) return;
    const updated = { ...settings, customCategories: [...settings.customCategories, category] };
    updateSettings(updated);
  };

  const renameCustomCategory = (oldName: string, newName: string) => {
    if (!settings) return;
    const updatedCategories = settings.customCategories.map((cat) => (cat === oldName ? newName : cat));
    const updated = { ...settings, customCategories: updatedCategories };
    updateExpensesForCategoryChange(oldName, newName);
    updateSettings(updated);
  };

  const deleteCustomCategory = (category: string) => {
    if (!settings) return;
    const updatedCategories = settings.customCategories.filter((cat) => cat !== category);
    const updated = { ...settings, customCategories: updatedCategories };
    updateExpensesForCategoryChange(category, null);
    updateSettings(updated);
  };

  return {
    settings,
    currencyOptions,
    updateSettings,
    addCustomCategory,
    renameCustomCategory,
    deleteCustomCategory,
  };
};
