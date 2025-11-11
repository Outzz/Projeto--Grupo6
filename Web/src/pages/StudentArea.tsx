import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { TrainingCalendar } from '@/components/student/TrainingCalendar';
import { PaymentModal } from '@/components/student/PaymentModal';
import { InvoicesTable } from '@/components/student/InvoicesTable';
import { SupportChat } from '@/components/student/SupportChat';
import { ProfileEditor } from '@/components/student/ProfileEditor';

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

export default function StudentArea() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Minha Área</h1>
          <p className="text-muted-foreground">Informações pessoais e histórico</p>
        </div>

        <TrainingCalendar plan={mockStudent.plan} />

        <div className="grid gap-4 md:grid-cols-2">
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
              <Button 
                className="w-full gap-2" 
                onClick={() => setPaymentModalOpen(true)}
              >
                <CreditCard className="w-4 h-4" />
                Assinar ou Renovar
              </Button>
            </CardContent>
          </Card>

          <ProfileEditor />
        </div>

        <InvoicesTable />
        <SupportChat />
      </div>
      
      <PaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        plan={mockStudent.plan}
        price={mockStudent.price}
      />
    </DashboardLayout>
  );
}
