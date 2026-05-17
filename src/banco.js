const sqlite3 = require("sqlite3").verbose();

const banco = new sqlite3.Database("./cofre.db");

banco.serialize(() => {

    banco.run(`
        CREATE TABLE IF NOT EXISTS usuarios(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT UNIQUE,
            senha TEXT
        )
    `);

    banco.run(`
        CREATE TABLE IF NOT EXISTS anotacoes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT,
            conteudo TEXT,
            usuario_id INTEGER
        )
    `);

});

module.exports = banco;