import express from 'express';
import CadastroController from '../controllers/cadastroController.js';

const router = express.Router();

let ctrl = new CadastroController();

router.post("/", (req,res) => {
        // #swagger.tags = ['Usuario']
        // #swagger.summary = ["Cadastrar Usuario"]

        ctrl.cadastrar(req,res);

});

export default router;