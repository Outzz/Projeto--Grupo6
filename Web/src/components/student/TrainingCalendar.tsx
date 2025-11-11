import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dumbbell, Music, Activity } from 'lucide-react';

interface Training {
  day: string;
  activities: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const planTrainings: Record<string, Training[]> = {
  'Musculação + Pilates': [
    { day: 'Segunda', activities: ['Musculação - Peito e Tríceps'], icon: Dumbbell },
    { day: 'Terça', activities: [], icon: Dumbbell },
    { day: 'Quarta', activities: ['Musculação - Costas e Bíceps'], icon: Dumbbell },
    { day: 'Quinta', activities: ['Pilates - Core e Flexibilidade'], icon: Activity },
    { day: 'Sexta', activities: ['Musculação - Pernas e Ombros'], icon: Dumbbell },
    { day: 'Sábado', activities: [], icon: Dumbbell },
    { day: 'Domingo', activities: [], icon: Dumbbell },
  ],
  'Musculação': [
    { day: 'Segunda', activities: ['Musculação - Peito e Tríceps'], icon: Dumbbell },
    { day: 'Terça', activities: [], icon: Dumbbell },
    { day: 'Quarta', activities: ['Musculação - Costas e Bíceps'], icon: Dumbbell },
    { day: 'Quinta', activities: [], icon: Dumbbell },
    { day: 'Sexta', activities: ['Musculação - Pernas e Ombros'], icon: Dumbbell },
    { day: 'Sábado', activities: [], icon: Dumbbell },
    { day: 'Domingo', activities: [], icon: Dumbbell },
  ],
  'Zumba': [
    { day: 'Segunda', activities: [], icon: Music },
    { day: 'Terça', activities: ['Zumba - Cardio Dance'], icon: Music },
    { day: 'Quarta', activities: [], icon: Music },
    { day: 'Quinta', activities: ['Zumba - Ritmos Latinos'], icon: Music },
    { day: 'Sexta', activities: [], icon: Music },
    { day: 'Sábado', activities: [], icon: Music },
    { day: 'Domingo', activities: [], icon: Music },
  ],
  'Pilates': [
    { day: 'Segunda', activities: ['Pilates - Mat Work'], icon: Activity },
    { day: 'Terça', activities: [], icon: Activity },
    { day: 'Quarta', activities: [], icon: Activity },
    { day: 'Quinta', activities: ['Pilates - Equipamentos'], icon: Activity },
    { day: 'Sexta', activities: [], icon: Activity },
    { day: 'Sábado', activities: [], icon: Activity },
    { day: 'Domingo', activities: [], icon: Activity },
  ],
};

interface TrainingCalendarProps {
  plan: string;
}

export function TrainingCalendar({ plan }: TrainingCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<Training | null>(null);
  const trainings = planTrainings[plan] || planTrainings['Musculação'];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Calendário de Treinos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {trainings.map((training) => {
              const Icon = training.icon;
              const hasTraining = training.activities.length > 0;
              
              return (
                <div
                  key={training.day}
                  className={`p-4 border rounded-lg transition-all cursor-pointer ${
                    hasTraining
                      ? 'bg-primary/10 border-primary hover:bg-primary/20'
                      : 'bg-muted/50 hover:bg-muted'
                  }`}
                  onClick={() => hasTraining && setSelectedDay(training)}
                >
                  <div className="text-center space-y-2">
                    <p className="font-semibold text-sm">{training.day}</p>
                    {hasTraining ? (
                      <>
                        <Icon className="w-8 h-8 mx-auto text-primary" />
                        <Badge variant="outline" className="text-xs">
                          {training.activities.length} treino(s)
                        </Badge>
                      </>
                    ) : (
                      <p className="text-xs text-muted-foreground">Descanso</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Treino de {selectedDay?.day}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedDay?.activities.map((activity, index) => (
              <div key={index} className="border-l-4 border-primary pl-4 py-2">
                <h4 className="font-semibold">{activity}</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Duração: 60 minutos
                </p>
                <p className="text-sm text-muted-foreground">
                  Horário sugerido: 18:00 - 19:00
                </p>
              </div>
            ))}
            <Button className="w-full">Confirmar Presença</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
