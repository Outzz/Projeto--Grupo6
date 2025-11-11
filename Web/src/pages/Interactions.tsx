import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Phone, Mail, Users as UsersIcon, Calendar } from 'lucide-react';
import { InteractionModal } from '@/components/admin/InteractionModal';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api-client';

const getTypeIcon = (type: string) => {
  const icons = {
    ligacao: Phone,
    email: Mail,
    reuniao: UsersIcon,
    visita: Calendar,
    suporte: Mail,
  };
  return icons[type as keyof typeof icons];
};

const getTypeLabel = (type: string) => {
  const labels = {
    ligacao: 'Ligação',
    email: 'E-mail',
    reuniao: 'Reunião',
    visita: 'Visita',
    suporte: 'Suporte',
  };
  return labels[type as keyof typeof labels];
};

const getTypeColor = (type: string) => {
  const colors = {
    ligacao: 'bg-blue-500',
    email: 'bg-green-500',
    reuniao: 'bg-purple-500',
    visita: 'bg-orange-500',
    suporte: 'bg-red-500',
  };
  return colors[type as keyof typeof colors];
};

export default function Interactions() {
  const [interactions, setInteractions] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadInteractions();
  }, []);

  const loadInteractions = async () => {
    try {
      const data: any[] = await apiClient.getInteracoes();
      // Ordenar por data decrescente
      const sorted = data.sort((a: any, b: any) => 
        new Date(b.data).getTime() - new Date(a.data).getTime()
      );
      setInteractions(sorted);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar interações',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Histórico de Interações</h1>
            <p className="text-muted-foreground">
              Registro de contatos com clientes e leads
            </p>
          </div>
          <Button 
            className="gap-2"
            onClick={() => {
              setSelectedInteraction(null);
              setModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Nova Interação
          </Button>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-6">
            {interactions.map((interaction) => {
              const Icon = getTypeIcon(interaction.tipo);
              return (
                <div key={interaction.id} className="relative pl-16">
                  <div
                    className={`absolute left-0 w-12 h-12 rounded-full ${getTypeColor(
                      interaction.tipo
                    )} flex items-center justify-center text-white`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="flex items-center gap-2">
                            {interaction.responsavel}
                            <Badge className={getTypeColor(interaction.tipo)}>
                              {getTypeLabel(interaction.tipo)}
                            </Badge>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {new Date(interaction.data).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {interaction.observacoes && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Observações
                          </p>
                          <p className="text-sm">{interaction.observacoes}</p>
                        </div>
                      )}
                      {interaction.resposta && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Resposta
                          </p>
                          <p className="text-sm">{interaction.resposta}</p>
                        </div>
                      )}
                      {interaction.tipo === 'suporte' && (
                        <Badge variant={interaction.status === 'respondido' ? 'default' : 'destructive'}>
                          {interaction.status === 'respondido' ? 'Respondido' : 'Pendente'}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <InteractionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        interaction={selectedInteraction}
        onSuccess={loadInteractions}
      />
    </DashboardLayout>
  );
}
