import qrcode from 'qrcode-terminal';
import pkg from 'whatsapp-web.js'
import { listarTurnos } from '../business/app.js';

const { Client, LocalAuth } = pkg;

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Bot de WhatsApp listo');
});

//listar turnos
client.on('message', async msg => {
  listarTurnos(msg);
})
//redirigir hascia la bussiness/logica de negocio, es un controller/endopoints que maneja la logica de negocio  


client.initialize();
