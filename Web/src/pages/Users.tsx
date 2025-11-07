import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, UserX } from 'lucide-react';

interface User {
  id: string;
  name: string;
  role: string;
  permission: 'vendedor' | 'gestor' | 'admin';
  createdAt: string;
  lastAccess: string;
  status: 'ativa' | 'suspensa';
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Carlos Vendedor',
    role: 'Vendedor',
    permission: 'vendedor',
    createdAt: '01/01/2024',
    lastAccess: '20/01/2025',
    status: 'ativa',
  },
  {
    id: '2',
    name: 'Ana Gestora',
    role: 'Gerente de Vendas',
    permission: 'gestor',
    createdAt: '01/06/2023',
    lastAccess: '21/01/2025',
    status: 'ativa',
  },
  {
    id: '3',
    name: 'João Admin',
    role: 'Administrador',
    permission: 'admin',
    createdAt: '01/01/2023',
    lastAccess: '22/01/2025',
    status: 'ativa',
  },
  {
    id: '4',
    name: 'Pedro Vendedor',
    role: 'Vendedor',
    permission: 'vendedor',
    createdAt: '15/09/2024',
    lastAccess: '10/01/2025',
    status: 'suspensa',
  },
];

const getPermissionColor = (permission: string) => {
  const colors: Record<string, string> = {
    vendedor: 'bg-blue-500',
    gestor: 'bg-purple-500',
    admin: 'bg-orange-500',
  };
  return colors[permission];
};

export default function Users() {
  const [users] = useState<User[]>(mockUsers);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Controle de Acesso</h1>
            <p className="text-muted-foreground">
              Gerenciamento de usuários e permissões
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Usuário
          </Button>
        </div>

        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      <Badge className={getPermissionColor(user.permission)}>
                        {user.permission.charAt(0).toUpperCase() + user.permission.slice(1)}
                      </Badge>
                      <Badge
                        variant={user.status === 'ativa' ? 'default' : 'destructive'}
                      >
                        {user.status === 'ativa' ? 'Ativo' : 'Suspenso'}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Criado em: {user.createdAt}</span>
                      <span>•</span>
                      <span>Último acesso: {user.lastAccess}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <UserX className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
