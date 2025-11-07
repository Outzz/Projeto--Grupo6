import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
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

export default function PublicPlans() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl font-bold text-primary">Renova</h1>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/planos-publicos" className="font-medium hover:text-primary transition-colors">
              Planos
            </Link>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Nossos Planos</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano perfeito para transformar seu corpo e renovar sua energia
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6">Planos Individuais</h2>
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
                    <p className="text-muted-foreground mb-4">{plan.description}</p>
                    <Button className="w-full">Contratar</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6">Planos Combo - Economize Mais!</h2>
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
                    <p className="text-sm text-muted-foreground mb-4">
                      Combinação perfeita de modalidades com desconto especial
                    </p>
                    <Button className="w-full">Contratar</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2025 Renova Academia. Todos os direitos reservados.</p>
            <a
              href="https://www.instagram.com/renova.academia/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>@renova.academia</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
