import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { PlanModal } from '@/components/admin/PlanModal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type Plano = Database['public']['Tables']['planos']['Row'];

export default function Plans() {
  const [individualPlans, setIndividualPlans] = useState<Plano[]>([]);
  const [comboPlans, setComboPlans] = useState<Plano[]>([]);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plano | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);

  const fetchPlans = async () => {
    const { data } = await supabase.from('planos').select('*').order('nome');
    if (data) {
      setIndividualPlans(data.filter(p => p.tipo !== 'combo'));
      setComboPlans(data.filter(p => p.tipo === 'combo'));
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleEdit = (plan: Plano) => {
    setSelectedPlan(plan);
    setPlanModalOpen(true);
  };

  const handleNew = () => {
    setSelectedPlan(undefined);
    setPlanModalOpen(true);
  };

  const handleDeleteClick = (planId: string) => {
    setPlanToDelete(planId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!planToDelete) return;

    try {
      const { error } = await supabase.from('planos').delete().eq('id', planToDelete);
      if (error) throw error;
      toast.success('Plano excluído com sucesso!');
      fetchPlans();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao excluir plano');
    } finally {
      setDeleteDialogOpen(false);
      setPlanToDelete(null);
    }
  };
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Planos</h1>
            <p className="text-muted-foreground">
              Gerencie os planos disponíveis na academia
            </p>
          </div>
          <Button onClick={handleNew} className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Plano
          </Button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Planos Individuais</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {individualPlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{plan.nome}</span>
                    <Badge className="text-lg">R$ {plan.preco.toFixed(2)}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{plan.descricao}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(plan)} className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteClick(plan.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Planos Combo</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {comboPlans.map((combo) => (
              <Card key={combo.id} className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-primary">
                <CardHeader>
                  <CardTitle className="flex flex-col gap-2">
                    <span>{combo.nome}</span>
                    <div className="flex items-center justify-between">
                      <Badge className="text-lg">R$ {combo.preco.toFixed(2)}</Badge>
                      {combo.economia && (
                        <Badge variant="outline" className="text-primary">
                          Economize {combo.economia}
                        </Badge>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {combo.descricao || 'Combinação perfeita de modalidades com desconto especial'}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(combo)} className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteClick(combo.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <PlanModal
        open={planModalOpen}
        onOpenChange={setPlanModalOpen}
        plan={selectedPlan}
        onSuccess={fetchPlans}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este plano? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
