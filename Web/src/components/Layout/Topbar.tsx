import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div className="text-lg font-semibold">
        Bem-vindo, {user?.name}
      </div>
      
      <Button variant="ghost" onClick={handleLogout} className="gap-2">
        <LogOut className="w-4 h-4" />
        Sair
      </Button>
    </header>
  );
}
