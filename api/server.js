const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Conexão ajustada para localhost para garantir estabilidade
const db = mysql.createConnection({
    host: 'benserverplex.ddns.net', 
    user: 'alunos',
    password: 'senhaAlunos', 
    database: 'web_03mc'
});

// ROTA 1: Listar (Mostrar produtos)
app.get('/produtos', (req, res) => {
    // Substituído para products_raphael
    db.query('SELECT * FROM products_raphael', (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
});

// ROTA 2: Cadastrar (Salvar produtos)
app.post('/produtos', (req, res) => {
    const { nome, categoria, preco } = req.body;
    // Substituído para products_raphael
    db.query('INSERT INTO products_raphael (nome, categoria, preco) VALUES (?, ?, ?)', 
    [nome, categoria, preco], (err, result) => {
        if (err) {
            console.error("Erro ao inserir no banco:", err);
            return res.status(500).json(err);
        }
        res.status(201).send("Cadastrado com sucesso!");
    });
});

// ROTA 3: Apagar (Remover produtos)
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    // Já estava correto aqui
    db.query('DELETE FROM products_raphael WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).send("Removido!");
    });
});

app.listen(3000, () => console.log("Servidor Backend rodando em http://localhost:3000"));