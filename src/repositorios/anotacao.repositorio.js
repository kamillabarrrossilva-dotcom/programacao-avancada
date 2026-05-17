const banco = require("../banco");

function criar(
    titulo,
    conteudo,
    usuarioId,
    callback
) {

    banco.run(
        `
INSERT INTO anotacoes
(titulo,conteudo,usuario_id)
VALUES(?,?,?)
`,
        [
            titulo,
            conteudo,
            usuarioId
        ],
        callback
    );

}

function buscarPorId(
    id,
    usuarioId,
    callback
) {

    banco.get(
        `
SELECT *
FROM anotacoes
WHERE id=?
AND usuario_id=?
`,
        [
            id,
            usuarioId
        ],
        callback
    );

}

module.exports = {
    criar,
    buscarPorId
}