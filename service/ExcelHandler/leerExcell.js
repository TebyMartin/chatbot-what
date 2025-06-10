import xlsx from 'xlsx';

// Función para convertir número serial de Excel a fecha legible
function excelDateToJSDate(serial) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const excelEpoch = new Date(Date.UTC(1899, 11, 30));
  const date = new Date(excelEpoch.getTime() + serial * msPerDay);

  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

// Función para convertir decimal de Excel a hora HH:mm
function excelTimeToString(excelTime) {
  const totalSeconds = Math.floor(excelTime * 24 * 60 * 60);
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}


function leerTurnos() {
  const workbook = xlsx.readFile('./service/ExcelHandler/turnos.xlsx');
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet, { raw: true });

  return data.map(t => ({
    telefono: t.telefono?.toString().replace(/\s|\r|\n|"/g, ''),
    fecha: excelDateToJSDate(t.fecha),
    hora: excelTimeToString(t["hora "]), 
    profesional: t.profesional?.trim(),
    nombre: t.nombre?.trim() || 'Paciente',
  }));
}

export default function obtenerTurnosPorTelefono(telefono) {
  const turnos = leerTurnos();
  return turnos.filter(t => t.telefono === telefono);
}

export function obtenerTodosLosTurnos() {
 return leerTurnos();
}
//servicio excelhandler