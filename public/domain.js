export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function validateReservation(data, reservations, today = localDate()) {
  if (!['Laboratório de Informática 01', 'Laboratório de Redes', 'Sala de Estudos'].includes(data.room)) return 'Selecione um espaço válido.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date)) || localDate(new Date(data.date + 'T12:00:00')) !== data.date || data.date < today) return 'Escolha uma data válida, a partir de hoje.';
  if (!['08:00', '10:00', '14:00', '16:00', '19:00'].includes(data.time)) return 'Selecione um horário disponível.';
  if (data.date === today && data.time <= new Date().toTimeString().slice(0, 5)) return 'Esse horário já passou. Escolha um horário futuro.';
  if ((data.reason || '').trim().length < 5) return 'Descreva a finalidade com pelo menos 5 caracteres.';
  if (data.reason.trim().length > 160) return 'Use até 160 caracteres para a finalidade.';
  if (reservations.some(r => r.status !== 'Cancelada' && r.room === data.room && r.date === data.date && r.time === data.time)) return 'Este espaço já está reservado nesse horário. Escolha outro horário.';
  return '';
}
export function average(grades) { return (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(1); }
export function escapeHTML(value) { return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
