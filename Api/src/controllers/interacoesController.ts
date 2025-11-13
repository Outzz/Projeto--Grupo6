import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getInteracoes = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('interacoes').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch interacoes' });
  }
};

export const createInteracao = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('interacoes').insert([req.body]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create interacao' });
  }
};

export const updateInteracao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('interacoes').update(req.body).eq('id', id).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update interacao' });
  }
};

export const deleteInteracao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('interacoes').delete().eq('id', id);
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete interacao' });
  }
};
