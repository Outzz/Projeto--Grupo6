import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getAlunos = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('alunos').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alunos' });
  }
};

export const createAluno = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('alunos').insert([req.body]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create aluno' });
  }
};

export const updateAluno = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('alunos').update(req.body).eq('id', id).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update aluno' });
  }
};

export const deleteAluno = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('alunos').delete().eq('id', id);
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete aluno' });
  }
};
