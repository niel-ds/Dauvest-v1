import { Transaction } from '@/types';
import { Button } from '@/components/ui/button';
import { Trash2, Edit3 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  showActions?: boolean;
}

export function TransactionList({ transactions, onEdit, onDelete, showActions = false }: TransactionListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM - HH:mm', { locale: ptBR });
  };

  const getCategoryIcon = (category: string, icon?: string) => {
    if (icon) return icon;
    
    const iconMap: Record<string, string> = {
      'Alimentação': 'fas fa-shopping-bag',
      'Transporte': 'fas fa-car',
      'Lazer': 'fas fa-film',
      'Salário': 'fas fa-money-bill-wave',
      'Freelance': 'fas fa-laptop-code',
      'Moradia': 'fas fa-home',
      'Saúde': 'fas fa-heartbeat',
      'Educação': 'fas fa-graduation-cap'
    };
    
    return iconMap[category] || 'fas fa-circle';
  };

  const getIconColor = (type: string) => {
    return type === 'income' ? 'text-success' : 'text-primary';
  };

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="bg-card rounded-lg p-3 flex justify-between items-center border">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full bg-card-foreground/10 flex items-center justify-center ${getIconColor(transaction.type)}`}>
              <i className={`${getCategoryIcon(transaction.category, transaction.icon)} text-sm`}></i>
            </div>
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(transaction.date)} • {transaction.category}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className={`font-bold ${transaction.type === 'income' ? 'text-success' : 'text-destructive'}`}>
              {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
            </p>
            {showActions && (
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onEdit(transaction)}
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => onDelete(transaction.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}