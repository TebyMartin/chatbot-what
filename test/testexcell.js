import obtenerTurnosPorTelefono from './leerExcell.js';

const testNumero = '5493804442003'; // Cambia al número que estés probando

const turnos = obtenerTurnosPorTelefono(testNumero);
console.log('Turnos encontrados:', turnos);
