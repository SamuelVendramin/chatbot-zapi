const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor ativo. Use a rota /webhook para integração com a Z-API.");
});

app.post("/webhook", (req, res) => {
    console.log("Recebido da Z-API:", JSON.stringify(req.body, null, 2));

    const mensagemOriginal = req.body?.texto?.mensagem || "";
    console.log("Mensagem recebida bruta:", mensagemOriginal);
    console.log("Tamanho da mensagem:", mensagemOriginal.length);

    const text = mensagemOriginal.toLowerCase().trim();

    let resposta = "";

    if (text === "oi" || text === "olá") {
        resposta = `Olá! Seja bem-vindo à *Casa Limpa*! Escolha uma opção:
1 - Ver lista de produtos
2 - Fazer um pedido
3 - Falar com um atendente humano
4 - Ver horário de funcionamento`;
    } else if (text === "1") {
        resposta = "Você pode acessar nossa lista de produtos aqui: https://seusite.com/catalogo";
    } else if (text === "2") {
        resposta = "Certo! Me diga qual produto você quer e a quantidade.";
    } else if (text === "3") {
        resposta = "Aguarde um momento, vamos te encaminhar para um atendente.";
    } else if (text === "4") {
        resposta = "Nosso horário de atendimento é de segunda a sexta das 8h às 18h e sábado das 8h às 13h.";
    } else {
        resposta = "Desculpe, não entendi. Envie 'oi' para ver as opções.";
    }

    console.log("Resposta enviada para a Z-API:", resposta);
    res.send({ mensagem: resposta });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});