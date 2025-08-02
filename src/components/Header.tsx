import { Moon, Sun, User, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onUserClick: () => void;
}

export function Header({ isDarkMode, onThemeToggle, onUserClick }: HeaderProps) {
  return (
    <header className="bg-card p-4 border-b border-border flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        <Wallet className="text-primary text-xl" />
        <h1 className="text-xl font-bold">Dauvest</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onThemeToggle}
          className="text-muted-foreground hover:text-primary"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button 
          variant="default"
          size="icon"
          onClick={onUserClick}
          className="w-8 h-8 rounded-full bg-primary text-primary-foreground"
        >
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}