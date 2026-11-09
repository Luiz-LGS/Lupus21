import express from 'express';
import LoginController from '../controllers/loginController.js';

const router = express.Router();

let ctrl = new LoginController();

router.post("/", (req, res) => {
    // #swagger.tags = ['Usuario']
    // #swagger.summary = ["Valida o login do usuario"]
    ctrl.validar(req,res);
});

export default router;