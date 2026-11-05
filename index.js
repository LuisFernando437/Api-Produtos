



const express = require("express");
const app = express();

const produtosRouter = require("./routes/produtos");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Olá, mundo!");
});

app.use("/produtos", produtosRouter);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});