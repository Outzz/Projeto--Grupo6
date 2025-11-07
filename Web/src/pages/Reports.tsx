import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';

const salesByPeriod = [
  { month: 'Jan', vendas: 45 },
  { month: 'Fev', vendas: 52 },
  { month: 'Mar', vendas: 48 },
  { month: 'Abr', vendas: 61 },
  { month: 'Mai', vendas: 55 },
  { month: 'Jun', vendas: 67 },
];

const conversionData = [
  { name: 'Leads', value: 120 },
  { name: 'Convertidos', value: 67 },
];

const revenueByVendor = [
  { vendedor: 'Carlos', faturamento: 45000 },
  { vendedor: 'Ana', faturamento: 38000 },
  { vendedor: 'Pedro', faturamento: 29000 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

const kpis = [
  {
    title: 'Taxa de Conversão',
    value: '55.8%',
    icon: TrendingUp,
    change: '+8%',
  },
  {
    title: 'Clientes Ativos',
    value: '234',
    icon: Users,
    change: '+12%',
  },
  {
    title: 'Faturamento Total',
    value: 'R$ 112.000',
    icon: DollarSign,
    change: '+18%',
  },
  {
    title: 'Meta do Mês',
    value: '87%',
    icon: Target,
    change: '+5%',
  },
];

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Relatórios e Métricas</h1>
          <p className="text-muted-foreground">
            Análise de desempenho e indicadores
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {kpi.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-primary">{kpi.change}</span> vs mês passado
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Vendas por Período</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesByPeriod}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="vendas"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Taxa de Conversão</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={conversionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {conversionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Faturamento por Vendedor</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueByVendor}>
                  <XAxis dataKey="vendedor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="faturamento" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Comparativo Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-sm font-medium border-b pb-2">
                <span>Métrica</span>
                <span>Atual</span>
                <span>Mês Anterior</span>
                <span>Variação</span>
              </div>
              {[
                { metric: 'Novos Leads', current: 45, previous: 38, change: '+18%' },
                { metric: 'Vendas Fechadas', current: 67, previous: 61, change: '+10%' },
                { metric: 'Tempo Médio', current: '12 dias', previous: '15 dias', change: '-20%' },
                { metric: 'Ticket Médio', current: 'R$ 245', previous: 'R$ 220', change: '+11%' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 text-sm py-2 border-b last:border-0">
                  <span className="font-medium">{row.metric}</span>
                  <span>{row.current}</span>
                  <span className="text-muted-foreground">{row.previous}</span>
                  <span className="text-primary font-medium">{row.change}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
