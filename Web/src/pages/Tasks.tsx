import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';

interface Task {
  id: string;
  description: string;
  responsible: string;
  startDate: string;
  dueDate: string;
  priority: 'baixa' | 'media' | 'alta';
  status: 'pendente' | 'em_andamento' | 'concluida';
  notes: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    description: 'Ligar para leads da semana',
    responsible: 'Carlos Vendedor',
    startDate: '20/01/2025',
    dueDate: '22/01/2025',
    priority: 'alta',
    status: 'em_andamento',
    notes: 'Focar nos interessados em combos',
  },
  {
    id: '2',
    description: 'Preparar relatório mensal',
    responsible: 'Ana Gestora',
    startDate: '18/01/2025',
    dueDate: '31/01/2025',
    priority: 'media',
    status: 'pendente',
    notes: 'Incluir métricas de vendas e conversão',
  },
  {
    id: '3',
    description: 'Atualizar base de dados de alunos',
    responsible: 'João Admin',
    startDate: '15/01/2025',
    dueDate: '20/01/2025',
    priority: 'baixa',
    status: 'concluida',
    notes: 'Verificar dados duplicados',
  },
];

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
  const [tasks] = useState<Task[]>(mockTasks);

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
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </Button>
        </div>

        <div className="grid gap-4">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className={`border-l-4 ${getPriorityColor(task.priority)}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{task.description}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Responsável: {task.responsible}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <Badge className={getPriorityColor(task.priority)}>
                    Prioridade: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                  <Badge variant="outline">
                    {getStatusLabel(task.status)}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Início: {task.startDate}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Prazo: {task.dueDate}</span>
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

                <p className="text-sm text-muted-foreground border-t pt-3">
                  <strong>Observações:</strong> {task.notes}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
