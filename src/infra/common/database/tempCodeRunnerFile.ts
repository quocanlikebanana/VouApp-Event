        execSync(`
            export DATABASE_URL=${testDbUrl} &&
            npx prisma migrate dev --name test${new Date().toUTCString()} --create-db
            `, { stdio: 'inherit' },);