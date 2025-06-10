//funciones
//listar turnos 
import obtenerTurnosPorTelefono from '../service/ExcelHandler/leerExcell.js'
import moment from 'moment'
import { client } from '../controller/index.js';
import { obtenerTodosLosTurnos } from '../service/ExcelHandler/leerExcell.js';

export async function listarTurnos(msg) {
    console.log('📩 Mensaje recibido:', msg.body);
    
      const mensaje = msg.body.toLowerCase();
      const numero = msg.from.replace('@c.us', '');
    
      if (!mensaje.includes('message')) {
        return; 
      }
    
      const turnos = obtenerTurnosPorTelefono(numero);
    
      if (turnos.length === 0) {
        await client.sendMessage(msg.from, '❌ No tenés turnos agendados.');
      } else {
        const respuesta = turnos.map(t =>
          `📅 ${t.fecha} a las ${t.hora} con ${t.profesional}`
        ).join('\n');
    
        await client.sendMessage(msg.from, `📋 Estos son tus turnos:\n${respuesta}`);
      }
}
export async function recordarTurnos() {
  
  const turnos = obtenerTodosLosTurnos();
  const mañana = moment().add(1, 'day').format('DD/MM/YYYY');

  for (let turno of turnos) {
    if (turno.fecha === mañana && turno.telefono) {
       console.log(`📆 Comparando: turno.fecha = ${turno.fecha} / mañana = ${mañana}`);
      const mensaje = `🔔 Hola ${turno.nombre} Tenés agendado un turno para mañana *${turno.fecha}* a las *${turno.hora}* con *${turno.profesional}*. ¿Confirmás asistencia?`;
      const numeroFormateado = `549${turno.telefono.replace(/^549/, '')}@c.us`;

      try {
        await client.sendMessage(numeroFormateado, mensaje);
        console.log(`✅ Recordatorio enviado a ${numeroFormateado}`);
      } catch (error) {
        console.error(`❌ Error al enviar a ${numeroFormateado}:`, error.message);
      }
    } else {
      console.log(`🔕 No hay recordatorio para: ${turno.telefono} (${turno.fecha})`);
    }
  }
}

