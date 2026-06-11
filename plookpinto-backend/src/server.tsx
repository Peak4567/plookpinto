import dotenv from 'dotenv';
dotenv.config(); 

import cors from 'cors';
import express from 'express';
import pg from 'pg';
import totalRoutes from './routes.js';

const { Pool } = pg;
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:peak@localhost:5432/plookpinto_db',
});

pool.on('connect', () => {
  console.log('✅ Node.js หลังบ้านเชื่อมต่อ PostgreSQL ในคอมสำเร็จแล้ว!');
});

pool.on('error', (err) => {
  console.error('❌ เกิดข้อผิดพลาดกับ PostgreSQL Pool:', err.message);
});

app.use('/api', totalRoutes); 

const PORT = Number(process.env.PORT) || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 ระบบหลังบ้านโครงสร้างแบบแยกส่วน (.tsx) รันสแตนด์บายแล้วที่ Port ${PORT}`);
});

export { pool };
