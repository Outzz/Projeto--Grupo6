import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { StudentModal } from '@/components/admin/StudentModal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type Aluno = Database['public']['Tables']['alunos']['Row'];
type Matricula = Database['public']['Tables']['matriculas']['Row'];
type Plano = Database['public']['Tables']['planos']['Row'];

interface StudentWithMatricula extends Aluno {
  matricula?: Matricula & { plano?: Plano };
}

export default function Students() {
  const [students, setStudents] = useState<StudentWithMatricula[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Aluno | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

  const fetchStudents = async () => {
    const { data: alunos } = await supabase.from('alunos').select('*').order('nome');
    
    if (alunos) {
      const studentsWithMatriculas = await Promise.all(
        alunos.map(async (aluno) => {
          const { data: matricula } = await supabase
            .from('matriculas')
            .select('*, plano:planos(*)')
            .eq('aluno_id', aluno.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
          
          return { ...aluno, matricula: matricula || undefined };
        })
      );
      setStudents(studentsWithMatriculas);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (student: Aluno) => {
    setSelectedStudent(student);
    setStudentModalOpen(true);
  };

  const handleNew = () => {
    setSelectedStudent(undefined);
    setStudentModalOpen(true);
  };

  const handleDeleteClick = (studentId: string) => {
    setStudentToDelete(studentId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!studentToDelete) return;

    try {
      const { error } = await supabase.from('alunos').delete().eq('id', studentToDelete);
      if (error) throw error;
      toast.success('Aluno excluído com sucesso!');
      fetchStudents();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao excluir aluno');
    } finally {
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status?: string) => {
    if (!status) return <Badge variant="outline">Sem matrícula</Badge>;
    
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
          <Button onClick={handleNew} className="gap-2">
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
                        {student.nome.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{student.nome}</h3>
                        <p className="text-sm text-muted-foreground">
                          {student.email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {student.telefone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Plano:</span>
                        <Badge variant="outline">
                          {student.matricula?.plano?.nome || 'Nenhum'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        {getStatusBadge(student.matricula?.status)}
                      </div>
                      {student.matricula?.data_vencimento && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Vencimento:</span>
                          <span className="text-sm font-medium">
                            {new Date(student.matricula.data_vencimento).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(student)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDeleteClick(student.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <StudentModal
        open={studentModalOpen}
        onOpenChange={setStudentModalOpen}
        student={selectedStudent}
        onSuccess={fetchStudents}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita e todas as matrículas relacionadas serão excluídas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
