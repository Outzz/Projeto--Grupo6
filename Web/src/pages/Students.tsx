import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: 'ativa' | 'atrasada' | 'cancelada';
  dueDate: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 99999-1111',
    plan: 'Musculação',
    status: 'ativa',
    dueDate: '25/01/2025',
  },
  {
    id: '2',
    name: 'João Oliveira',
    email: 'joao@email.com',
    phone: '(11) 99999-2222',
    plan: 'Combo Zumba + Pilates',
    status: 'ativa',
    dueDate: '28/01/2025',
  },
  {
    id: '3',
    name: 'Paula Lima',
    email: 'paula@email.com',
    phone: '(11) 99999-3333',
    plan: 'Pilates',
    status: 'atrasada',
    dueDate: '15/01/2025',
  },
  {
    id: '4',
    name: 'Roberto Silva',
    email: 'roberto@email.com',
    phone: '(11) 99999-4444',
    plan: 'Musculação + Pilates',
    status: 'ativa',
    dueDate: '30/01/2025',
  },
];

export default function Students() {
  const [students] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'destructive' | 'outline'> = {
      ativa: 'default',
      atrasada: 'destructive',
      cancelada: 'outline',
    };
    const labels: Record<string, string> = {
      ativa: 'Ativa',
      atrasada: 'Atrasada',
      cancelada: 'Cancelada',
    };
    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Alunos</h1>
            <p className="text-muted-foreground">
              Gerencie os alunos cadastrados
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Aluno
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filteredStudents.map((student) => (
            <Card key={student.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {student.email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {student.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Plano:</span>
                        <Badge variant="outline">{student.plan}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        {getStatusBadge(student.status)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Vencimento:</span>
                        <span className="text-sm font-medium">{student.dueDate}</span>
                      </div>
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
