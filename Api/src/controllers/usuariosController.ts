import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch usuarios' });
  }
};
