const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authroutes");
const { verifyToken } = require("./middleware/authMiddleware"); // import correto do middleware

const app = express();

// Middleware global
app.use(express.json());
app.use(cors());

// ROTAS DE AUTENTICAÇÃO (login, criar usuário, listar usuários protegido)
app.use("/", authRoutes);

// ROTA PROTEGIDA DE TESTE
app.get("/me", verifyToken, (req, res) => {
  // req.user é definido pelo middleware
  res.json({
    id: req.user.id,
    nome: req.user.nome,
    email: req.user.email
  });
});

// SERVIDOR
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));