import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Sale {
  id: string;
  client: string;
  product: string;
  value: string;
  stage: string;
  probability: number;
  responsible: string;
  date: string;
}

const mockSales: Sale[] = [
  {
    id: '1',
    client: 'Maria Santos',
    product: 'Combo Musculação + Pilates',
    value: 'R$ 350,00',
    stage: 'Negociação',
    probability: 75,
    responsible: 'Carlos Vendedor',
    date: '20/01/2025',
  },
  {
    id: '2',
    client: 'João Oliveira',
    product: 'Plano Zumba',
    value: 'R$ 120,00',
    stage: 'Fechamento',
    probability: 90,
    responsible: 'Ana Vendedora',
    date: '18/01/2025',
  },
  {
    id: '3',
    client: 'Paula Lima',
    product: 'Plano Pilates',
    value: 'R$ 210,00',
    stage: 'Contato Inicial',
    probability: 30,
    responsible: 'Carlos Vendedor',
    date: '22/01/2025',
  },
];

const getStageColor = (stage: string) => {
  const colors: Record<string, string> = {
    'Contato Inicial': 'bg-blue-500',
    'Negociação': 'bg-yellow-500',
    'Fechamento': 'bg-green-500',
  };
  return colors[stage] || 'bg-gray-500';
};

export default function Sales() {
  const [sales] = useState<Sale[]>(mockSales);
  const [filter, setFilter] = useState('all');

  const filteredSales = filter === 'all' 
    ? sales 
    : sales.filter(s => s.responsible === filter);

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
          <Button className="gap-2">
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
                <Button
                  variant={filter === 'Carlos Vendedor' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('Carlos Vendedor')}
                >
                  Carlos
                </Button>
                <Button
                  variant={filter === 'Ana Vendedora' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('Ana Vendedora')}
                >
                  Ana
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
                      <h3 className="text-lg font-semibold">{sale.client}</h3>
                      <p className="text-sm text-muted-foreground">{sale.product}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Valor:</span>
                        <Badge className="text-base">{sale.value}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Etapa:</span>
                        <Badge className={getStageColor(sale.stage)}>
                          {sale.stage}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Probabilidade:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${sale.probability}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{sale.probability}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Responsável: {sale.responsible}</span>
                      <span>•</span>
                      <span>Data: {sale.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
