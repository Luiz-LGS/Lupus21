import UsuarioEntity from "../entities/usuarioEntity.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";


export default class CadastroController{

    #repo;

    constructor(){
        this.#repo = new UsuarioRepository();
    }

    async cadastrar(req, res){

        try{
            let {nome, email, senha} = req.body;
            let entidade = new UsuarioEntity(0, nome, email, senha);

            if(nome && email && senha){
                let result = await this.#repo.cadastrar(entidade);
                if(result){
                    return res.status(201).json(entidade);
                }
                throw new Error("Erro ao cadastrar usuario no Banco de dados");
            }
            else{
                return res.status(400).json({ msg: "Parametros incorreto" });
            }          
        }

        catch(erro){
            console.log(erro);
            return res.status(500).json({msg: "Erro interno no servidor"});
        }

    }


}