import { FinancialChart } from '@/components/FinancialChart';
import { TransactionList } from '@/components/TransactionList';
import { GoalsList } from '@/components/GoalsList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction, Goal } from '@/types';
import { generateChartData } from '@/utils/chartUtils';

interface DashboardProps {
  transactions: Transaction[];
  goals: Goal[];
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
  onEditGoal: (goal: Goal) => void;
  onDeleteGoal: (id: string) => void;
  onViewAllTransactions: () => void;
  onAddGoal: () => void;
}

export function Dashboard({ 
  transactions, 
  goals, 
  onEditTransaction, 
  onDeleteTransaction, 
  onEditGoal, 
  onDeleteGoal,
  onViewAllTransactions,
  onAddGoal
}: DashboardProps) {
  const calculateSummary = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;
    
    return { income, expenses, balance };
  };

  const { income, expenses, balance } = calculateSummary();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const recentTransactions = transactions.slice(0, 3);
  const chartData = generateChartData(transactions);

  return (
    <div className="space-y-6">
      {/* Financial Summary */}
      <Card className="gradient-card">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">Resumo Financeiro</CardTitle>
            <span className="text-xs bg-primary px-2 py-1 rounded-full text-primary-foreground">
              Mês atual
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-background/50 p-3 rounded-lg text-center backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Saldo</p>
              <p className={`font-bold ${balance >= 0 ? 'text-success' : 'text-destructive'}`}>
                {formatCurrency(balance)}
              </p>
            </div>
            <div className="bg-background/50 p-3 rounded-lg text-center backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Receitas</p>
              <p className="text-success font-bold">{formatCurrency(income)}</p>
            </div>
            <div className="bg-background/50 p-3 rounded-lg text-center backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Despesas</p>
              <p className="text-destructive font-bold">{formatCurrency(expenses)}</p>
            </div>
          </div>
          
          <div className="bg-background/50 rounded-lg p-2 backdrop-blur-sm">
            <FinancialChart data={chartData} />
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">Transações Recentes</h2>
          <Button 
            variant="ghost" 
            onClick={onViewAllTransactions}
            className="text-primary text-sm font-medium"
          >
            Ver todas
          </Button>
        </div>
        
        <TransactionList 
          transactions={recentTransactions}
          onEdit={onEditTransaction}
          onDelete={onDeleteTransaction}
        />
      </div>

      {/* Financial Goals */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">Metas Financeiras</h2>
          <Button 
            variant="ghost" 
            onClick={onAddGoal}
            className="text-primary text-sm font-medium"
          >
            Adicionar
          </Button>
        </div>
        
        <GoalsList 
          goals={goals}
          onEdit={onEditGoal}
          onDelete={onDeleteGoal}
        />
      </div>
    </div>
  );
}