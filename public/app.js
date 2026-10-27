import { navigation } from './data.js';
import { icon } from './components/icons.js';
import { toast } from './components/ui.js';
import { hadStorageError } from './services/storage.js';
import * as dashboard from './pages/dashboard.js';
import * as grades from './pages/grades.js';
import * as documents from './pages/documents.js';
import * as laboratories from './pages/laboratories.js';
import * as agenda from './pages/agenda.js';
import * as help from './pages/help.js';
import * as accessibility from './pages/accessibility.js';
const routes = { inicio: dashboard, notas: grades, documentos: documents, laboratorios: laboratories, agenda, ajuda: help, acessibilidade: accessibility };
const labels = Object.fromEntries(navigation.map(([key, label]) => [key, label]));
Object.assign(labels, { ajuda: 'Central de ajuda', acessibilidade: 'Acessibilidade' });
function render(focus = false) {
 const key = location.hash.slice(1) || 'inicio'; const page = routes[key];
 if (!page) { location.hash = 'inicio'; return; }
 document.querySelector('#navigation').innerHTML = navigation.map(([route, label, glyph]) => `<a class="nav-item ${route === key ? 'active' : ''}" href="#${route}" ${route === key ? 'aria-current="page"' : ''}>${icon(glyph)}${label}</a>`).join('');
 document.querySelector('#breadcrumb').innerHTML = `Portal do aluno <span>/</span> ${labels[key]}`;
 document.title = `${labels[key]} · Campus`;
 const main = document.querySelector('main'); main.innerHTML = page.render(); page.bind?.(() => render(true));
 if (focus) main.focus({ preventScroll: true });
}
window.addEventListener('hashchange', () => {
 document.querySelector('#toast').classList.remove('visible');
 render(true);
 window.scrollTo(0,0);
});
document.querySelector('#search-form').onsubmit = e => {
 e.preventDefault(); const text = document.querySelector('#search').value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
 const choices = [['nota', 'notas'], ['frequencia', 'notas'], ['document', 'documentos'], ['declaracao', 'documentos'], ['historico', 'documentos'], ['labor', 'laboratorios'], ['reserva', 'laboratorios'], ['agenda', 'agenda'], ['ajuda', 'ajuda'], ['acess', 'acessibilidade']];
 const match = choices.find(([term]) => text.includes(term));
 if (match) { location.hash = match[1]; document.querySelector('#search').value = ''; document.querySelector('main').focus(); } else toast('Serviço não encontrado. Tente notas, documentos, laboratórios ou ajuda.');
};
accessibility.applyPreferences(); render();
if (hadStorageError()) toast('Não foi possível recuperar os dados locais. Verifique as permissões do navegador.');
