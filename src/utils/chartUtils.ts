import { Transaction } from '@/types';

export const generateChartData = (transactions: Transaction[]) => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const currentYear = new Date().getFullYear();
  
  const monthlyData = months.map(month => ({
    month,
    receitas: 0,
    despesas: 0
  }));

  transactions.forEach(transaction => {
    const transactionDate = new Date(transaction.date);
    if (transactionDate.getFullYear() === currentYear) {
      const monthIndex = transactionDate.getMonth();
      if (transaction.type === 'income') {
        monthlyData[monthIndex].receitas += transaction.amount;
      } else {
        monthlyData[monthIndex].despesas += transaction.amount;
      }
    }
  });

  return monthlyData;
};