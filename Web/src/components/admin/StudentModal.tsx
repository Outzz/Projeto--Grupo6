import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type Aluno = Database['public']['Tables']['alunos']['Row'];
type Plano = Database['public']['Tables']['planos']['Row'];

interface StudentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Aluno & { plano_id?: string };
  onSuccess: () => void;
}

export function StudentModal({ open, onOpenChange, student, onSuccess }: StudentModalProps) {
  const [loading, setLoading] = useState(false);
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    planoId: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        nome: student.nome,
        email: student.email,
        telefone: student.telefone,
        dataNascimento: student.data_nascimento || '',
        planoId: student.plano_id || '',
      });
    } else {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        planoId: '',
      });
    }
  }, [student]);

  useEffect(() => {
    const fetchPlanos = async () => {
      const { data } = await supabase.from('planos').select('*').order('nome');
      if (data) setPlanos(data);
    };
    fetchPlanos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (student) {
        const { error } = await supabase
          .from('alunos')
          .update({
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone,
            data_nascimento: formData.dataNascimento || null,
          })
          .eq('id', student.id);

        if (error) throw error;
        toast.success('Aluno atualizado com sucesso!');
      } else {
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

        if (formData.planoId) {
          const dataVencimento = new Date();
          dataVencimento.setMonth(dataVencimento.getMonth() + 1);

          const { error: matriculaError } = await supabase
            .from('matriculas')
            .insert({
              aluno_id: aluno.id,
              plano_id: formData.planoId,
              data_vencimento: dataVencimento.toISOString().split('T')[0],
            });

          if (matriculaError) throw matriculaError;
        }

        toast.success('Aluno criado com sucesso!');
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar aluno');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{student ? 'Editar Aluno' : 'Novo Aluno'}</DialogTitle>
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
          {!student && (
            <div className="space-y-2">
              <Label htmlFor="plano">Plano (opcional)</Label>
              <Select value={formData.planoId} onValueChange={(value) => setFormData({ ...formData, planoId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um plano" />
                </SelectTrigger>
                <SelectContent>
                  {planos.map((plano) => (
                    <SelectItem key={plano.id} value={plano.id}>
                      {plano.nome} - R$ {plano.preco.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}