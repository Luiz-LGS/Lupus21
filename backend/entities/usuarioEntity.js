import Entity from "./entity.js";

export default class UsuarioEntity extends Entity{

    #id;
    #nome;
    #email;
    #senha;

    get id(){
        return this.#id;
    }

    set id(value){
        this.#id = value;
    }

    get nome(){
        return this.#nome;
    }

    set nome(value){
        this.#nome = value;
    }

    get email(){
        return this.#email;
    }

    set email(value){
        this.#email = value;
    }

    get senha(){
        return this.#senha;
    }

    set senha(value){
        this.#senha = value;
    }

    constructor(id, nome, email, senha){
        super();
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
    }

    toJSON() {
        return { id: this.id, nome: this.nome, email: this.email };
    }

    static toMap(row){
        return new UsuarioEntity(row["usu_id"],
            row["usu_nome"],
            row["usu_email"],
            row["usu_senha"]
        );
    }

}
