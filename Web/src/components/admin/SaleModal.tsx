import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api-client';

type StatusVenda = 'em_negociacao' | 'fechado' | 'perdido';

interface SaleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sale?: any;
  onSuccess: () => void;
}

export function SaleModal({ open, onOpenChange, sale, onSuccess }: SaleModalProps) {
  const { toast } = useToast();
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    cliente: '',
    produto: '',
    valor: 0,
    status: 'em_negociacao' as StatusVenda,
    responsavel: '',
  });

  useEffect(() => {
    loadUsuarios();
    if (sale) {
      setFormData({
        cliente: sale.cliente || '',
        produto: sale.produto || '',
        valor: sale.valor || 0,
        status: sale.status || 'em_negociacao',
        responsavel: sale.responsavel || '',
      });
    } else {
      setFormData({
        cliente: '',
        produto: '',
        valor: 0,
        status: 'em_negociacao' as StatusVenda,
        responsavel: '',
      });
    }
  }, [sale, open]);

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
      if (sale) {
        await apiClient.updateVenda(sale.id, formData);
        toast({ title: 'Venda atualizada com sucesso!' });
      } else {
        await apiClient.createVenda(formData);
        toast({ title: 'Venda criada com sucesso!' });
      }
      
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar venda',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{sale ? 'Editar Venda' : 'Nova Venda'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cliente">Cliente</Label>
            <Input
              id="cliente"
              value={formData.cliente}
              onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="produto">Produto</Label>
            <Input
              id="produto"
              value={formData.produto}
              onChange={(e) => setFormData({ ...formData, produto: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor">Valor</Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as StatusVenda })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="em_negociacao">Em Negociação</SelectItem>
                <SelectItem value="fechado">Fechado</SelectItem>
                <SelectItem value="perdido">Perdido</SelectItem>
              </SelectContent>
            </Select>
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

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {sale ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
