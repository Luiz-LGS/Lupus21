import AuthMiddleware from "../middlewares/authMiddleware.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";

export default class LoginController {

    #repo;

    constructor(){
        this.#repo = new UsuarioRepository();
    }

    async validar(req, res){
        try{
            let {email, senha} = req.body || {};

            if(typeof email !== "string" || typeof senha !== "string"){
                return res.status(400).json({msg: "Informe o e-mail e a senha."});
            }

            email = email.trim().toLowerCase();

            if(!email || !senha.trim()){
                return res.status(400).json({msg: "Preencha o e-mail e a senha."});
            }

            if(email.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                return res.status(400).json({msg: "Informe um e-mail valido com ate 100 caracteres."});
            }

            if(senha.length > 200){
                return res.status(400).json({msg: "A senha deve ter no maximo 200 caracteres."});
            }

            let usuario = await this.#repo.obterPorEmailSenha(email, senha);

            if(!usuario){
                return res.status(401).json({msg: "E-mail ou senha incorretos."});
            }

            let middleware = new AuthMiddleware();
            let token = middleware.gerarJWT(usuario.id, usuario.nome, usuario.email);
            res.cookie("Lupus-21", token, {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                maxAge: 10 * 60 * 60 * 1000,
                path: "/"
            });
            return res.status(200).json({token: token});
        }
        catch(erro){
            console.error("Erro ao realizar login:", erro.code || erro.name);
            return res.status(500).json({msg: "Erro interno no servidor."});
        }
    }
}
