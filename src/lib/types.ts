export interface CurrencySetting {
  code: string;
  name: string;
  symbol: string;
}

export interface UserSettings {
  homeCurrency: CurrencySetting;
  localCurrency: CurrencySetting;
  customCategories: string[];
  enableSubcategories: boolean;
  enableBudgeting: boolean;
}

export interface Expense {
  id: string;
  description: string;
  category: string;
  currency: string;
  date: string;
  amount: number;
  merchant?: string;
  homeAmount?: number;
  isShared?: boolean;
  totalBillAmount?: number;
}

export interface Recovery {
  id: string;
  expenseId: string;
  personName: string;
  status: "Pending" | "Recovered";
  dateCreated: string;
  amountOwed: number;
  dateRecovered?: string;
}

export interface AddExpenseInputData {
  description: string;
  category: string;
  currency: string;
  date: string;
  amount: number;
  merchant?: string;
  isShared?: boolean;
  totalBillAmount?: number;
  sharerNames?: string[];
}
