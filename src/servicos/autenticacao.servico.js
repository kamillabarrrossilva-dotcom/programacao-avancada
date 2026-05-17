const bcrypt = require("bcryptjs");

const usuarioRepositorio =
    require("../repositorios/usuario.repositorio");

const { gerarToken } =
    require("../utilitarios/token");

async function criarConta(
    req,
    res
) {

    const {
        nome,
        email,
        senha
    } = req.body;

    const senhaHash =
        bcrypt.hashSync(
            senha,
            10
        );

    usuarioRepositorio.criar(
        {
            nome,
            email,
            senha: senhaHash
        },
        function (erro) {

            if (erro) {

                return res.status(
                    400
                ).json({
                    mensagem:
                        "Email já cadastrado"
                });

            }

            return res.status(
                201
            ).json({
                mensagem:
                    "Conta criada"
            });

        }
    );

}

async function entrar(
    req,
    res
) {

    const {
        email,
        senha
    } = req.body;

    usuarioRepositorio
        .buscarPorEmail(
            email,

            function (
                erro,
                usuario
            ) {

                if (
                    !usuario
                ) {

                    return res.status(
                        401
                    ).json({
                        mensagem:
                            "Credenciais inválidas"
                    });

                }

                const senhaValida =
                    bcrypt.compareSync(
                        senha,
                        usuario.senha
                    );

                if (
                    !senhaValida
                ) {

                    return res.status(
                        401
                    ).json({
                        mensagem:
                            "Credenciais inválidas"
                    });

                }

                const token =
                    gerarToken(
                        usuario
                    );

                res.json({
                    mensagem:
                        "Login realizado",
                    token
                });

            }

        );

}

module.exports = {
    criarConta,
    entrar
}