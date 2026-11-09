import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/usuarioRepository.js';


const segredo = "7Iw#z}Jbbflj;[E@mS|a,16RCn2.5\=1J-1AR(oHJTxQ9$UrfZ";

export default class AuthMiddleware {

    gerarJWT(id, nome, email) {
        let token = jwt.sign({ id, nome, email}, segredo, {expiresIn: "10h"})
        return token;

    }

    async validar(req, res, next) {
        next();
        // let token = req.cookies["Lupus-21"];
        // //token precisa existir nas cookies da requisição!
        // if (token) {
        //     //verifica se o token é valido
        //     let payload = jwt.verify(token, segredo);
        //     let idUsuario = payload.id;
        //     let repo = new UsuarioRepository;
        //     //utilizando o id do usuario que veio no token, vamos verificar se ele existe no banco de dados
        //     let usuarioEncontrado = await repo.obterPorId(idUsuario);
        //     if (usuarioEncontrado) {
        //         req.usuario = usuarioEncontrado;
        //         next();
        //     }
        //     else {
        //         return res.status(404).json({ msg: "Token Invalido " });
        //     }
            
        // }
        // else {
        //     return res.status(401).json({ msg: "Token Inexistente " });
        // }
    }

}
