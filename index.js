const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

const instanceId = "3E1972D7C998601EABD4BAA23289AB67"; // ID da instância da Z-API
const token = "DBF621BD40B7A09D8D0B3C46"; // Token da Z-API

app.get("/", (req, res) => {
  res.send("Servidor online");
});

app.post("/webhook", async (req, res) => {
  const mensagemOriginal = req.body?.text?.message || "";
  const telefone = req.body?.phone;

  console.log("Mensagem recebida bruta:", mensagemOriginal);
  console.log("Tamanho da mensagem:", mensagemOriginal.length);

  const texto = mensagemOriginal.toLowerCase().trim();

  let resposta = "";

  if (texto === "oi" || texto === "olá") {
    resposta = `Olá! Seja bem-vindo à *Casa Limpa*! Escolha uma opção:
1 - Ver lista de produtos
2 - Fazer um pedido
3 - Falar com um atendente humano
4 - Ver horário de funcionamento`;
  } else if (texto === "1") {
    resposta = "Você pode acessar nossa lista de produtos aqui: https://seusite.com/catalogo";
  } else if (texto === "2") {
    resposta = "Certo! Me diga qual produto você quer e a quantidade.";
  } else if (texto === "3") {
    resposta = "Aguarde um momento, vamos te encaminhar para um atendente.";
  } else if (texto === "4") {
    resposta = "Nosso horário de atendimento é de segunda a sexta das 8h às 18h e sábado das 8h às 13h.";
  } else {
    resposta = "Desculpe, não entendi. Envie 'oi' para ver as opções.";
  }

  console.log("Resposta enviada para a Z-API:", resposta);

  try {
    await fetch(`https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: telefone,
        message: resposta
      })
    });
  } catch (error) {
    console.error("Erro ao enviar mensagem para Z-API:", error);
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});