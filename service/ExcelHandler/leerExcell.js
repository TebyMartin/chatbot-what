import xlsx from 'xlsx';

// Función para convertir número serial de Excel a fecha legible
function excelDateToJSDate(serial) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400; 
  const date_info = new Date(utc_value * 1000);
  return date_info.toISOString().split('T')[0]; // yyyy-mm-dd
}

// Función para convertir decimal de Excel a hora HH:mm
function excelTimeToString(excelTime) {
  const totalSeconds = Math.floor(excelTime * 24 * 60 * 60);
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export default function obtenerTurnosPorTelefono(telefono) {
  const workbook = xlsx.readFile('./turnos.xlsx');
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const data = xlsx.utils.sheet_to_json(sheet);

  return data
    .map(t => ({
      telefono: t.telefono?.toString().replace(/\s|\r|\n/g, ''),
      fecha: excelDateToJSDate(t.fecha),
      hora: excelTimeToString(t["hora "]), // importante que sea "hora " con espacio
      profesional: t.profesional?.trim()
    }))
    .filter(t => t.telefono === telefono);
}
//servicio excelhandler