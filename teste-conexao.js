const pool = require("./db");

async function testarConexao() {
  try {
    const resultado = await pool.query("SELECT * FROM produtos");

    console.log(resultado.rows);
  } catch (erro) {
    console.log("Erro ao conectar:", erro.message);
  } finally {
    await pool.end();
  }
}

testarConexao();