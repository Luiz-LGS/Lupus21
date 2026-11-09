import AuthMiddleware from "../middlewares/authMiddleware.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";

export default class LoginController {

    #repo;

    constructor(){
        this.#repo = new UsuarioRepository();
    }

    async validar(req, res){
        try{
            let {email, senha} = req.body;

            if(email && senha){
                let usuario = await this.#repo.obterPorEmailSenha(email, senha);

                if(usuario){
                    let middleware = new AuthMiddleware();
                    let token = middleware.gerarJWT(usuario.id, usuario.nome, usuario.email);
                    res.cookie("Lupus-21", token, { httpOnly: true});
                    return res.status(200).json({token: token});
                }

                else{
                    return res.status(404).json({msg: "Usuario não encontrado!"});
                }

            }

            else{
                return res.status(400).json({msg: "Email ou senha invalida"});
            }

        }

        catch(erro){
            console.log(erro);
            return res.status(500).json({msg: "Erro interno no servidor"}); 
        }
    } 

}