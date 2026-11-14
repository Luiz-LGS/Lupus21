import UsuarioEntity from "../entities/usuarioEntity.js";
import Database from "../utils/database.js";
import { conferirSenha, gerarHash } from '../utils/senha.js';

export default class UsuarioRepository {

    #banco;

    constructor(){
        this.#banco = new Database();
    }

    async listar(){

        let sql = "select * from tb_usuario";

        let rows = await this.#banco.ExecutaComando(sql);

        let lista = [];

        if(rows.length > 0){
            for(let row of rows){
                lista.push(UsuarioEntity.toMap(row));
            }
        }

        return lista;

    }

    async cadastrar(entidade){
        let sql = "insert into tb_usuario (usu_nome, usu_email, usu_senha) values (?,?,?)";

        let valores = [entidade.nome, entidade.email, entidade.senha];

        let idGerado = await this.#banco.ExecutaComandoLastInserted(sql, valores);

        if(idGerado){
            entidade.id = idGerado;
            return true;
        }

        else{
            return false;
        }
    }

    async obterPorEmailSenha(email, senha){

        if (typeof email !== 'string' || typeof senha !== 'string' || senha.length > 200) return null;
        let usuario = await this.obterPorEmail(email.trim().toLowerCase());
        if (!usuario || !await conferirSenha(senha, usuario.senha)) return null;
        if (!usuario.senha.startsWith('scrypt:')) {
            let hash = await gerarHash(senha);
            await this.#banco.ExecutaComandoNonQuery('update tb_usuario set usu_senha = ? where usu_id = ?', [hash, usuario.id]);
            usuario.senha = hash;
        }
        return usuario;

    }

    async obterPorEmail(email) {
        let rows = await this.#banco.ExecutaComando('select * from tb_usuario where lower(usu_email) = ? limit 1', [email]);
        return rows.length ? UsuarioEntity.toMap(rows[0]) : null;
    }

    async obterPorId(id){

        let sql = "select * from tb_usuario where usu_id = ?";

        let valores = [id];

        let rows = await this.#banco.ExecutaComando(sql, valores);

        if(rows.length > 0){
            return UsuarioEntity.toMap(rows[0]);
        }

        return null;

    }






}
