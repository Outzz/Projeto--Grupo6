import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const stats = [
  {
    title: 'Alunos Ativos',
    value: '234',
    icon: Users,
    change: '+12%',
  },
  {
    title: 'Total de Matrículas',
    value: '187',
    icon: CreditCard,
    change: '+8%',
  },
  {
    title: 'Faturamento',
    value: 'R$ 45.280',
    icon: DollarSign,
    change: '+18%',
  },
  {
    title: 'Planos Disponíveis',
    value: '6',
    icon: TrendingUp,
    change: '0%',
  },
];

const plansData = [
  { name: 'Musculação', total: 89 },
  { name: 'Zumba', total: 45 },
  { name: 'Pilates', total: 32 },
  { name: 'Musculação + Pilates', total: 21 },
];

const funnelData = [
  { stage: 'Novos', count: 45 },
  { stage: 'Ativos', count: 189 },
  { stage: 'Atrasados', count: 12 },
  { stage: 'Cancelados', count: 8 },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da academia</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-primary">{stat.change}</span> vs mês passado
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Planos Mais Contratados</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={plansData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Funil de Alunos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={funnelData}>
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Nova matrícula', user: 'Maria Silva', time: 'Há 5 minutos' },
                { action: 'Pagamento recebido', user: 'João Santos', time: 'Há 15 minutos' },
                { action: 'Plano renovado', user: 'Ana Costa', time: 'Há 1 hora' },
                { action: 'Nova venda', user: 'Carlos Lima', time: 'Há 2 horas' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
