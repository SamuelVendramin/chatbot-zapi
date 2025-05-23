const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

const instanceId = '3E1972D7C998601EABD4BAA23289AB67'; // substitua se necessário
const token = 'DBF621BD40B7A09D8D0B3C4...'; // substitua pelo seu token correto

app.post('/webhook', async (req, res) => {
  const body = req.body;
  console.log('Mensagem recebida bruta:', body?.text?.message || '');
  const mensagem = (body?.text?.message || '').trim().toLowerCase();
  const telefone = body?.phone;

  let resposta = 'Desculpe, não entendi. Envie "oi" para ver as opções.';

  if (mensagem === 'oi') {
    resposta = "Olá! Seja bem-vindo à *Casa Limpa*! Escolha uma opção:\n +
               1 - Ver lista de produtos\n +
               2 - Fazer um pedido\n +
               3 - Falar com um atendente humano\n +
               4 - Ver horário de funcionamento";
  }

  if (telefone) {
    try {
      const envio = await fetch(https://api.z-api.io/instances/${instanceId}/token/${token}/send-message, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: telefone,
          message: resposta
        })
      });

      if (!envio.ok) {
        console.error('Erro ao enviar para Z-API:', envio.status, await envio.text());
      } else {
        console.log('Resposta enviada para Z-API:', resposta);
      }
    } catch (error) {
      console.error('Erro ao tentar enviar mensagem:', error.message);
    }
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(Servidor rodando na porta ${PORT});
});
