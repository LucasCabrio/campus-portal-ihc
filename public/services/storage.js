const KEY = 'campus-ihc-v1';
const initial = () => ({ documents: [], reservations: [], preferences: { contrast: false, large: false } });
let state = initial();
let storageError = false;
try {
  const saved = JSON.parse(localStorage.getItem(KEY));
  if (saved && Array.isArray(saved.documents) && Array.isArray(saved.reservations)) {
    state.documents = saved.documents.filter(d => d && typeof d.id === 'string' && typeof d.type === 'string' && typeof d.created === 'string' && ['Disponível', 'Cancelada'].includes(d.status));
    state.reservations = saved.reservations.filter(r => r && ['id', 'room', 'date', 'time', 'reason', 'status'].every(k => typeof r[k] === 'string'));
    state.preferences = { contrast: saved.preferences?.contrast === true, large: saved.preferences?.large === true };
  }
} catch { storageError = true; }
export const getState = () => structuredClone(state);
export function updateState(change) {
  const next = structuredClone(state);
  change(next);
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { throw new Error('Não foi possível salvar. Libere espaço ou permita o armazenamento local no navegador e tente novamente.'); }
  state = next;
}
export const hadStorageError = () => storageError;
export const makeId = prefix => `${prefix}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
