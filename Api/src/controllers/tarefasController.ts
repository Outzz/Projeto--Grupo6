import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getTarefas = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('tarefas').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tarefas' });
  }
};

export const createTarefa = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('tarefas').insert([req.body]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tarefa' });
  }
};

export const updateTarefa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('tarefas').update(req.body).eq('id', id).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tarefa' });
  }
};

export const deleteTarefa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('tarefas').delete().eq('id', id);
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tarefa' });
  }
};
