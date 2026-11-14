-- Banco existente: selecione o schema correto no Workbench.
-- Execute este arquivo uma unica vez. Ele nao apaga usuarios ou outras tabelas.
-- Para banco novo, use BancoCassino.sql em vez deste arquivo.

CREATE TABLE IF NOT EXISTS `tb_perfil` (
  `per_id` INT NOT NULL AUTO_INCREMENT,
  `per_descricao` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`per_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `tb_perfil` (`per_id`, `per_descricao`)
SELECT 1, 'Usuario'
WHERE NOT EXISTS (SELECT 1 FROM `tb_perfil` WHERE `per_id` = 1);

INSERT INTO `tb_perfil` (`per_id`, `per_descricao`)
SELECT 2, 'Administrador'
WHERE NOT EXISTS (SELECT 1 FROM `tb_perfil` WHERE `per_id` = 2);

-- Usuarios existentes e novos cadastros recebem o perfil comum por padrao.
ALTER TABLE `tb_usuario`
  ADD COLUMN `per_id` INT NOT NULL DEFAULT 1,
  ADD INDEX `fk_usuario_perfil_idx` (`per_id`),
  ADD CONSTRAINT `fk_usuario_perfil`
    FOREIGN KEY (`per_id`) REFERENCES `tb_perfil` (`per_id`);

-- Conferencia: nao exibe senhas.
SELECT u.usu_id, u.usu_nome, u.usu_email, p.per_descricao
FROM tb_usuario u
INNER JOIN tb_perfil p ON p.per_id = u.per_id;

-- Para tornar uma conta administradora, o responsavel pelo banco deve
-- atualizar per_id para 2, usando o usu_id exato da conta escolhida.
-- Nao permita que o cadastro publico escolha o perfil Administrador.
