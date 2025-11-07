import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Phone, Mail, Users as UsersIcon, Calendar } from 'lucide-react';

interface Interaction {
  id: string;
  date: string;
  time: string;
  type: 'ligacao' | 'email' | 'reuniao' | 'visita';
  client: string;
  responsible: string;
  nextSteps: string;
  notes: string;
}

const mockInteractions: Interaction[] = [
  {
    id: '1',
    date: '22/01/2025',
    time: '14:30',
    type: 'ligacao',
    client: 'Maria Santos',
    responsible: 'Carlos Vendedor',
    nextSteps: 'Agendar visita à academia',
    notes: 'Cliente interessada no combo Musculação + Pilates',
  },
  {
    id: '2',
    date: '22/01/2025',
    time: '10:00',
    type: 'reuniao',
    client: 'João Oliveira',
    responsible: 'Ana Gestora',
    nextSteps: 'Enviar proposta comercial',
    notes: 'Negociação para plano corporativo',
  },
  {
    id: '3',
    date: '21/01/2025',
    time: '16:45',
    type: 'email',
    client: 'Paula Lima',
    responsible: 'Carlos Vendedor',
    nextSteps: 'Aguardar resposta do cliente',
    notes: 'Enviado material sobre aulas de Pilates',
  },
  {
    id: '4',
    date: '21/01/2025',
    time: '09:15',
    type: 'visita',
    client: 'Roberto Silva',
    responsible: 'Ana Gestora',
    nextSteps: 'Fazer follow-up por telefone',
    notes: 'Cliente visitou as instalações e conheceu os instrutores',
  },
];

const getTypeIcon = (type: string) => {
  const icons = {
    ligacao: Phone,
    email: Mail,
    reuniao: UsersIcon,
    visita: Calendar,
  };
  return icons[type as keyof typeof icons];
};

const getTypeLabel = (type: string) => {
  const labels = {
    ligacao: 'Ligação',
    email: 'E-mail',
    reuniao: 'Reunião',
    visita: 'Visita',
  };
  return labels[type as keyof typeof labels];
};

const getTypeColor = (type: string) => {
  const colors = {
    ligacao: 'bg-blue-500',
    email: 'bg-green-500',
    reuniao: 'bg-purple-500',
    visita: 'bg-orange-500',
  };
  return colors[type as keyof typeof colors];
};

export default function Interactions() {
  const [interactions] = useState<Interaction[]>(mockInteractions);

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
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Interação
          </Button>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-6">
            {interactions.map((interaction, index) => {
              const Icon = getTypeIcon(interaction.type);
              return (
                <div key={interaction.id} className="relative pl-16">
                  <div
                    className={`absolute left-0 w-12 h-12 rounded-full ${getTypeColor(
                      interaction.type
                    )} flex items-center justify-center text-white`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="flex items-center gap-2">
                            {interaction.client}
                            <Badge className={getTypeColor(interaction.type)}>
                              {getTypeLabel(interaction.type)}
                            </Badge>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {interaction.date} às {interaction.time}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Responsável
                        </p>
                        <p className="text-sm">{interaction.responsible}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Observações
                        </p>
                        <p className="text-sm">{interaction.notes}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Próximos Passos
                        </p>
                        <p className="text-sm font-medium text-primary">
                          {interaction.nextSteps}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
