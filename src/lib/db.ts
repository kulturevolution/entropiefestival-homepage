import mysql from 'mysql2/promise';

export type DbConnection = mysql.Connection;

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
};

export async function getConnection() {
  try {
    return await mysql.createConnection(dbConfig);
  } catch (error) {
    console.error('Failed to create database connection:', error);
    throw error;
  }
}

export async function initializeDatabase() {
  let connection: DbConnection | null = null;

  try {
    connection = await getConnection();

    console.log('Checking if supporter table exists...');

    const [rows] = await connection.execute(
      `
      SELECT COUNT(*) as count
      FROM information_schema.tables
      WHERE table_schema = ?
      AND table_name = 'supporter'
    `,
      [process.env.DB_NAME]
    );

    const tableExists = (rows as any[])[0].count > 0;

    if (!tableExists) {
      console.log('Creating supporter table...');

      await connection.execute(`
        CREATE TABLE supporter (
          id INT AUTO_INCREMENT PRIMARY KEY,
          firstName VARCHAR(255) NOT NULL,
          lastName VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          pronoun VARCHAR(255),
          ipAddress VARCHAR(45),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('Supporter table created successfully');
    } else {
      console.log('Supporter table already exists');
    }

    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  } finally {
    if (connection) await connection.end();
  }
}
