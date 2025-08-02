import { Settings, Lock, Moon, Sun, HelpCircle, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export function Sidebar({ isOpen, onClose, isDarkMode, onThemeToggle }: SidebarProps) {
  const menuItems = [
    { icon: Settings, label: 'Configurações', action: () => {} },
    { icon: Lock, label: 'Segurança', action: () => {} },
    { icon: isDarkMode ? Sun : Moon, label: 'Tema', action: onThemeToggle },
    { icon: HelpCircle, label: 'Ajuda', action: () => {} },
    { icon: LogOut, label: 'Sair', action: () => {} }
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-card z-30 transform transition-transform duration-300 shadow-xl ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4 border-b border-border flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-medium">Usuário Dauvest</p>
            <p className="text-xs text-muted-foreground">Premium Member</p>
          </div>
        </div>
        
        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start space-x-3 h-auto py-3"
                onClick={item.action}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">Dauvest v1.0.0</p>
        </div>
      </div>
    </>
  );
}