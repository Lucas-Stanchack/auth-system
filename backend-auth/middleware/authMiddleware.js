const jwt = require('jsonwebtoken');
const SECRET = "secret"; // mesma chave usada no login

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader)
    return res.status(401).json({ message: 'Token não fornecido' });

  // O header deve vir no formato: "Bearer <token>"
  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.user = decoded; // disponibiliza os dados do usuário para a rota
    next(); // ⚡ permite continuar para o handler da rota
  });
}

module.exports = { verifyToken };