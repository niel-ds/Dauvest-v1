import { Goal } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trash2, Edit3 } from 'lucide-react';

interface GoalsListProps {
  goals: Goal[];
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  showActions?: boolean;
}

export function GoalsList({ goals, onEdit, onDelete, showActions = false }: GoalsListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.round((current / target) * 100);
  };

  return (
    <div className="space-y-4">
      {goals.map((goal) => {
        const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
        
        return (
          <div key={goal.id} className="bg-card rounded-xl p-4 border">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{goal.title}</h3>
              {showActions && (
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEdit(goal)}
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onDelete(goal.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-medium">
                {formatCurrency(goal.currentAmount)}/{formatCurrency(goal.targetAmount)}
              </span>
            </div>
            
            <Progress 
              value={progress} 
              className="h-2"
              style={{
                '--progress-background': goal.color
              } as React.CSSProperties}
            />
            
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">{progress}% concluído</span>
              <span className="text-xs font-medium" style={{ color: goal.color }}>
                Faltam {formatCurrency(goal.targetAmount - goal.currentAmount)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}