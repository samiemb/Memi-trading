@echo off
REM Use the password you set during PostgreSQL installation
set DATABASE_URL=postgres://postgres:123456@localhost:5432/memitrading
npm run dev 