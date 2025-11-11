import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Smartphone, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: string;
  price: string;
}

export function PaymentModal({ open, onOpenChange, plan, price }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const { toast } = useToast();

  const handlePayment = () => {
    toast({
      title: "Pagamento processado!",
      description: `Seu pagamento de ${price} foi confirmado com sucesso.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Renovar Plano - {plan}</DialogTitle>
          <p className="text-sm text-muted-foreground">Valor: {price}</p>
        </DialogHeader>

        <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="credit">
              <CreditCard className="w-4 h-4 mr-2" />
              Crédito
            </TabsTrigger>
            <TabsTrigger value="debit">
              <CreditCard className="w-4 h-4 mr-2" />
              Débito
            </TabsTrigger>
            <TabsTrigger value="pix">
              <Smartphone className="w-4 h-4 mr-2" />
              PIX
            </TabsTrigger>
            <TabsTrigger value="boleto">
              <FileText className="w-4 h-4 mr-2" />
              Boleto
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credit" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Número do Cartão</Label>
              <Input id="card-number" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Validade</Label>
                <Input id="expiry" placeholder="MM/AA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nome no Cartão</Label>
              <Input id="name" placeholder="Nome completo" />
            </div>
            <Button className="w-full" onClick={handlePayment}>
              Confirmar Pagamento
            </Button>
          </TabsContent>

          <TabsContent value="debit" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="debit-card">Número do Cartão</Label>
              <Input id="debit-card" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="debit-expiry">Validade</Label>
                <Input id="debit-expiry" placeholder="MM/AA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="debit-cvv">CVV</Label>
                <Input id="debit-cvv" placeholder="123" />
              </div>
            </div>
            <Button className="w-full" onClick={handlePayment}>
              Confirmar Pagamento
            </Button>
          </TabsContent>

          <TabsContent value="pix" className="space-y-4">
            <div className="text-center space-y-4">
              <div className="bg-muted p-8 rounded-lg">
                <p className="text-sm text-muted-foreground mb-4">QR Code PIX</p>
                <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center">
                  <div className="text-6xl">📱</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Chave PIX: pagamento@renovaacademia.com.br
              </p>
              <Button className="w-full" onClick={handlePayment}>
                Já realizei o pagamento
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="boleto" className="space-y-4">
            <div className="text-center space-y-4">
              <div className="bg-muted p-6 rounded-lg">
                <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="font-semibold">Boleto Bancário</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Código de barras será gerado após confirmação
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Vencimento: {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
              </p>
              <Button className="w-full" onClick={handlePayment}>
                Gerar Boleto
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
