const express = require("express");
const app = express();
app.use(express.json());

const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const body = req.body;
  const mensagem = body?.text?.message?.toLowerCase() || "";

  console.log("Mensagem recebida bruta:", mensagem);
  console.log("Tamanho da mensagem:", mensagem.length);

  let resposta;

  if (mensagem === "oi") {
    resposta = Olá! Seja bem-vindo à *Casa Limpa*! Escolha uma opção:\n1 - Ver lista de produtos\n2 - Fazer um pedido\n3 - Falar com um atendente humano\n4 - Ver horário de funcionamento;
  } else {
    resposta = "Desculpe, não entendi. Envie 'oi' para ver as opções.";
  }

  await axios.post("https://api.z-api.io/instances/3E1972D7C998601EABD4BAA23289AB67/token/DBF621BD40B7A09D8D0B3C46/send-text", {
    phone: body.phone,
    message: resposta
  });

  res.sendStatus(200);
});

app.listen(10000, () => {
  console.log("Servidor rodando na porta 10000");
});