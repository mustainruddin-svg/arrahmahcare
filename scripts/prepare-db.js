const { execSync } = require('child_process');

if (process.env.TURSO_DATABASE_URL) {
  console.log('📡 Turso cloud database detected, proceeding with build.');
  process.exit(0);
}

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
try {
  console.log('📦 Local SQLite environment detected, ensuring schema is ready...');
  execSync(`${npx} prisma db push --accept-data-loss`, { stdio: 'inherit' });
  execSync(`${npx} tsx prisma/seed.ts`, { stdio: 'inherit' });
} catch (err) {
  console.warn('⚠️ Local SQLite setup note:', err.message);
}
