import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, UserX } from 'lucide-react';
import { UserModal } from '@/components/admin/UserModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const getPermissionColor = (permission: string) => {
  const colors: Record<string, string> = {
    vendedor: 'bg-blue-500',
    gestor: 'bg-purple-500',
    admin: 'bg-orange-500',
  };
  return colors[permission];
};

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erro ao carregar usuários',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setUsers(data || []);
    }
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleSuspend = async () => {
    if (!userToDelete) return;

    const userToUpdate = users.find(u => u.id === userToDelete);
    const newStatus = userToUpdate?.status === 'ativo' ? 'inativo' : 'ativo';

    const { error } = await supabase
      .from('usuarios')
      .update({ status: newStatus })
      .eq('id', userToDelete);

    if (error) {
      toast({
        title: 'Erro ao atualizar status',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ 
        title: `Usuário ${newStatus === 'inativo' ? 'suspenso' : 'ativado'} com sucesso!` 
      });
      loadUsers();
    }

    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

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
          <Button 
            className="gap-2"
            onClick={() => {
              setSelectedUser(null);
              setModalOpen(true);
            }}
          >
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
                        {user.nome.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{user.nome}</h3>
                        <p className="text-sm text-muted-foreground">{user.cargo || 'Sem cargo'}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      <Badge className={getPermissionColor(user.tipo)}>
                        {user.tipo.charAt(0).toUpperCase() + user.tipo.slice(1)}
                      </Badge>
                      <Badge
                        variant={user.status === 'ativo' ? 'default' : 'destructive'}
                      >
                        {user.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Criado em: {new Date(user.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleEdit(user)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        setUserToDelete(user.id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <UserX className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <UserModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        user={selectedUser}
        onSuccess={loadUsers}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alterar status do usuário</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja {users.find(u => u.id === userToDelete)?.status === 'ativo' ? 'suspender' : 'ativar'} este usuário?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleSuspend}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
