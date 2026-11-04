# 🃏 FIPP21 — Lupus21

Plataforma multiplayer de **Blackjack (21)** desenvolvida como trabalho da FIPP/Unoeste.

**Tecnologias:** Next.js/React, Node.js/Express, MySQL, JWT, Swagger e WebSocket.  
**Baralho:** [Deck of Cards API](https://deckofcardsapi.com/).

> **Como usar este checklist:** cada integrante escolhe uma parte, coloca seu nome em **Responsável** e marca `[x]` somente após implementar e testar. As tarefas começam desmarcadas para não confundir o planejamento com o que já está pronto.

## 1. Banco de dados e configuração
**Responsável:** _A definir_

- [ ] Configurar o banco MySQL usando `BancoCassino.sql`.
- [ ] Conferir as relações entre `tb_usuario`, `tb_sala`, `tb_participante`, `tb_rodada`, `tb_aposta`, `tb_turno` e `tb_carta`.
- [ ] Configurar a conexão do backend com o banco e as variáveis de ambiente.
- [ ] Validar cadastros, consultas e atualizações das tabelas.

## 2. Backend — Usuários e autenticação
**Responsável:** _A definir_

- [ ] Criar a API de cadastro de usuários.
- [ ] Criar a API de login.
- [ ] Proteger senhas com hash e gerar o token JWT.
- [ ] Criar middleware JWT para proteger as rotas restritas.

## 3. Backend — Salas e participantes
**Responsável:** _A definir_

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

- [ ] Conectar os participantes à sala em tempo real.
- [ ] Notificar entradas, saídas e início de rodadas.
- [ ] Sincronizar apostas, cartas, turnos e ações dos jogadores.
- [ ] Notificar o resultado e o saldo após cada rodada.
- [ ] Documentar os endpoints REST no Swagger.

## 6. Frontend — Área pública
**Responsável:** _A definir_

- [ ] Criar a página institucional do FIPP21.
- [ ] Criar a página de cadastro.
- [ ] Criar a página de login.
- [ ] Integrar cadastro e login com a API.

## 7. Frontend — Área restrita e jogo
**Responsável:** _A definir_

- [ ] Configurar Context API para o usuário autenticado.
- [ ] Proteger a navegação das páginas privadas.
- [ ] Criar telas de listar, criar e entrar em salas.
- [ ] Criar a mesa com jogadores, dealer, cartas e saldos.
- [ ] Exibir corretamente a carta oculta do dealer.
- [ ] Criar controles para **apostar, pedir carta, parar e sair da sala**.
- [ ] Integrar a interface aos eventos WebSocket.

## 8. Testes e entrega
**Responsável:** _Todos_

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
- Marcar `[x]` apenas quando a tarefa estiver **concluída e testada**.

**Repositório:** https://github.com/Luiz-LGS/Lupus21
