import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type Plano = Database['public']['Tables']['planos']['Row'];
type TipoPlano = Database['public']['Enums']['tipo_plano'];

interface PlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: Plano;
  onSuccess: () => void;
}

export function PlanModal({ open, onOpenChange, plan, onSuccess }: PlanModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'musculacao' as TipoPlano,
    preco: '',
    descricao: '',
    economia: '',
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        nome: plan.nome,
        tipo: plan.tipo,
        preco: plan.preco.toString(),
        descricao: plan.descricao || '',
        economia: plan.economia || '',
      });
    } else {
      setFormData({
        nome: '',
        tipo: 'musculacao',
        preco: '',
        descricao: '',
        economia: '',
      });
    }
  }, [plan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        nome: formData.nome,
        tipo: formData.tipo,
        preco: parseFloat(formData.preco),
        descricao: formData.descricao || null,
        economia: formData.economia || null,
      };

      if (plan) {
        const { error } = await supabase
          .from('planos')
          .update(data)
          .eq('id', plan.id);

        if (error) throw error;
        toast.success('Plano atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('planos')
          .insert(data);

        if (error) throw error;
        toast.success('Plano criado com sucesso!');
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar plano');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{plan ? 'Editar Plano' : 'Novo Plano'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo *</Label>
            <Select value={formData.tipo} onValueChange={(value: TipoPlano) => setFormData({ ...formData, tipo: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="musculacao">Musculação</SelectItem>
                <SelectItem value="zumba">Zumba</SelectItem>
                <SelectItem value="pilates">Pilates</SelectItem>
                <SelectItem value="combo">Combo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="preco">Preço *</Label>
            <Input
              id="preco"
              type="number"
              step="0.01"
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              rows={3}
            />
          </div>
          {formData.tipo === 'combo' && (
            <div className="space-y-2">
              <Label htmlFor="economia">Economia</Label>
              <Input
                id="economia"
                placeholder="Ex: R$ 10,00"
                value={formData.economia}
                onChange={(e) => setFormData({ ...formData, economia: e.target.value })}
              />
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