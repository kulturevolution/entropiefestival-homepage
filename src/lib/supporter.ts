import { getConnection } from './db';
import { SupporterData } from './validation';

export async function saveSupporter(data: SupporterData, ipAddress?: string) {
  const { firstName, lastName, email, pronoun } = data;
  const connection = await getConnection();

  try {
    // Using prepared statements to prevent SQL injection
    await connection.execute(
      'INSERT INTO supporter (firstName, lastName, email, pronoun, ipAddress) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, pronoun, ipAddress || null]
    );
  } finally {
    await connection.end();
  }
}

export async function getRateLimit(ipAddress: string, minutes: number = 30) {
  const connection = await getConnection();

  try {
    const [rows] = await connection.execute(
      'SELECT COUNT(*) as count FROM supporter WHERE ipAddress = ? AND createdAt > DATE_SUB(NOW(), INTERVAL ? MINUTE)',
      [ipAddress, minutes]
    );

    return (rows as any[])[0].count;
  } finally {
    await connection.end();
  }
}
