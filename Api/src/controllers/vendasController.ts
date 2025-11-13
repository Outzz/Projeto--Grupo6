import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getVendas = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('vendas').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vendas' });
  }
};

export const createVenda = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('vendas').insert([req.body]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create venda' });
  }
};

export const updateVenda = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('vendas').update(req.body).eq('id', id).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update venda' });
  }
};

export const deleteVenda = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('vendas').delete().eq('id', id);
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete venda' });
  }
};
