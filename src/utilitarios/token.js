const jwt = require("jsonwebtoken");

function gerarToken(usuario){

    return jwt.sign(
        {
            usuarioId: usuario.id,
            email: usuario.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1h"
        }
    );

}

function validarToken(token){

    try{

        return jwt.verify(
            token,
            process.env.JWT_SECRET
        );

    }catch{

        return null;

    }

}

module.exports={
    gerarToken,
    validarToken
}