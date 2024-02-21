// migrate.js
const fs = require('fs');
const path = require('path');

const direction = process.argv[2] ?? 'up';
const migrationsDir = path.resolve(__dirname, '..', 'migrations');

fs.readdir(migrationsDir, (err, files) => {
  if (err) throw err;

  files.sort().forEach(file => {
    const migration = require(path.join(migrationsDir, file));

    if (typeof migration[direction] === 'function') {
      console.log(`Running ${direction} on ${file}`);
      migration[direction]();
    }
  });
});