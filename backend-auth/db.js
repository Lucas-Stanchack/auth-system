const mysql = require('mysql2/promise'); 

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'auth_system',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// REMOVA O db.connect daqui, pois o Pool gerencia a conexão automaticamente.
// Se quiser testar se a conexão está funcionando, você pode fazer uma query simples:
db.query('SELECT 1')
  .then(() => console.log('✅ Conectado ao MySQL via Pool'))
  .catch(err => console.error('❌ Erro de conexão:', err.message));

module.exports = db;