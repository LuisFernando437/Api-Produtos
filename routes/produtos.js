const express = require("express");
const router = express.Router();

const produtos = [];
const pool = require("../db");

let proximoId = 1;

function idInvalido(id) {
  return Number.isNaN(id) || id <= 0 || !Number.isInteger(id);
}

function nomeValido(nome) {
  return typeof nome === "string" && nome.trim() !== "";
}

function precoValido(preco) {
  return typeof preco === "number" && preco > 0;
}

router.get("/", async (req, res) => {
  try {
    const nome = req.query.nome;
    const precoQuery = req.query.preco;

    let preco;

    if (precoQuery !== undefined) {
      preco = Number(precoQuery);

      if (Number.isNaN(preco) || preco <= 0) {
        return res.status(400).send({
          mensagem: "Preço deve ser um número",
        });
      }
    }

    const resultado = await pool.query("SELECT * FROM produtos");

    let produtosFiltrados = resultado.rows;

    if (nome) {
      produtosFiltrados = produtosFiltrados.filter((produto) =>
        produto.nome.toLowerCase().includes(nome.toLowerCase()),
      );
    }

    if (preco !== undefined) {
      produtosFiltrados = produtosFiltrados.filter(
        (produto) => Number(produto.preco) === preco,
      );
    }

    res.send(produtosFiltrados);
  } catch (erro) {
    console.error("Erro ao buscar produtos:", erro.message);

    return res.status(500).send({
      mensagem: "Erro interno ao buscar produtos",
    });
  }
});
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (idInvalido(id)) {
    return res.status(400).send({
      mensagem: "ID inválido",
    });
  }

  try {
    const resultado = await pool.query("SELECT * FROM produtos WHERE id = $1", [
      id,
    ]);

    const produto = resultado.rows[0];

    if (!produto) {
      return res.status(404).send({
        mensagem: "Produto não encontrado",
      });
    }

    res.send(produto);
  } catch (erro) {
    console.error("Erro ao buscar produto:", erro.message);

    return res.status(500).send({
      mensagem: "Erro interno ao buscar produto",
    });
  }
});

router.post("/", async (req, res) => {
  if (!nomeValido(req.body.nome)) {
    return res.status(400).send({
      mensagem: "Nome inválido",
    });
  }

  if (!precoValido(req.body.preco)) {
    return res.status(400).send({
      mensagem: "Preço inválido",
    });
  }
  try {
    const resultado = await pool.query(
      "INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING *",
      [req.body.nome.trim(), req.body.preco],
    );
    const produto = resultado.rows[0];

    return res.status(201).send(produto);
  } catch (erro) {
    console.error("Erro ao cadastrar produto:", erro.message);

    return res.status(500).send({
      mensagem: "Erro interno ao cadastrar produto",
    });
  }
});

router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (idInvalido(id)) {
    return res.status(400).send({
      mensagem: "ID inválido",
    });
  }

  try {
    const resultado = await pool.query("SELECT * FROM produtos WHERE id = $1", [
      id,
    ]);

    const produto = resultado.rows[0];

    if (!produto) {
      return res.status(404).send({
        mensagem: "Produto não encontrado",
      });
    }

    if (req.body.nome !== undefined) {
      if (!nomeValido(req.body.nome)) {
        return res.status(400).send({
          mensagem: "Nome inválido",
        });
      }
    }

    if (req.body.preco !== undefined) {
      if (!precoValido(req.body.preco)) {
        return res.status(400).send({
          mensagem: "Preço inválido",
        });
      }
    }
    const novoNome =
      req.body.nome !== undefined ? req.body.nome.trim() : produto.nome;

    const novoPreco =
      req.body.preco !== undefined ? req.body.preco : produto.preco;
    const resultadoAtualizacao = await pool.query(
      "UPDATE produtos SET nome = $1, preco = $2 WHERE id = $3 RETURNING *",
      [novoNome, novoPreco, id],
    );

    const produtoAtualizado = resultadoAtualizacao.rows[0];

    return res.status(200).send(produtoAtualizado);
  } catch (erro) {
    console.error("Erro ao atualizar produto:", erro.message);

    return res.status(500).send({
      mensagem: "Erro interno ao atualizar produto",
    });
  }
});
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (idInvalido(id)) {
    return res.status(400).send({
      mensagem: "Este ID não é válido",
    });
  }
  try {
    const resultado = await pool.query(
      "DELETE FROM produtos WHERE id = $1 RETURNING *",
      [id],
    );
    const produtoExcluido = resultado.rows[0];
    if (!produtoExcluido) {
      return res.status(404).send({
        mensagem: "Produto não encontrado",
      });
    }

    res.send("Produto excluído com sucesso!");
  } catch (erro) {
    console.error("Erro ao excluir produto:", erro.message);
    return res.status(500).send({
      mensagem: "Erro interno ao excluir produto",
    });
  }
});

module.exports = router;
