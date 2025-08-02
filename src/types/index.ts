export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  icon?: string;
}

export interface Goal {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  color: string;
}

export interface User {
  name: string;
  email: string;
  plan: 'free' | 'premium';
  avatar?: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
  avatar?: string;
}

export interface FinancialSummary {
  balance: number;
  income: number;
  expenses: number;
}