import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//importa o swagger-ui
import swaggerUi from 'swagger-ui-express';

//importar rotas
import LoginRouter from './routes/loginRoute.js';
import UsuarioRouter from './routes/usuarioRoute.js';
import CadastroRouter from './routes/cadastroRoute.js';

const server = express();
server.use(express.json());
server.use(cookieParser());
server.use(cors({origin: "http://localhost:3000", credentials: true}));

//gambiarra para usarmos o require e importar o output
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");

//definição da rota que irá expor a págna de documentaçã
server.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));
server.use("/login", LoginRouter);
server.use("/usuario", UsuarioRouter);
server.use("/cadastrar", CadastroRouter);

server.listen(5000, function(){
    console.log("servidor Funcionando");

});
