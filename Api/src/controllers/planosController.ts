import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getPlanos = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('planos').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch planos' });
  }
};

export const createPlano = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('planos').insert([req.body]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create plano' });
  }
};

export const updatePlano = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('planos').update(req.body).eq('id', id).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update plano' });
  }
};

export const deletePlano = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('planos').delete().eq('id', id);
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete plano' });
  }
};
