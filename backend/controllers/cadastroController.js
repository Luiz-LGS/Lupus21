import UsuarioEntity from '../entities/usuarioEntity.js';
import UsuarioRepository from '../repositories/usuarioRepository.js';
import { gerarHash } from '../utils/senha.js';

export default class CadastroController {
    #repo;

    constructor(repo = new UsuarioRepository()) {
        this.#repo = repo;
    }

    async cadastrar(req, res) {
        try {
            let { nome, email, senha } = req.body || {};
            if (typeof nome !== 'string' || typeof email !== 'string' || typeof senha !== 'string') {
                return res.status(400).json({ msg: 'Informe nome, e-mail e senha.' });
            }
            nome = nome.trim();
            email = email.trim().toLowerCase();
            if (!nome || nome.length > 100 || email.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({ msg: 'Informe um nome e um e-mail validos, com ate 100 caracteres.' });
            }
            if (!senha.trim() || senha.length < 6 || senha.length > 200) {
                return res.status(400).json({ msg: 'A senha deve ter entre 6 e 200 caracteres.' });
            }
            if (await this.#repo.obterPorEmail(email)) {
                return res.status(409).json({ msg: 'Este e-mail ja esta cadastrado.' });
            }
            let usuario = new UsuarioEntity(0, nome, email, await gerarHash(senha));
            if (!await this.#repo.cadastrar(usuario)) {
                throw new Error('Falha ao cadastrar usuario.');
            }
            return res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
        } catch (erro) {
            if (erro.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ msg: 'Este e-mail ja esta cadastrado.' });
            }
            console.error('Erro ao cadastrar usuario:', erro.code || erro.name);
            return res.status(500).json({ msg: 'Erro interno no servidor.' });
        }
    }
}
