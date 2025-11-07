import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Mail, Phone, CreditCard } from 'lucide-react';

const mockStudent = {
  name: 'João Silva',
  email: 'joao.silva@email.com',
  phone: '(11) 99999-9999',
  plan: 'Musculação + Pilates',
  startDate: '01/01/2025',
  dueDate: '01/02/2025',
  status: 'ativa' as const,
  price: 'R$ 350,00',
};

const interactions = [
  {
    date: '15/01/2025',
    type: 'Ligação',
    observation: 'Cliente interessado em adicionar aulas de Zumba',
  },
  {
    date: '10/01/2025',
    type: 'E-mail',
    observation: 'Enviado lembrete de pagamento',
  },
  {
    date: '05/01/2025',
    type: 'Presencial',
    observation: 'Orientação sobre treino de hipertrofia',
  },
];

export default function StudentArea() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Minha Área</h1>
          <p className="text-muted-foreground">Informações pessoais e histórico</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{mockStudent.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{mockStudent.phone}</span>
                </div>
              </div>
              <Button className="w-full">Atualizar Informações</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plano Contratado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Plano:</span>
                  <span className="font-semibold">{mockStudent.plan}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Valor:</span>
                  <span className="font-semibold text-primary">{mockStudent.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Início:</span>
                  <span className="font-semibold">{mockStudent.startDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Vencimento:</span>
                  <span className="font-semibold">{mockStudent.dueDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={mockStudent.status === 'ativa' ? 'default' : 'destructive'}>
                    {mockStudent.status === 'ativa' ? 'Ativa' : 'Inativa'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Interações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interactions.map((interaction, i) => (
                <div
                  key={i}
                  className="border-l-4 border-primary pl-4 py-2 space-y-1"
                >
                  <div className="flex items-center gap-4">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{interaction.date}</span>
                    <Badge variant="outline">{interaction.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {interaction.observation}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
