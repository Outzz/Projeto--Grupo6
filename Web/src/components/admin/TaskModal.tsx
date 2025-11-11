import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api-client';

type Prioridade = 'baixa' | 'media' | 'alta';
type StatusTarefa = 'pendente' | 'em_andamento' | 'concluida';

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: any;
  onSuccess: () => void;
}

export function TaskModal({ open, onOpenChange, task, onSuccess }: TaskModalProps) {
  const { toast } = useToast();
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    descricao: '',
    responsavel: '',
    prazo: '',
    prioridade: 'media' as Prioridade,
    status: 'pendente' as StatusTarefa,
  });

  useEffect(() => {
    loadUsuarios();
    if (task) {
      setFormData({
        descricao: task.descricao || '',
        responsavel: task.responsavel || '',
        prazo: task.prazo || '',
        prioridade: task.prioridade || 'media',
        status: task.status || 'pendente',
      });
    } else {
      setFormData({
        descricao: '',
        responsavel: '',
        prazo: '',
        prioridade: 'media' as Prioridade,
        status: 'pendente' as StatusTarefa,
      });
    }
  }, [task, open]);

  const loadUsuarios = async () => {
    try {
      const data = await apiClient.getUsuarios();
      setUsuarios(data as any[]);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (task) {
        await apiClient.updateTarefa(task.id, formData);
        toast({ title: 'Tarefa atualizada com sucesso!' });
      } else {
        await apiClient.createTarefa(formData);
        toast({ title: 'Tarefa criada com sucesso!' });
      }
      
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar tarefa',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{task ? 'Editar Tarefa' : 'Nova Tarefa'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsavel">Responsável</Label>
            <Select
              value={formData.responsavel}
              onValueChange={(value) => setFormData({ ...formData, responsavel: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um responsável" />
              </SelectTrigger>
              <SelectContent>
                {usuarios.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prazo">Prazo</Label>
            <Input
              id="prazo"
              type="date"
              value={formData.prazo}
              onChange={(e) => setFormData({ ...formData, prazo: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prioridade">Prioridade</Label>
            <Select
              value={formData.prioridade}
              onValueChange={(value) => setFormData({ ...formData, prioridade: value as Prioridade })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baixa">Baixa</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as StatusTarefa })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {task ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
