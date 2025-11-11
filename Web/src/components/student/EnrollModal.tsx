import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EnrollModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId: string;
  planName: string;
}

export function EnrollModal({ open, onOpenChange, planId, planName }: EnrollModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create aluno
      const { data: aluno, error: alunoError } = await supabase
        .from('alunos')
        .insert({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          data_nascimento: formData.dataNascimento || null,
        })
        .select()
        .single();

      if (alunoError) throw alunoError;

      // Create matricula
      const dataVencimento = new Date();
      dataVencimento.setMonth(dataVencimento.getMonth() + 1);

      const { error: matriculaError } = await supabase
        .from('matriculas')
        .insert({
          aluno_id: aluno.id,
          plano_id: planId,
          data_vencimento: dataVencimento.toISOString().split('T')[0],
        });

      if (matriculaError) throw matriculaError;

      toast.success('Matrícula realizada com sucesso!');
      onOpenChange(false);
      setFormData({ nome: '', email: '', telefone: '', dataNascimento: '' });
    } catch (error: any) {
      toast.error(error.message || 'Erro ao realizar matrícula');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contratar {planName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone *</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dataNascimento">Data de Nascimento</Label>
            <Input
              id="dataNascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Processando...' : 'Confirmar Matrícula'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}