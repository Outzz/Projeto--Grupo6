import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { TaskModal } from '@/components/admin/TaskModal';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api-client';
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

const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    baixa: 'bg-blue-500',
    media: 'bg-yellow-500',
    alta: 'bg-red-500',
  };
  return colors[priority];
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pendente: 'Pendente',
    em_andamento: 'Em Andamento',
    concluida: 'Concluída',
  };
  return labels[status];
};

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data: any[] = await apiClient.getTarefas();
      setTasks(data);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar tarefas',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (task: any) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!taskToDelete) return;

    try {
      await apiClient.deleteTarefa(taskToDelete);
      toast({ title: 'Tarefa excluída com sucesso!' });
      loadTasks();
    } catch (error: any) {
      toast({
        title: 'Erro ao excluir tarefa',
        description: error.message,
        variant: 'destructive',
      });
    }

    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tarefas e Lembretes</h1>
            <p className="text-muted-foreground">
              Gerencie atividades e compromissos da equipe
            </p>
          </div>
          <Button 
            className="gap-2" 
            onClick={() => {
              setSelectedTask(null);
              setModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </Button>
        </div>

        <div className="grid gap-4">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className={`border-l-4 ${getPriorityColor(task.prioridade)}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{task.descricao}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Responsável: {task.responsavel || 'Não atribuído'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleEdit(task)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        setTaskToDelete(task.id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <Badge className={getPriorityColor(task.prioridade)}>
                    Prioridade: {task.prioridade.charAt(0).toUpperCase() + task.prioridade.slice(1)}
                  </Badge>
                  <Badge variant="outline">
                    {getStatusLabel(task.status)}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Prazo: {new Date(task.prazo).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                {task.status !== 'concluida' && (
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: task.status === 'em_andamento' ? '50%' : '10%',
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <TaskModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        task={selectedTask}
        onSuccess={loadTasks}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
