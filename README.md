# 🃏 FIPP21 — Lupus21

Plataforma multiplayer de **Blackjack (21)** desenvolvida como trabalho da FIPP/Unoeste.

**Tecnologias:** Next.js/React, Node.js/Express, MySQL, JWT, Swagger e WebSocket.  
**Baralho:** [Deck of Cards API](https://deckofcardsapi.com/).

> **Checklist revisado a partir do código da branch `main` em 04/11/2026.** `[x]` = arquivo, estrutura ou funcionalidade indicada encontrada na análise do código (não significa que já foi testada). `[ ]` = pendente, incompleta ou precisa de correção/testes. Cada integrante pode preencher o campo **Responsável**.

## 1. Banco de dados e configuração
**Responsável:** _A definir_

- [x] Criar `BancoCassino.sql` com as 7 tabelas e chaves estrangeiras do modelo.
- [x] Criar classe `Database` com pool MySQL e métodos de consulta (`backend/utils/database.js`).
- [x] Criar as entidades `Usuario`, `Sala`, `Participante`, `Rodada`, `Aposta`, `Turno` e `Carta`.
- [ ] Executar o script em um banco MySQL de teste e validar as relações.
- [ ] Mover credenciais do banco para variáveis de ambiente e revogar as credenciais expostas no código.
- [ ] Corrigir mapeamentos incompletos das entidades e validar as operações no banco.
- [ ] Implementar repositórios para salas, participantes, rodadas, apostas, turnos e cartas.

## 2. Backend — Usuários e autenticação
**Responsável:** _A definir_

- [x] Inicializar o servidor Node/Express (`backend/server.js`).
- [x] Criar a rota `POST /login` e a consulta de usuário por e-mail e senha (estrutura inicial).
- [x] Criar a rota `GET /usuario` para listar usuários.
- [x] Implementar geração de JWT e middleware de autenticação aplicado em `GET /usuario`.
- [ ] Criar a API de cadastro de usuários.
- [ ] Corrigir e testar o login: `res.cokkie` → `res.cookie` e validar e-mail **e** senha corretamente.
- [ ] Armazenar/verificar senhas com hash (ex.: bcrypt).
- [ ] Mover segredo JWT para variável de ambiente, revogar o segredo exposto e tratar tokens inválidos/expirados.
- [ ] Testar as rotas protegidas e as permissões.

## 3. Backend — Salas e participantes
**Responsável:** _A definir_

> As entidades de sala e participante existem, mas ainda não há rotas/repositórios para esse fluxo.

- [ ] Criar sala de jogo vinculada ao usuário.
- [ ] Listar as salas do usuário.
- [ ] Permitir entrada em sala por código (pode ser o `sal_id`).
- [ ] Registrar a entrada e a saída dos participantes.
- [ ] Iniciar cada participante com **1.000** de saldo.
- [ ] Impedir que quem entrar durante uma rodada jogue antes da próxima.

## 4. Backend — Motor do Blackjack
**Responsável:** _A definir_

- [ ] Iniciar o jogo quando houver participante na sala.
- [ ] Criar e controlar as rodadas.
- [ ] Criar um novo baralho por rodada usando a Deck of Cards API e salvar `rod_codigobaralho`.
- [ ] Distribuir duas cartas por jogador e duas para o dealer (uma oculta).
- [ ] Registrar cartas, apostas e turnos no banco.
- [ ] Permitir apostas individuais e somente jogadores com saldo **maior que 10**.
- [ ] Calcular a pontuação das cartas (Ás = 1 ou 11; figuras = 10).
- [ ] Implementar **Hit**, **Stand** e estouro acima de 21.
- [ ] Controlar a ordem dos turnos dos jogadores.
- [ ] Implementar o dealer automático: pedir até 16 e parar a partir de 17.
- [ ] Representar o dealer com `par_id = NULL` em `tb_carta` e `tb_turno`.
- [ ] Calcular vitória, derrota, empate e Blackjack natural.
- [ ] Atualizar os saldos: vitória **1:1**, empate devolve aposta e Blackjack natural **3:2**.

## 5. Backend — WebSocket e documentação
**Responsável:** _A definir_

- [x] Criar um esqueleto de listener de conexão/desconexão em `backend/sockets/socket.js`.
- [ ] Integrar efetivamente o Socket.IO/WebSocket ao servidor Express e às salas.
- [ ] Conectar os participantes à sala em tempo real.
- [ ] Notificar entradas, saídas e início de rodadas.
- [ ] Sincronizar apostas, cartas, turnos e ações dos jogadores.
- [ ] Notificar o resultado e o saldo após cada rodada.
- [x] Configurar Swagger UI em `/docs` e documentar inicialmente `POST /login` e `GET /usuario`.
- [ ] Completar a documentação dos novos endpoints REST no Swagger.

## 6. Frontend — Área pública
**Responsável:** _A definir_

- [x] Inicializar o frontend Next.js/React com App Router.
- [ ] Substituir a página inicial padrão do Next.js pela página institucional do FIPP21.
- [ ] Criar a página institucional do FIPP21.
- [ ] Criar a página de cadastro.
- [ ] Criar a página de login.
- [ ] Integrar cadastro e login com a API.

## 7. Frontend — Área restrita e jogo
**Responsável:** _A definir_

- [x] Criar a rota inicial `/admin` como placeholder (ainda exibe apenas “Olá Mundo”).
- [ ] Configurar Context API para o usuário autenticado.
- [ ] Proteger a navegação das páginas privadas.
- [ ] Criar telas de listar, criar e entrar em salas.
- [ ] Criar a mesa com jogadores, dealer, cartas e saldos.
- [ ] Exibir corretamente a carta oculta do dealer.
- [ ] Criar controles para **apostar, pedir carta, parar e sair da sala**.
- [ ] Integrar a interface aos eventos WebSocket.

## 8. Testes e entrega
**Responsável:** _Todos_

- [ ] Instalar/declarar as dependências necessárias no `backend/package.json` e conferir a inicialização.
- [ ] Testar cadastro, login e permissões.
- [ ] Testar duas ou mais contas jogando na mesma sala.
- [ ] Testar entrada durante uma rodada e saldo insuficiente.
- [ ] Testar estouro, empate, vitória, derrota e Blackjack natural.
- [ ] Testar atualização em tempo real sem recarregar a página.
- [ ] Revisar Swagger e corrigir erros de integração.
- [ ] Validar o funcionamento completo no frontend e backend.

---

### Organização do grupo

- Cada pessoa deve assumir uma seção e preencher seu nome em **Responsável**.
- Criar uma **branch** para cada funcionalidade e enviar as alterações por **Pull Request**.
- Evitar alterar simultaneamente os mesmos arquivos.
- Itens de **estrutura existente** estão marcados `[x]` após revisão estática; funcionalidades só devem ser tratadas como prontas para entrega após os testes.
- **Segurança urgente:** o repositório público contém credenciais do MySQL e uma chave JWT no código. Revogar/rotacionar esses segredos, migrá-los para `.env` e avaliar a limpeza do histórico antes da entrega.

**Repositório:** https://github.com/Luiz-LGS/Lupus21
