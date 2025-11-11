-- Create enum types
CREATE TYPE public.prioridade_tarefa AS ENUM ('alta', 'media', 'baixa');
CREATE TYPE public.status_tarefa AS ENUM ('pendente', 'em_andamento', 'concluida');
CREATE TYPE public.tipo_usuario AS ENUM ('vendedor', 'gestor', 'admin');
CREATE TYPE public.status_venda AS ENUM ('em_negociacao', 'fechado', 'perdido');
CREATE TYPE public.tipo_interacao AS ENUM ('ligacao', 'email', 'reuniao', 'visita', 'suporte');
CREATE TYPE public.status_interacao AS ENUM ('pendente', 'respondido');

-- Create usuarios table
CREATE TABLE public.usuarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  cargo TEXT,
  tipo tipo_usuario NOT NULL DEFAULT 'vendedor',
  nivel TEXT,
  status TEXT NOT NULL DEFAULT 'ativo',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tarefas table
CREATE TABLE public.tarefas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao TEXT NOT NULL,
  responsavel UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
  prazo DATE NOT NULL,
  prioridade prioridade_tarefa NOT NULL DEFAULT 'media',
  status status_tarefa NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vendas table
CREATE TABLE public.vendas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente TEXT NOT NULL,
  produto TEXT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  status status_venda NOT NULL DEFAULT 'em_negociacao',
  responsavel UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interacoes table
CREATE TABLE public.interacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  data TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  tipo tipo_interacao NOT NULL,
  responsavel TEXT NOT NULL,
  observacoes TEXT,
  resposta TEXT,
  status status_interacao NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tarefas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interacoes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for usuarios (admins can manage all, users can view all)
CREATE POLICY "Anyone can view usuarios" 
ON public.usuarios 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert usuarios" 
ON public.usuarios 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update usuarios" 
ON public.usuarios 
FOR UPDATE 
USING (true);

CREATE POLICY "Admins can delete usuarios" 
ON public.usuarios 
FOR DELETE 
USING (true);

-- Create RLS policies for tarefas
CREATE POLICY "Anyone can view tarefas" 
ON public.tarefas 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert tarefas" 
ON public.tarefas 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update tarefas" 
ON public.tarefas 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete tarefas" 
ON public.tarefas 
FOR DELETE 
USING (true);

-- Create RLS policies for vendas
CREATE POLICY "Anyone can view vendas" 
ON public.vendas 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert vendas" 
ON public.vendas 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update vendas" 
ON public.vendas 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete vendas" 
ON public.vendas 
FOR DELETE 
USING (true);

-- Create RLS policies for interacoes
CREATE POLICY "Anyone can view interacoes" 
ON public.interacoes 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert interacoes" 
ON public.interacoes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update interacoes" 
ON public.interacoes 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete interacoes" 
ON public.interacoes 
FOR DELETE 
USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_usuarios_updated_at
BEFORE UPDATE ON public.usuarios
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tarefas_updated_at
BEFORE UPDATE ON public.tarefas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vendas_updated_at
BEFORE UPDATE ON public.vendas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_interacoes_updated_at
BEFORE UPDATE ON public.interacoes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();