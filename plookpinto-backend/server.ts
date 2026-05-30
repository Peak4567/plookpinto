import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import express from 'express';
import { Pool } from 'pg';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // สั่งให้หลังบ้านสามารถอ่านข้อมูลรูปแบบ JSON ที่ส่งมาจากแอปได้

// เซ็ตอัปการเชื่อมต่อวิ่งเข้าหาฐานข้อมูล PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ตรวจสอบสถานะการเชื่อมต่อผ่าน Event Listener
pool.on('connect', () => {
  console.log('✅ Node.js หลังบ้านเชื่อมต่อ PostgreSQL ในคอมสำเร็จแล้ว!');
});

pool.on('error', (err) => {
  console.error('❌ เกิดข้อผิดพลาดกับ PostgreSQL Pool:', err.message);
});

// ==========================================
// 1. ประตู API (Endpoint) สำหรับ "สมัครสมาชิก"
// ==========================================
app.post('/api/register', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // ป้องกันกรณีแอปส่งข้อมูลมาแบบว่างเปล่า
  if (!username || !password) {
    res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    return;
  }

  try {
    // 1. เช็คในตารางก่อนว่าชื่อผู้ใช้ (Username) นี้ซ้ำกับคนอื่นในระบบไหม
    const userCheck = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (userCheck.rows.length > 0) {
      res.status(400).json({ error: 'ชื่อบัญชีนี้ถูกใช้งานไปแล้ว' });
      return;
    }

    // 2. เข้ารหัสลับรหัสผ่าน (Hash Password) ก่อนบันทึก เพื่อความปลอดภัยขั้นสูงสุด
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. สั่ง INSERT ข้อมูลผู้ใช้ใหม่เข้าตาราง users
    const newUser = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
      [username, passwordHash]
    );

    // ส่งสัญญาณตอบกลับไปบอกแอปหน้าบ้านว่าลงทะเบียนสำเร็จแล้วนะ
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
});

// ==========================================
// 2. ประตู API (Endpoint) สำหรับ "เข้าสู่ระบบ"
// ==========================================
app.post('/api/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // ป้องกันกรณีแอปส่งข้อมูลมาแบบว่างเปล่า
  if (!username || !password) {
    res.status(400).json({ error: 'กรุณากรอกชื่อบัญชีและรหัสผ่านให้ครบถ้วน' });
    return;
  }

  try {
    // 1. ค้นหาชื่อบัญชีในตาราง users
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      res.status(400).json({ error: 'ไม่พบชื่อบัญชีนี้ในระบบ' });
      return;
    }

    const user = result.rows[0];

    // 2. ตรวจสอบรหัสผ่านโดยการเปรียบเทียบกับ Password Hash ที่อยู่ใน Database
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      res.status(400).json({ error: 'รหัสผ่านไม่ถูกต้องครับ' });
      return;
    }

    // 3. ผ่านด่านทั้งหมดสำเร็จ ส่งข้อมูลกลับไปบอกหน้าบ้าน
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
});

// ==========================================
// 🚀 เปิดรันระบบสแตนด์บาย
// ==========================================
const PORT = Number(process.env.PORT) || 8000;

// 📍 แก้ไขตรงนี้: ใส่ '0.0.0.0' เพื่อบังคับให้ Node.js กระจายสัญญาณแชร์พอร์ต 8000 ออกไปหา WiFi วงในบ้านด้วย 
// ทำให้แอปพลิเคชัน Expo Go ในมือถือสามารถมองเห็นและยิงเข้าคอมพิวเตอร์ของพีคได้จริงครับ
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 ระบบหลังบ้าน Node.js เปิดรันสแตนด์บายแชร์พอร์ตแล้วที่ Port ${PORT}`);
});