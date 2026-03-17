const db = require('./db');

db.query('SELECT 1 + 1 AS resultado', (err, results) => {
  if (err) {
    console.error('Erro ao testar DB:', err.message);
    return;
  }
  console.log('Teste OK:', results);
});