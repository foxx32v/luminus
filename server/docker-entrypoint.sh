#!/bin/sh
set -e
if [ -d prisma/migrations ]; then
  npx prisma migrate deploy
else
  npx prisma db push
fi
if [ $# -gt 0 ]; then
  exec "$@"
fi
if [ -f dist/main.js ]; then
  exec node dist/main
else
  exec node dist/src/main
fi
