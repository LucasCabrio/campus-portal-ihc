import test from 'node:test';
import assert from 'node:assert/strict';
import { validateReservation, average, escapeHTML, localDate } from '../public/domain.js';
const valid = { room: 'Laboratório de Redes', date: '2099-10-28', time: '14:00', reason: 'Projeto de redes' };
test('aceita reserva válida em data futura', () => assert.equal(validateReservation(valid, [], '2099-10-27'), ''));
test('rejeita conflito ativo e permite repetir reserva cancelada', () => {
 assert.match(validateReservation(valid, [{ ...valid, status: 'Confirmada' }], '2099-10-27'), /já está reservado/);
 assert.equal(validateReservation(valid, [{ ...valid, status: 'Cancelada' }], '2099-10-27'), '');
});
test('rejeita datas passadas, impossíveis e não formatadas', () => {
 for (const date of ['2000-01-01', '2099-02-30', 'abc']) assert.match(validateReservation({ ...valid, date }, [], '2099-10-27'), /data válida/);
});
test('rejeita sala, horário e finalidade inválidos', () => {
 assert.match(validateReservation({ ...valid, room: 'Sala inexistente' }, []), /espaço válido/);
 assert.match(validateReservation({ ...valid, time: '23:00' }, []), /horário disponível/);
 assert.match(validateReservation({ ...valid, reason: '  a  ' }, []), /pelo menos/);
 assert.match(validateReservation({ ...valid, reason: 'x'.repeat(161) }, []), /até 160/);
});
test('conflitos são específicos por espaço, dia e horário', () => {
 for (const change of [{ room: 'Sala de Estudos' }, { date: '2099-10-29' }, { time: '16:00' }]) assert.equal(validateReservation(valid, [{ ...valid, ...change, status: 'Confirmada' }]), '');
});
test('média e data local têm valores previsíveis', () => { assert.equal(average([8, 9]), '8.5'); assert.equal(localDate(new Date(2026, 9, 27, 12)), '2026-10-27'); });
test('texto de usuário não é interpretado como HTML', () => assert.equal(escapeHTML('<script>"&\'</script>'), '&lt;script&gt;&quot;&amp;&#39;&lt;/script&gt;'));
