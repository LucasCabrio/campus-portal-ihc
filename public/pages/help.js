import { heading } from '../components/ui.js';
export function render() { return heading('Central de ajuda', 'Orientações simples para seguir com tranquilidade.') + `<section class="panel content-card"><h2>Como podemos ajudar?</h2>${[
 ['Como solicito uma declaração de matrícula?', 'Abra Documentos, escolha “Declaração de matrícula” e clique em Solicitar documento. Depois use Baixar .txt no histórico. A emissão é apenas demonstrativa.'],
 ['Como altero uma reserva?', 'Abra Laboratórios, cancele a reserva anterior e crie outra com a data e o horário corretos. O cancelamento pede confirmação antes de liberar o espaço.'],
 ['Por que um horário está indisponível?', 'Há uma reserva ativa para o mesmo espaço, dia e horário neste navegador. Escolha outro horário, outro espaço ou cancele sua reserva anterior.'],
 ['Encontrei uma nota incorreta. O que faço?', 'Em um sistema real, procure o docente ou a secretaria. Neste projeto as notas são dados fictícios fixos para demonstrar a interface.'],
 ['Onde meus dados ficam salvos?', 'Solicitações, reservas e preferências ficam no armazenamento local deste navegador. Não são enviadas a uma instituição. Limpar os dados do navegador remove esses registros.'],
 ['Posso usar apenas o teclado?', 'Sim. Use Tab para navegar, Enter para ativar links e botões e Escape para fechar confirmações. O primeiro link permite pular para o conteúdo. A página Acessibilidade oferece contraste reforçado e ampliação.']
 ].map(([q,a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}<p><a class="btn secondary" href="#acessibilidade">Preferências de acessibilidade</a></p><p>Projeto acadêmico de Lucas Cabrio (04723-133) e Paulo Esteves (04723-090).</p></section>`; }
