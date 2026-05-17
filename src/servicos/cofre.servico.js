const anotacaoRepositorio =
    require(
        "../repositorios/anotacao.repositorio"
    );

function criarAnotacao(
    req,
    res
) {

    const {
        titulo,
        conteudo
    } = req.body;

    const usuario =
        req.usuario;

    anotacaoRepositorio
        .criar(

            titulo,
            conteudo,
            usuario.usuarioId,

            function () {

                res.status(
                    201
                ).json({

                    mensagem:
                        "Anotação criada"

                });

            }

        );

}

function buscarAnotacao(
    req,
    res
) {

    const id =
        req.params.id;

    const usuario =
        req.usuario;

    anotacaoRepositorio
        .buscarPorId(

            id,
            usuario.usuarioId,

            function (
                erro,
                anotacao
            ) {

                if (
                    !anotacao
                ) {

                    return res.status(
                        404
                    ).json({

                        mensagem:
                            "Não encontrada"

                    });

                }

                res.json(
                    anotacao
                );

            }

        );

}

module.exports = {
    criarAnotacao,
    buscarAnotacao
}