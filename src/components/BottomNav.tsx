import { Home, PieChart, Target, Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'analytics', icon: PieChart, label: 'Análises' },
    { id: 'goals', icon: Target, label: 'Metas' },
    { id: 'community', icon: Users, label: 'Comunidade' },
    { id: 'account', icon: User, label: 'Conta' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around py-2 max-w-md mx-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center p-2 ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs mt-1">{tab.label}</span>
          </Button>
        );
      })}
    </nav>
  );
}