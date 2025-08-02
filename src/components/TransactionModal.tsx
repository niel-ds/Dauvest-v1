import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Transaction } from '@/types';
import { categories } from '@/data/mockData';
import { X } from 'lucide-react';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id'>) => void;
  editingTransaction?: Transaction | null;
}

export function TransactionModal({ isOpen, onClose, onSave, editingTransaction }: TransactionModalProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setAmount(editingTransaction.amount.toString());
      setCategory(editingTransaction.category);
      setDescription(editingTransaction.description);
      setDate(editingTransaction.date);
    } else {
      // Reset form
      setType('expense');
      setAmount('');
      setCategory('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [editingTransaction, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description) {
      console.log('Validation failed:', { amount, description, category });
      return;
    }

    // Se não há categoria selecionada, usar uma categoria padrão baseada no tipo
    let finalCategory = category;
    let finalIcon = '';
    
    if (category) {
      const selectedCategory = [...categories.income, ...categories.expense].find(
        cat => cat.value === category
      );
      finalCategory = selectedCategory?.label || category;
      finalIcon = selectedCategory?.icon || '';
    } else {
      // Categoria padrão se nenhuma for selecionada
      finalCategory = type === 'income' ? 'Outros' : 'Diversos';
      finalIcon = type === 'income' ? 'fas fa-plus-circle' : 'fas fa-circle';
    }

    console.log('Saving transaction:', {
      type,
      amount: parseFloat(amount),
      category: finalCategory,
      description,
      date,
      icon: finalIcon
    });

    onSave({
      type,
      amount: parseFloat(amount),
      category: finalCategory,
      description,
      date,
      icon: finalIcon
    });

    onClose();
  };

  const availableCategories = type === 'income' ? categories.income : categories.expense;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            {editingTransaction ? 'Editar Transação' : 'Nova Transação'}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Tipo</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                className={type === 'income' 
                  ? 'bg-success border-success text-white shadow-lg shadow-success/20 hover:bg-success/90' 
                  : 'border-success/30 text-success hover:bg-success/10 hover:border-success'
                }
                onClick={() => setType('income')}
              >
                <span className="flex items-center space-x-2">
                  <span className={type === 'income' ? 'text-white' : 'text-success'}>+</span>
                  <span>Receita</span>
                </span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className={type === 'expense' 
                  ? 'bg-destructive border-destructive text-white shadow-lg shadow-destructive/20 hover:bg-destructive/90' 
                  : 'border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive'
                }
                onClick={() => setType('expense')}
              >
                <span className="flex items-center space-x-2">
                  <span className={type === 'expense' ? 'text-white' : 'text-destructive'}>-</span>
                  <span>Despesa</span>
                </span>
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="amount" className="text-sm font-medium mb-1 block">
              Valor
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                R$
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
                placeholder="0,00"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium mb-1 block">
              Categoria
            </Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center space-x-2">
                      <i className={`${cat.icon} text-sm`}></i>
                      <span>{cat.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium mb-1 block">
              Descrição
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Supermercado mensal"
              required
            />
          </div>

          <div>
            <Label htmlFor="date" className="text-sm font-medium mb-1 block">
              Data
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {editingTransaction ? 'Salvar Alterações' : 'Adicionar Transação'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}