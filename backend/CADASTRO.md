# API de cadastro

Implementacao em routes, controller, repository e entity, sem alteracoes nas telas.

`POST /cadastrar`, com `Content-Type: application/json`:

```json
{ "nome": "Felipe", "email": "felipe@example.com", "senha": "exemplo123" }
```

- Nome e e-mail: obrigatorios, ate 100 caracteres.
- Senha: entre 6 e 200 caracteres; confirmacao fica no frontend.
- Retorno 201: `{ "id": 1, "nome": "Felipe", "email": "felipe@example.com" }`.
- Retorno 400: dados invalidos; 409: e-mail cadastrado; 500: falha interna. Erros usam `{ "msg": "..." }`.
- Senhas novas sao armazenadas com scrypt e salt, utilizando o modulo nativo do Node.
- O login existente verifica o hash. Contas antigas em texto simples sao migradas ao autenticar corretamente.
- Entidades de usuario nao serializam senha, inclusive na listagem existente.

Execute `node --test tests/cadastro.test.js` para os testes isolados. Eles usam um repositorio simulado e nao acessam o MySQL. A gravacao real ainda deve ser validada em banco de teste.

A consulta previa de e-mail evita duplicacoes sequenciais, mas o modelo original nao tem indice UNIQUE no e-mail. Para garantir unicidade em cadastros simultaneos, o grupo precisa revisar duplicatas e adicionar essa restricao no banco.

Este incremento cobre cadastro e compatibilidade do login. A protecao JWT atualmente desativada, os segredos no codigo, as salas e o motor do jogo ainda precisam de suas respectivas etapas do roadmap.
