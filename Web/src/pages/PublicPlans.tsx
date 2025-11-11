import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { EnrollModal } from '@/components/student/EnrollModal';
import type { Database } from '@/integrations/supabase/types';

type Plano = Database['public']['Tables']['planos']['Row'];

export default function PublicPlans() {
  const [individualPlans, setIndividualPlans] = useState<Plano[]>([]);
  const [comboPlans, setComboPlans] = useState<Plano[]>([]);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data } = await supabase.from('planos').select('*').order('nome');
      if (data) {
        setIndividualPlans(data.filter(p => p.tipo !== 'combo'));
        setComboPlans(data.filter(p => p.tipo === 'combo'));
      }
    };
    fetchPlans();
  }, []);

  const handleEnroll = (planId: string, planName: string) => {
    setSelectedPlan({ id: planId, name: planName });
    setEnrollModalOpen(true);
  };
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
                <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{plan.nome}</span>
                      <Badge className="text-lg">R$ {plan.preco.toFixed(2)}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{plan.descricao}</p>
                    <Button className="w-full" onClick={() => handleEnroll(plan.id, plan.nome)}>
                      Contratar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6">Planos Combo - Economize Mais!</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {comboPlans.map((combo) => (
                <Card key={combo.id} className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="flex flex-col gap-2">
                      <span>{combo.nome}</span>
                      <div className="flex items-center justify-between">
                        <Badge className="text-lg">R$ {combo.preco.toFixed(2)}</Badge>
                        {combo.economia && (
                          <Badge variant="outline" className="text-primary">
                            Economize {combo.economia}
                          </Badge>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {combo.descricao || 'Combinação perfeita de modalidades com desconto especial'}
                    </p>
                    <Button className="w-full" onClick={() => handleEnroll(combo.id, combo.nome)}>
                      Contratar
                    </Button>
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

      {selectedPlan && (
        <EnrollModal
          open={enrollModalOpen}
          onOpenChange={setEnrollModalOpen}
          planId={selectedPlan.id}
          planName={selectedPlan.name}
        />
      )}
    </div>
  );
}
