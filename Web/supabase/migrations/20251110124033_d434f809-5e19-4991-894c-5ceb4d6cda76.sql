-- Create enum for plan types
CREATE TYPE tipo_plano AS ENUM ('musculacao', 'zumba', 'pilates', 'combo');

-- Create enum for matricula status
CREATE TYPE status_matricula AS ENUM ('ativa', 'atrasada', 'cancelada');

-- Create planos table
CREATE TABLE public.planos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  tipo tipo_plano NOT NULL,
  preco NUMERIC NOT NULL,
  descricao TEXT,
  economia TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create alunos table
CREATE TABLE public.alunos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT NOT NULL,
  data_nascimento DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create matriculas table
CREATE TABLE public.matriculas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  aluno_id UUID NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
  plano_id UUID NOT NULL REFERENCES public.planos(id) ON DELETE RESTRICT,
  status status_matricula NOT NULL DEFAULT 'ativa',
  data_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
  data_vencimento DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.planos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matriculas ENABLE ROW LEVEL SECURITY;

-- Create policies for planos
CREATE POLICY "Anyone can view planos" ON public.planos FOR SELECT USING (true);
CREATE POLICY "Admins can insert planos" ON public.planos FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update planos" ON public.planos FOR UPDATE USING (true);
CREATE POLICY "Admins can delete planos" ON public.planos FOR DELETE USING (true);

-- Create policies for alunos
CREATE POLICY "Anyone can view alunos" ON public.alunos FOR SELECT USING (true);
CREATE POLICY "Anyone can insert alunos" ON public.alunos FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update alunos" ON public.alunos FOR UPDATE USING (true);
CREATE POLICY "Admins can delete alunos" ON public.alunos FOR DELETE USING (true);

-- Create policies for matriculas
CREATE POLICY "Anyone can view matriculas" ON public.matriculas FOR SELECT USING (true);
CREATE POLICY "Anyone can insert matriculas" ON public.matriculas FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update matriculas" ON public.matriculas FOR UPDATE USING (true);
CREATE POLICY "Admins can delete matriculas" ON public.matriculas FOR DELETE USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_planos_updated_at
  BEFORE UPDATE ON public.planos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_alunos_updated_at
  BEFORE UPDATE ON public.alunos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_matriculas_updated_at
  BEFORE UPDATE ON public.matriculas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default plans
INSERT INTO public.planos (nome, tipo, preco, descricao) VALUES
  ('Musculação', 'musculacao', 150.00, 'Treinamento focado em hipertrofia e força'),
  ('Zumba', 'zumba', 120.00, 'Aulas de dança fitness energéticas'),
  ('Pilates', 'pilates', 210.00, 'Fortalecimento e flexibilidade'),
  ('Musculação + Pilates', 'combo', 350.00, 'Combinação perfeita de modalidades'),
  ('Zumba + Pilates', 'combo', 299.99, 'Combinação perfeita de modalidades'),
  ('Musculação + Zumba', 'combo', 200.00, 'Combinação perfeita de modalidades');