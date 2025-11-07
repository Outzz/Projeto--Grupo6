import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  CheckSquare, 
  BarChart3, 
  Shield, 
  CreditCard,
  MessageSquare,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const adminMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Alunos', path: '/alunos' },
  { icon: ShoppingCart, label: 'Vendas', path: '/vendas' },
  { icon: CheckSquare, label: 'Tarefas', path: '/tarefas' },
  { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
  { icon: Shield, label: 'Usuários', path: '/usuarios' },
  { icon: CreditCard, label: 'Planos', path: '/planos' },
  { icon: MessageSquare, label: 'Interações', path: '/interacoes' },
];

const studentMenuItem = [
  { icon: User, label: 'Minha Área', path: '/aluno' },
];

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  
  const menuItems = user?.role === 'admin' ? adminMenuItems : studentMenuItem;

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Renova Academia</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
