// Database configuration
export const dbConfig = {
  host: process.env.PGHOST || 'your_host',
  port: parseInt(process.env.PGPORT || '5432'),
  database: process.env.PGDATABASE || 'your_database',
  user: process.env.PGUSER || 'your_username',
  password: process.env.PGPASSWORD || 'your_password',
  ssl: {
    rejectUnauthorized: false // For development environment
  }
};

// Get full database URL
export const getDatabaseUrl = () => {
  const { host, port, database, user, password } = dbConfig;
  return `postgres://${user}:${password}@${host}:${port}/${database}`;
};
