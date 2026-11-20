/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/adapter-libsql', '@libsql/client', 'libsql'],
};

module.exports = nextConfig;
