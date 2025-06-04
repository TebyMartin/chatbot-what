//funciones
//listar turnos 
import obtenerTurnosPorTelefono from '../service/ExcelHandler/leerExcell.js';

export async function listarTurnos() {
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
 

