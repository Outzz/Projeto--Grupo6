import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import musculacaoImg from '@/assets/musculacao-plan.jpg';
import zumbaImg from '@/assets/zumba-plan.jpg';
import pilatesImg from '@/assets/pilates-plan.jpg';
import comboImg from '@/assets/combo-plan.jpg';

const individualPlans = [
  {
    name: 'Musculação',
    price: 'R$ 150,00',
    image: musculacaoImg,
    description: 'Treinamento focado em hipertrofia e força',
  },
  {
    name: 'Zumba',
    price: 'R$ 120,00',
    image: zumbaImg,
    description: 'Aulas de dança fitness energéticas',
  },
  {
    name: 'Pilates',
    price: 'R$ 210,00',
    image: pilatesImg,
    description: 'Fortalecimento e flexibilidade',
  },
];

const comboPlans = [
  {
    name: 'Musculação + Pilates',
    price: 'R$ 350,00',
    image: comboImg,
    economy: 'R$ 10,00',
  },
  {
    name: 'Zumba + Pilates',
    price: 'R$ 299,99',
    image: comboImg,
    economy: 'R$ 30,01',
  },
  {
    name: 'Musculação + Zumba',
    price: 'R$ 200,00',
    image: comboImg,
    economy: 'R$ 70,00',
  },
];

export default function Plans() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Planos</h1>
          <p className="text-muted-foreground">
            Gerencie os planos disponíveis na academia
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Planos Individuais</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {individualPlans.map((plan) => (
              <Card key={plan.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{plan.name}</span>
                    <Badge className="text-lg">{plan.price}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Planos Combo</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {comboPlans.map((combo) => (
              <Card key={combo.name} className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-primary">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex flex-col gap-2">
                    <span>{combo.name}</span>
                    <div className="flex items-center justify-between">
                      <Badge className="text-lg">{combo.price}</Badge>
                      <Badge variant="outline" className="text-primary">
                        Economize {combo.economy}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Combinação perfeita de modalidades com desconto especial
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
