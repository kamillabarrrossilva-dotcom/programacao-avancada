require("dotenv").config();

require("./banco");

const express =
    require("express");

const app =
    express();

const {
    validarToken
} = require(
    "./utilitarios/token"
);

const {
    criarConta,
    entrar
} = require(
    "./servicos/autenticacao.servico"
);

const {
    criarAnotacao,
    buscarAnotacao
} = require(
    "./servicos/cofre.servico"
);

app.use(
    express.json()
);

function autenticar(
    req,
    res,
    next
) {

    const auth =
        req.headers.authorization;

    if (
        !auth
    ) {

        return res
            .status(401)
            .json({
                mensagem:
                    "Token ausente"
            });

    }

    const token =
        auth.split(
            " "
        )[1];

    const usuario =
        validarToken(
            token
        );

    if (
        !usuario
    ) {

        return res
            .status(401)
            .json({
                mensagem:
                    "Token inválido"
            });

    }

    req.usuario =
        usuario;

    next();

}

app.post(
    "/api/register",
    criarConta
);

app.post(
    "/api/login",
    entrar
);

app.post(
    "/api/secrets",
    autenticar,
    criarAnotacao
);

app.get(
    "/api/secrets/:id",
    autenticar,
    buscarAnotacao
);

const PORT =
    process.env.PORT
    || 3000;

app.listen(
    PORT,
    () => {

        console.log(
            `Servidor rodando em http://localhost:${PORT}`
        );

    });