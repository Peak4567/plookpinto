import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
// 1. 🌟 ย้ายมาดึง pool ตัวหลักจากไฟล์ server.js (หรือ server) แทนการสร้างเองกระจัดกระจาย
import { pool } from '../server.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    return;
  }

  try {
    const userCheck = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (userCheck.rows.length > 0) {
      res.status(400).json({ error: 'ชื่อบัญชีนี้ถูกใช้งานไปแล้ว' });
      return;
    }
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
      [username, passwordHash]
    );

    res.status(201).json({
      message: 'สมัครสมาชิกสำเร็จ!',
      user: newUser.rows[0],
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Register Database Error:', error.message);
    }
    res.status(500).json({ error: 'เซิร์ฟเวอร์หลังบ้านเกิดข้อผิดพลาดในการบันทึกข้อมูล' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'กรุณากรอกชื่อบัญชีและรหัสผ่านให้ครบถ้วน' });
    return;
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      res.status(400).json({ error: 'ไม่พบชื่อบัญชีนี้ในระบบ' });
      return;
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      res.status(400).json({ error: 'รหัสผ่านไม่ถูกต้องครับ' });
      return;
    }

    res.status(200).json({
      message: 'เข้าสู่ระบบสำเร็จ ยินดีต้อนรับกลับครับ!',
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Login Database Error:', error.message);
    }
    res.status(500).json({ error: 'เกิดข้อผิดพลาดที่ระบบหลังบ้านในการตรวจสอบข้อมูล' });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body;

  if (!username) {
    res.status(400).json({ error: 'กรุณากรอกชื่อบัญชีผู้ใช้ครับ พีค' });
    return;
  }

  try {
    const userCheck = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (userCheck.rows.length === 0) {
      res.status(404).json({ error: 'ไม่พบชื่อบัญชีผู้ใช้นี้ในระบบคอมครับ' });
      return;
    }

    const temporaryPassword = 'Plook' + Math.floor(10000 + Math.random() * 90000);

    const salt = await bcrypt.genSalt(10);
    const hashedTempPassword = await bcrypt.hash(temporaryPassword, salt);

    await pool.query(
      'UPDATE users SET password_hash = $1 WHERE username = $2',
      [hashedTempPassword, username]
    );

    res.status(200).json({
      message: 'รีเซ็ตรหัสผ่านสำเร็จเรียบร้อยแล้ว',
      temporaryPassword: temporaryPassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Forgot Password Database Error:', error.message);
    }
    res.status(500).json({ error: 'เซิร์ฟเวอร์หลังบ้านเกิดข้อผิดพลาดในการอัปเดตรหัสผ่านใหม่' });
  }
};