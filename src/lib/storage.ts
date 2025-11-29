"use client";
import { Expense, Recovery, UserSettings } from "./types";

const SETTINGS_KEY = "ai-expat-settings";
const EXPENSES_KEY = "ai-expat-expenses";
const RECOVERIES_KEY = "ai-expat-recoveries";

export const saveUserSettings = (settings: UserSettings) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new StorageEvent("storage", { key: SETTINGS_KEY }));
};

export const loadUserSettings = (): UserSettings | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored ? (JSON.parse(stored) as UserSettings) : null;
};

export const saveExpenses = (expenses: Expense[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  window.dispatchEvent(new StorageEvent("storage", { key: EXPENSES_KEY }));
};

export const loadExpenses = (): Expense[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(EXPENSES_KEY);
  return stored ? (JSON.parse(stored) as Expense[]) : [];
};

export const saveRecoveries = (recoveries: Recovery[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(RECOVERIES_KEY, JSON.stringify(recoveries));
  window.dispatchEvent(new StorageEvent("storage", { key: RECOVERIES_KEY }));
};

export const loadRecoveries = (): Recovery[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(RECOVERIES_KEY);
  return stored ? (JSON.parse(stored) as Recovery[]) : [];
};

export const storageKeys = {
  settings: SETTINGS_KEY,
  expenses: EXPENSES_KEY,
  recoveries: RECOVERIES_KEY,
};
