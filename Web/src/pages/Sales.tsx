import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { SaleModal } from '@/components/admin/SaleModal';
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

const getStageColor = (stage: string) => {
  const colors: Record<string, string> = {
    'em_negociacao': 'bg-yellow-500',
    'fechado': 'bg-green-500',
    'perdido': 'bg-red-500',
  };
  return colors[stage] || 'bg-gray-500';
};

const getStageLabel = (stage: string) => {
  const labels: Record<string, string> = {
    'em_negociacao': 'Em Negociação',
    'fechado': 'Fechado',
    'perdido': 'Perdido',
  };
  return labels[stage] || stage;
};

export default function Sales() {
  const [sales, setSales] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const data: any[] = await apiClient.getVendas();
      setSales(data);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar vendas',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (sale: any) => {
    setSelectedSale(sale);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!saleToDelete) return;

    try {
      await apiClient.deleteVenda(saleToDelete);
      toast({ title: 'Venda excluída com sucesso!' });
      loadSales();
    } catch (error: any) {
      toast({
        title: 'Erro ao excluir venda',
        description: error.message,
        variant: 'destructive',
      });
    }

    setDeleteDialogOpen(false);
    setSaleToDelete(null);
  };

  const filteredSales = filter === 'all' 
    ? sales 
    : sales.filter(s => s.responsavel === filter);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestão de Vendas</h1>
            <p className="text-muted-foreground">
              Controle de oportunidades e pipeline de vendas
            </p>
          </div>
          <Button 
            className="gap-2"
            onClick={() => {
              setSelectedSale(null);
              setModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Nova Venda
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Filtros</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  Todos
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-4">
          {filteredSales.map((sale) => (
            <Card key={sale.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="text-lg font-semibold">{sale.cliente}</h3>
                      <p className="text-sm text-muted-foreground">{sale.produto}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Valor:</span>
                        <Badge className="text-base">R$ {sale.valor.toFixed(2)}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge className={getStageColor(sale.status)}>
                          {getStageLabel(sale.status)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Responsável: {sale.responsavel || 'Não atribuído'}</span>
                      <span>•</span>
                      <span>Data: {new Date(sale.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleEdit(sale)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        setSaleToDelete(sale.id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <SaleModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        sale={selectedSale}
        onSuccess={loadSales}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta venda? Esta ação não pode ser desfeita.
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
