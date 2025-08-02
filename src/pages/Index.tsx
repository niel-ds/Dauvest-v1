import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Sidebar } from '@/components/Sidebar';
import { TransactionModal } from '@/components/TransactionModal';
import { GoalModal } from '@/components/GoalModal';
import { Dashboard } from '@/pages/Dashboard';
import { Analytics } from '@/pages/Analytics';
import { Transactions } from '@/pages/Transactions';
import { GoalsList } from '@/components/GoalsList';
import { Community } from '@/pages/Community';
import Account from '@/pages/Account';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAuth } from '@/hooks/useAuth';
import { Transaction, Goal } from '@/types';
import { mockTransactions, mockGoals } from '@/data/mockData';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', true);
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', mockTransactions);
  const [goals, setGoals] = useLocalStorage<Goal[]>('goals', mockGoals);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light', isDarkMode);
  };

  const handleSaveTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      setTransactions(transactions.map(t => 
        t.id === editingTransaction.id 
          ? { ...transactionData, id: editingTransaction.id }
          : t
      ));
      setEditingTransaction(null);
    } else {
      const newTransaction: Transaction = {
        ...transactionData,
        id: Date.now().toString()
      };
      setTransactions([newTransaction, ...transactions]);
    }
  };

  const handleSaveGoal = (goalData: Omit<Goal, 'id'>) => {
    if (editingGoal) {
      setGoals(goals.map(g => 
        g.id === editingGoal.id 
          ? { ...goalData, id: editingGoal.id }
          : g
      ));
      setEditingGoal(null);
    } else {
      const newGoal: Goal = {
        ...goalData,
        id: Date.now().toString()
      };
      setGoals([...goals, newGoal]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <Analytics transactions={transactions} />;
      case 'transactions':
        return (
          <Transactions
            transactions={transactions}
            onEditTransaction={(transaction) => { setEditingTransaction(transaction); setIsTransactionModalOpen(true); }}
            onDeleteTransaction={(id) => setTransactions(transactions.filter(t => t.id !== id))}
          />
        );
      case 'goals':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Metas Financeiras</h1>
              <Button onClick={() => setIsGoalModalOpen(true)}>Adicionar Meta</Button>
            </div>
            <GoalsList 
              goals={goals} 
              onEdit={(goal) => { setEditingGoal(goal); setIsGoalModalOpen(true); }}
              onDelete={(id) => setGoals(goals.filter(g => g.id !== id))}
              showActions
            />
          </div>
        );
      case 'community':
        return <Community />;
      case 'account':
        return <Account />;
      default:
        return (
          <Dashboard
            transactions={transactions}
            goals={goals}
            onEditTransaction={(transaction) => { setEditingTransaction(transaction); setIsTransactionModalOpen(true); }}
            onDeleteTransaction={(id) => setTransactions(transactions.filter(t => t.id !== id))}
            onEditGoal={(goal) => { setEditingGoal(goal); setIsGoalModalOpen(true); }}
            onDeleteGoal={(id) => setGoals(goals.filter(g => g.id !== id))}
            onViewAllTransactions={() => setActiveTab('transactions')}
            onAddGoal={() => setIsGoalModalOpen(true)}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="app-container">
      <Header 
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        onUserClick={() => setIsSidebarOpen(true)}
      />
      
      <main className="pb-20 p-4">
        {renderContent()}
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      <Button 
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full floating-btn"
        onClick={() => setIsTransactionModalOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
      
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
      />
      
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => { setIsTransactionModalOpen(false); setEditingTransaction(null); }}
        onSave={handleSaveTransaction}
        editingTransaction={editingTransaction}
      />
      
      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => { setIsGoalModalOpen(false); setEditingGoal(null); }}
        onSave={handleSaveGoal}
        editingGoal={editingGoal}
      />
    </div>
  );
};

export default Index;
