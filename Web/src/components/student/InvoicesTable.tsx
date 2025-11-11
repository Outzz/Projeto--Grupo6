import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface Invoice {
  month: string;
  amount: string;
  status: 'pago' | 'aberto';
  dueDate: string;
}

const mockInvoices: Invoice[] = [
  { month: 'Janeiro 2025', amount: 'R$ 350,00', status: 'aberto', dueDate: '01/02/2025' },
  { month: 'Dezembro 2024', amount: 'R$ 350,00', status: 'pago', dueDate: '01/01/2025' },
  { month: 'Novembro 2024', amount: 'R$ 350,00', status: 'pago', dueDate: '01/12/2024' },
  { month: 'Outubro 2024', amount: 'R$ 350,00', status: 'pago', dueDate: '01/11/2024' },
];

export function InvoicesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Faturas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockInvoices.map((invoice, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 border rounded-lg ${
                invoice.status === 'aberto'
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              }`}
            >
              <div className="space-y-1">
                <p className="font-semibold">{invoice.month}</p>
                <p className="text-sm text-muted-foreground">
                  Vencimento: {invoice.dueDate}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold text-primary">{invoice.amount}</p>
                  <Badge
                    variant={invoice.status === 'pago' ? 'default' : 'destructive'}
                  >
                    {invoice.status === 'pago' ? 'Pago' : 'Em Aberto'}
                  </Badge>
                </div>
                <Button variant="outline" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
