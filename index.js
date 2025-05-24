
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Configurações da sua instância Z-API
const instanceId = "3E1972D7C998601EABD4BAA23289AB67";
const token = "D8F621BD4B70A9DDBD3C4173";

app.get("/", (req, res) => {
  res.send("Servidor online da Casa Limpa");
});

app.post("/webhook", async (req, res) => {
  const mensagemOriginal = req.body?.text?.message || "";
  const telefone = req.body?.phone || "";

  console.log("Mensagem recebida bruta:", mensagemOriginal);
  console.log("Telefone do cliente:", telefone);

  const texto = mensagemOriginal.toLowerCase().trim();
  let resposta = "";

  switch (texto) {
    case "oi":
    case "olá":
      resposta = `Olá! Seja bem-vindo à *Casa Limpa*! Escolha uma opção:
1 - Ver lista de produtos
2 - Fazer um pedido
3 - Falar com um atendente humano
4 - Ver horário de funcionamento`;
      break;
    case "1":
      resposta = "Você pode acessar nossa lista de produtos aqui: https://seusite.com/catalogo";
      break;
    case "2":
      resposta = "Certo! Me diga qual produto você quer e a quantidade.";
      break;
    case "3":
      resposta = "Aguarde um momento, vamos te encaminhar para um atendente.";
      break;
    case "4":
      resposta = "Nosso horário de atendimento é de segunda a sexta das 8h às 18h e sábado das 8h às 13h.";
      break;
    default:
      resposta = "Desculpe, não entendi. Envie 'oi' para ver as opções.";
      break;
  }

  try {
    const response = await axios.post(
      `https://api.z-api.io/instances/${instanceId}/send-text`,
      {
        phone: telefone,
        message: resposta,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Client-Token': token
        }
      }
    );

    console.log("Mensagem enviada com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao enviar para Z-API:", error.response?.data || error.message);
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
