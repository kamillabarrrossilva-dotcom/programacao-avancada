const banco = require("../banco");

function buscarPorEmail(email, callback) {

    banco.get(
        "SELECT * FROM usuarios WHERE email=?",
        [email],
        callback
    );

}

function criar(usuario, callback) {

    banco.run(
        `
        INSERT INTO usuarios
        (nome,email,senha)
        VALUES(?,?,?)
        `,
        [
            usuario.nome,
            usuario.email,
            usuario.senha
        ],
        callback
    );

}

module.exports = {
    buscarPorEmail,
    criar
}