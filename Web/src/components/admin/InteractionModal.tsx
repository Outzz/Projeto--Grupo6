import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api-client';

type TipoInteracao = 'ligacao' | 'email' | 'reuniao' | 'suporte';
type StatusInteracao = 'pendente' | 'em_andamento' | 'concluido';

interface InteractionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interaction?: any;
  onSuccess: () => void;
}

export function InteractionModal({ open, onOpenChange, interaction, onSuccess }: InteractionModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0],
    tipo: 'ligacao' as TipoInteracao,
    responsavel: '',
    observacoes: '',
    resposta: '',
    status: 'pendente' as StatusInteracao,
  });

  useEffect(() => {
    if (interaction) {
      setFormData({
        data: interaction.data?.split('T')[0] || new Date().toISOString().split('T')[0],
        tipo: interaction.tipo || 'ligacao',
        responsavel: interaction.responsavel || '',
        observacoes: interaction.observacoes || '',
        resposta: interaction.resposta || '',
        status: interaction.status || 'pendente',
      });
    } else {
      setFormData({
        data: new Date().toISOString().split('T')[0],
        tipo: 'ligacao' as TipoInteracao,
        responsavel: '',
        observacoes: '',
        resposta: '',
        status: 'pendente' as StatusInteracao,
      });
    }
  }, [interaction, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (interaction) {
        await apiClient.updateInteracao(interaction.id, formData);
        toast({ title: 'Interação atualizada com sucesso!' });
      } else {
        await apiClient.createInteracao(formData);
        toast({ title: 'Interação criada com sucesso!' });
      }
      
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar interação',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{interaction ? 'Editar Interação' : 'Nova Interação'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="data">Data</Label>
            <Input
              id="data"
              type="date"
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo</Label>
            <Select
              value={formData.tipo}
              onValueChange={(value) => setFormData({ ...formData, tipo: value as TipoInteracao })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ligacao">Ligação</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
                <SelectItem value="reuniao">Reunião</SelectItem>
                <SelectItem value="visita">Visita</SelectItem>
                <SelectItem value="suporte">Suporte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsavel">Responsável</Label>
            <Input
              id="responsavel"
              value={formData.responsavel}
              onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
            />
          </div>

          {formData.tipo === 'suporte' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="resposta">Resposta</Label>
                <Textarea
                  id="resposta"
                  value={formData.resposta}
                  onChange={(e) => setFormData({ ...formData, resposta: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as StatusInteracao })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="respondido">Respondido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {interaction ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
