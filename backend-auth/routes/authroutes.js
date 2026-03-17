const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/authmiddleware');
const crypto = require('crypto');

const SECRET = 'secret';

/* ===================== LOGIN ===================== */
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (results.length === 0) return res.status(401).json({ message: 'Usuário não encontrado' });

    const user = results[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) return res.status(401).json({ message: 'Senha inválida' });

    const token = jwt.sign({ id: user.id, nome: user.nome, email: user.email }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login OK', token, nome: user.nome });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===================== CREATE USER ===================== */
router.post('/users', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) return res.status(400).json({ message: 'Campos obrigatórios' });

  try {
    const hash = await bcrypt.hash(senha, 10);
    const [results] = await db.query('INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash]);
    res.json({ message: 'Criado com sucesso!', id: results.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===================== ROTAS DE USUÁRIO ===================== */
router.get('/users', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nome, email FROM users');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

/* ===================== GET USER BY ID ===================== */
router.get('/users/:id', verifyToken, async (req, res) => {
  const userId = req.params.id; // Captura o '10' da URL
  
  try {
    const [rows] = await db.query('SELECT id, nome, email FROM users WHERE id = ?', [userId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    res.json(rows[0]); // Retorna o usuário encontrado
  } catch (err) {
    console.error("Erro na busca por ID:", err);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

/* ===================== UPDATE ===================== */
router.put('/users/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  try {
    await db.query('UPDATE users SET nome = ?, email = ? WHERE id = ?', [nome, email, id]);
    res.json({ message: 'Atualizado!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ROTA DE DELETE PROTEGIDA POR TOKEN
router.delete('/users/:id', verifyToken, async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deletado!' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

/* ===================== RECUPERAR SENHA ===================== */
router.post('/recuperar-senha', async (req, res) => {
  const { email } = req.body;
  
  if (!email) return res.status(400).json({ message: 'E-mail vazio' });

  try {
    // Apenas teste se o banco responde
    const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    
    // Se não achar, responde sucesso (boa prática)
    if (rows.length === 0) return res.json({ message: 'Ok' });

    // Se achar, responde sucesso
    res.json({ message: 'Ok' });
  } catch (err) {
    console.error("ERRO NO BACKEND:", err); // ISSO VAI APARECER NO TERMINAL
    res.status(500).json({ error: err.message });
  }
});

router.post('/atualizar-senha', async (req, res) => {
  const { novaSenha, email } = req.body; // Certifique-se de que o front envie o e-mail junto

  try {
    // 1. Hash da nova senha
    const hash = await bcrypt.hash(novaSenha, 10);

    // 2. Atualiza no banco
    const [result] = await db.query(
      'UPDATE users SET senha = ?, reset_token = NULL, reset_expires = NULL WHERE email = ?',
      [hash, email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ message: 'Senha atualizada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar senha no servidor' });
  }
});

module.exports = router;