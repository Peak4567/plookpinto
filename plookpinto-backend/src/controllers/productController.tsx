import type { Request, Response } from 'express';
import { pool } from '../server.js';

export const getPopularProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM popular_products ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Get Popular Products Error:', error.message);
    }
    res.status(500).json({ error: 'เกิดข้อผิดพลาดที่ระบบหลังบ้านในการดึงข้อมูลสินค้า' });
  }
};