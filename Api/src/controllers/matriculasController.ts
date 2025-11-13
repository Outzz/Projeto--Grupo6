import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getMatriculas = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('matriculas').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch matriculas' });
  }
};

export const createMatricula = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('matriculas').insert([req.body]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create matricula' });
  }
};

export const updateMatricula = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('matriculas').update(req.body).eq('id', id).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update matricula' });
  }
};

export const deleteMatricula = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('matriculas').delete().eq('id', id);
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete matricula' });
  }
};
