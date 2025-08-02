import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Goal } from '@/types';
import { X } from 'lucide-react';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Omit<Goal, 'id'>) => void;
  editingGoal?: Goal | null;
}

const goalColors = [
  '#0ea5e9', '#3b82f6', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'
];

export function GoalModal({ isOpen, onClose, onSave, editingGoal }: GoalModalProps) {
  const [title, setTitle] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [selectedColor, setSelectedColor] = useState(goalColors[0]);

  useEffect(() => {
    if (editingGoal) {
      setTitle(editingGoal.title);
      setCurrentAmount(editingGoal.currentAmount.toString());
      setTargetAmount(editingGoal.targetAmount.toString());
      setSelectedColor(editingGoal.color);
    } else {
      // Reset form
      setTitle('');
      setCurrentAmount('');
      setTargetAmount('');
      setSelectedColor(goalColors[0]);
    }
  }, [editingGoal, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !targetAmount) return;

    onSave({
      title,
      currentAmount: parseFloat(currentAmount) || 0,
      targetAmount: parseFloat(targetAmount),
      color: selectedColor
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            {editingGoal ? 'Editar Meta' : 'Nova Meta Financeira'}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm font-medium mb-1 block">
              Nome da Meta
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Reserva de emergência"
              required
            />
          </div>

          <div>
            <Label htmlFor="currentAmount" className="text-sm font-medium mb-1 block">
              Valor Atual
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                R$
              </span>
              <Input
                id="currentAmount"
                type="number"
                step="0.01"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                className="pl-8"
                placeholder="0,00"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="targetAmount" className="text-sm font-medium mb-1 block">
              Meta (Valor Objetivo)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                R$
              </span>
              <Input
                id="targetAmount"
                type="number"
                step="0.01"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="pl-8"
                placeholder="10000,00"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Cor da Meta</Label>
            <div className="grid grid-cols-8 gap-2">
              {goalColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? 'border-foreground' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {editingGoal ? 'Salvar Alterações' : 'Criar Meta'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}