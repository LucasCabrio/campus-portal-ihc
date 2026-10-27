import { escapeHTML } from '../domain.js';
import { icon } from './icons.js';
export const esc = escapeHTML;
export const dateLabel = value => new Date(value + 'T12:00:00').toLocaleDateString('pt-BR');
export const heading = (title, description, action = '') => `<div class="heading"><div><h1>${title}</h1><p>${description}</p></div>${action}</div>`;
export const badge = (text, style = '') => `<span class="badge ${style}">${esc(text)}</span>`;
export const empty = text => `<div class="empty">${icon('file')}<p>${text}</p></div>`;
export function toast(message) { const el = document.querySelector('#toast'); el.textContent = message; el.classList.add('visible'); clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('visible'), 6500); }
export function confirmAction(title, message, onConfirm, label = 'Confirmar') {
 const dialog = document.querySelector('#modal');
 dialog.innerHTML = `<h2 id="modal-title">${esc(title)}</h2><p>${esc(message)}</p><div class="form-actions"><button class="btn secondary" id="dismiss">Voltar</button><button class="btn danger" id="confirm">${esc(label)}</button></div>`;
 dialog.querySelector('#dismiss').onclick = () => dialog.close();
 dialog.querySelector('#confirm').onclick = () => { try { onConfirm(); dialog.close(); } catch (error) { toast(error.message); } };
 dialog.showModal();
 dialog.querySelector('#dismiss').focus();
}
export function downloadText(filename, text) {
 const url = URL.createObjectURL(new Blob(['\ufeff' + text], { type: 'text/plain;charset=utf-8' }));
 const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
