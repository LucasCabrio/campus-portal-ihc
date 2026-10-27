import { subjects } from '../data.js';
import { average } from '../domain.js';
import { getState } from '../services/storage.js';
import { heading, badge } from '../components/ui.js';
import { icon } from '../components/icons.js';
export function render() {
 const state = getState();
 const stats = [ ['Disciplinas em curso', '05', 'Neste semestre', 'book'], ['Média geral', average(subjects.map(s => Number(average(s.grades)))) + ' <em>/ 10</em>', 'Bom desempenho', 'chart'], ['Frequência média', Math.round(subjects.reduce((a,s) => a + s.attendance, 0) / subjects.length) + '<em>%</em>', 'Acima do mínimo de 75%', 'check'], ['Documentos', String(state.documents.filter(d => d.status === 'Disponível').length).padStart(2, '0'), 'Disponíveis para download', 'file'] ];
 return heading('Olá, Lucas', 'Confira suas disciplinas e acesse os serviços da secretaria.', '<span class="semester"><span>●</span> Semestre demonstrativo · 2026.2</span>') +
 `<section class="course-summary" aria-label="Vínculo acadêmico"><div><small>SEU CURSO</small><h2>Análise e Desenvolvimento de Sistemas</h2><p>RA 04723-133 · Noturno · Matrícula ativa</p></div><a href="#agenda">Consultar horários →</a></section>
 <section class="stats" aria-label="Resumo acadêmico">${stats.map(([label, value, caption, glyph], i) => `<article class="stat"><div class="stat-top">${label}${icon(glyph)}</div><strong>${value}</strong><small class="${i === 1 || i === 2 ? 'positive' : ''}">${caption}</small></article>`).join('')}</section>
 <div class="section-title"><h2>Serviços acadêmicos</h2><span style="font-size:11px;color:var(--muted)">Acesso rápido</span></div><section class="quick-grid" aria-label="Acesso rápido">
 ${[['documentos', 'file', 'Solicitar documento', 'Declarações e histórico escolar'], ['laboratorios', 'lab', 'Reservar laboratório', 'Consultar espaços e horários'], ['notas', 'chart', 'Consultar minhas notas', 'Avaliações e frequência por disciplina']].map(([route, glyph, title, caption]) => `<a class="quick" href="#${route}"><span class="icon-box">${icon(glyph)}</span><div><h3>${title}</h3><p>${caption}</p></div><span class="arrow" aria-hidden="true">↗</span></a>`).join('')}</section>
 <div class="columns"><section class="panel"><div class="panel-head"><h2>Sua rotina de aulas</h2><span>Terça-feira · exemplo</span></div>${subjects.slice(0, 2).map(s => `<article class="lesson"><div class="lesson-time">${s.start}<small>${s.end}</small></div><div class="lesson-line"></div><div><h3>${s.name}</h3><p>${s.room} · ${s.teacher}</p></div>${badge('Presencial', 'gray')}</article>`).join('')}<div style="padding:14px 22px;font-size:11px;color:var(--green)"><a href="#agenda">Consultar semana completa →</a></div></section>
 <section class="panel"><div class="panel-head"><h2>Mural do campus</h2>${badge('2 avisos', 'gray')}</div><article class="notice"><small>SECRETARIA ACADÊMICA</small><h3>Emissão de documentos</h3><p>Emita versões demonstrativas de declarações e histórico pela aba Documentos.</p></article><article class="notice"><small>ESPAÇOS DE APRENDIZAGEM</small><h3>Reserva de espaços</h3><p>Consulte os espaços e reserve um horário para o seu próximo projeto.</p></article></section></div>`;
}
