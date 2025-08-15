require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('./db');

(async () => {
  const email = 'test@example.com';
  const password = 'P@ssw0rd!';
  const hash = await bcrypt.hash(password, 10);

  db.run(
    `INSERT OR IGNORE INTO users(email, password_hash) VALUES(?, ?)`,
    [email, hash],
    (err) => {
      if (err) console.error(err);
      else console.log(`Seeded user: ${email} / ${password}`);
      process.exit(0);
    }
  );
})();
