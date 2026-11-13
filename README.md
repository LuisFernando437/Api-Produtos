# API de Produtos

Minha API permite cadastrar, consultar, atualizar e excluir produtos. Ela foi desenvolvida utilizando Node.js e Express, com PostgreSQL para armazenar os dados dos produtos.
## Tecnologias utilizadas

- JavaScript
- Node.js
- PostgreSQL
- Express

## Funcionalidades

- GET: buscar produtos
- POST: cadastrar produtos
- PATCH: atualizar produtos
- DELETE: excluir produtos

## Rotas da API
- `GET /produtos` - Lista todos os produtos
- `POST /produtos` - Cadastra um novo produto
- `PATCH /produtos/:id` - Atualiza um produto
- `DELETE /produtos/:id` - Exclui um produto

## Exemplo de cadastro
```json
{
  "nome": "Mouse",
  "preco": 80
}
```

## Como executar o projeto

### Instalar as dependências

```bash
npm install
```

### Configuração do banco de dados
1. Instalar o PostgreSQL e criar um banco chamado `loja`.
2. Criar um arquivo `.env` com as configurações de conexão.


## Estrutura da tabela

A API utiliza uma tabela chamada `produtos`.

| Coluna | Tipo | Descrição |
|---|---|---|
| id | INTEGER | Identificador do produto |
| nome | VARCHAR(100) | Nome do produto |
| preco | NUMERIC(10,2) | Preço do produto |

### Configuração do banco de dados

1. Instale o PostgreSQL.
2. Crie um banco de dados chamado `loja`.
3. Copie o arquivo `.env.example` e renomeie a cópia para `.env`.
4. Preencha o `.env` com as configurações do seu PostgreSQL.
5. Mantenha o arquivo `.env` fora do GitHub.

## Como iniciar o servidor

Após instalar as dependências e configurar o banco de dados,
execute no terminal:

```bash
node index.js
```
