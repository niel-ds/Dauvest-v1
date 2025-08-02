import { Transaction, Goal, CommunityPost } from '@/types';

export const mockTransactions: Transaction[] = [];

export const mockGoals: Goal[] = [];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    author: 'Ana Silva',
    content: 'Alguém tem experiência com investimentos em ETFs? Vale a pena para quem está começando?',
    timeAgo: '2h atrás',
    likes: 8,
    comments: 12,
    avatar: 'fas fa-user'
  },
  {
    id: '2',
    author: 'Carlos MEI',
    content: 'Compartilhando minha experiência: como autônomo, separar 30% para impostos e 20% para reserva foi o que me salvou nos meses difíceis.',
    timeAgo: '5h atrás',
    likes: 15,
    comments: 7,
    avatar: 'fas fa-user-tie'
  }
];

export const chartData = [
  { month: 'Jan', receitas: 0, despesas: 0 },
  { month: 'Fev', receitas: 0, despesas: 0 },
  { month: 'Mar', receitas: 0, despesas: 0 },
  { month: 'Abr', receitas: 0, despesas: 0 },
  { month: 'Mai', receitas: 0, despesas: 0 },
  { month: 'Jun', receitas: 0, despesas: 0 }
];

export const categories = {
  income: [
    { value: 'salary', label: 'Salário', icon: 'fas fa-money-bill-wave' },
    { value: 'freelance', label: 'Freelance', icon: 'fas fa-laptop-code' },
    { value: 'investment', label: 'Investimentos', icon: 'fas fa-chart-line' },
    { value: 'bonus', label: 'Bônus', icon: 'fas fa-gift' },
    { value: 'other', label: 'Outros', icon: 'fas fa-plus-circle' }
  ],
  expense: [
    { value: 'food', label: 'Alimentação', icon: 'fas fa-shopping-bag' },
    { value: 'transport', label: 'Transporte', icon: 'fas fa-car' },
    { value: 'housing', label: 'Moradia', icon: 'fas fa-home' },
    { value: 'entertainment', label: 'Lazer', icon: 'fas fa-film' },
    { value: 'health', label: 'Saúde', icon: 'fas fa-heartbeat' },
    { value: 'education', label: 'Educação', icon: 'fas fa-graduation-cap' },
    { value: 'shopping', label: 'Compras', icon: 'fas fa-shopping-cart' },
    { value: 'bills', label: 'Contas', icon: 'fas fa-file-invoice' }
  ]
};