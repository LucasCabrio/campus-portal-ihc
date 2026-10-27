"""Gera o relatório explicativo a partir das capturas reais do portal."""
from pathlib import Path
import json
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output/pdf/Campus-Relatorio-IHC.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
FONT, BOLD = 'Helvetica', 'Helvetica-Bold'
if Path('C:/Windows/Fonts/segoeui.ttf').exists():
    pdfmetrics.registerFont(TTFont('Segoe', 'C:/Windows/Fonts/segoeui.ttf'))
    pdfmetrics.registerFont(TTFont('SegoeBold', 'C:/Windows/Fonts/segoeuib.ttf'))
    FONT, BOLD = 'Segoe', 'SegoeBold'
W, H = A4
GREEN, INK, MUTED, LINE = [HexColor(x) for x in ['#176a5f','#173e39','#526a63','#dce5e0']]
REPO = 'https://github.com/LucasCabrio/campus-portal-ihc'
c = canvas.Canvas(str(OUT), pagesize=A4)
c.setTitle('Campus - Portal do Aluno | Projeto Final de IHC')
c.setAuthor('Lucas Cabrio - 04723-133; Paulo Esteves - 04723-090')
styles = {
 'body': ParagraphStyle('body',fontName=FONT,fontSize=10,leading=15,textColor=INK,spaceAfter=9),
 'small': ParagraphStyle('small',fontName=FONT,fontSize=8.3,leading=12,textColor=MUTED),
 'heading': ParagraphStyle('heading',fontName=BOLD,fontSize=13,leading=18,textColor=INK),
}

def text(content, x, y, width, style='body'):
    p=Paragraph(content,styles[style]); _,height=p.wrap(width,H); p.drawOn(c,x,y-height); return y-height-10

def page(number, label, title, subtitle):
    c.setFillColor(GREEN); c.rect(0,H-8,W,8,fill=1,stroke=0)
    c.setFont(BOLD,9); c.setFillColor(GREEN); c.drawString(40,H-39,'CAMPUS  /  PROJETO FINAL DE IHC')
    c.setFont(FONT,8); c.setFillColor(MUTED); c.drawRightString(W-40,H-39,label.upper())
    c.setFont(BOLD,25); c.setFillColor(INK); c.drawString(40,H-84,title)
    text(subtitle,40,H-100,W-80,'small')
    c.setStrokeColor(LINE); c.line(40,44,W-40,44)
    c.setFont(FONT,8); c.setFillColor(MUTED); c.drawString(40,29,'Lucas Cabrio · Paulo Esteves | Outubro de 2026')
    c.drawRightString(W-40,29,f'{number:02d} / 09')
    return H-145

def screenshot(name,y,maxheight=400,width=None,x=40):
    width=width or W-80
    path=ROOT/'docs/screenshots'/name
    with Image.open(path) as im: iw,ih=im.size
    scale=min(width/iw,maxheight/ih); dw,dh=iw*scale,ih*scale
    c.setStrokeColor(LINE); c.roundRect(x-1,y-dh-1,dw+2,dh+2,4,stroke=1,fill=0)
    c.drawImage(str(path),x,y-dh,width=dw,height=dh)
    return y-dh-17

def table(rows,y,widths):
    formatted=[[Paragraph(str(v),styles['small']) for v in row] for row in rows]
    t=Table(formatted,colWidths=widths,hAlign='LEFT')
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),HexColor('#edf4f0')),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,0),(-1,-1),.5,LINE),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),10),('BOTTOMPADDING',(0,0),(-1,-1),10)]))
    _,height=t.wrap(W-80,H); t.drawOn(c,40,y-height); return y-height-20

y=page(1,'Apresentação','Campus · Portal do Aluno','Redesign acadêmico de serviços escolares, com foco em clareza, autonomia e prevenção de erros.')
y=text('Um portal para consultar notas e frequência, solicitar documentos e reservar laboratórios. Aplicação navegável, responsiva e organizada em módulos.',40,y,W-80)
y=screenshot('01-painel.png',y,330)
y=text('Equipe',40,y,W-80,'heading')
y=text('Lucas Cabrio - 04723-133<br/>Paulo Esteves - 04723-090',40,y,W-80)
y=text('Código-fonte',40,y,W-80,'heading')
y=text(f'<link href="{REPO}" color="#176a5f">{REPO}</link>',40,y,W-80)
text('Entrega: código para VS Code, documentação do processo de IHC, capturas reais e testes técnicos. Ambiente demonstrativo com dados acadêmicos fictícios.',40,y,W-80,'small')
c.showPage()

y=page(2,'Processo de IHC','Problema, público e jornada','Escopo de projeto e hipóteses que orientaram a interface.')
y=text('Problema e objetivo',40,y,W-80,'heading')
y=text('Serviços dispersos, repetição de dados e confirmações pouco claras podem dificultar a rotina do aluno. O Campus reúne três tarefas frequentes em uma navegação estável. Essas dores são hipóteses de projeto, não resultados de entrevistas documentadas.',40,y,W-80)
y=table([['Proto-persona (hipótese)','Necessidade e contexto'],['Marina · estudante que trabalha','Usa celular no intervalo e precisa de uma declaração para estágio. Prioriza poucos campos e confirmação clara.'],['Rafael · projetos em grupo','Precisa reservar um espaço e corrigir a data sem depender de atendimento. Prioriza disponibilidade e cancelamento.'] ],y,[175,W-255])
y=text('Jornada: obter uma declaração',40,y,W-80,'heading')
y=table([['Etapa','Decisão de interface'],['Encontrar o serviço','Atalho no painel, menu persistente e busca.'],['Solicitar','Tipo de documento explícito; nome e RA já preenchidos.'],['Acompanhar e recuperar','Protocolo, status e botão de download no histórico.'],['Corrigir','Cancelamento com diálogo e opção de voltar.']],y,[175,W-255])
y=text('Prototipação e comparação',40,y,W-80,'heading')
y=text('A estrutura de baixa fidelidade está documentada em docs/processo-ihc.md. A alta fidelidade é o próprio aplicativo navegável. A tela /legacy.html é uma referência anterior simulada; não houve auditoria de um portal institucional real nem criação de arquivo Figma.',40,y,W-80)
text('Pesquisa complementar proposta: entrevistar alunos sobre frequência das tarefas, dispositivo usado, dificuldades de localização e compreensão das confirmações.',40,y,W-80,'small')
c.showPage()

y=page(3,'Interface / 01','Painel e serviços acadêmicos','Uma visão resumida do vínculo, do desempenho e dos serviços do aluno.')
y=screenshot('01-painel.png',y,400)
y=text('Informação antes de decoração',40,y,W-80,'heading')
y=text('O painel apresenta o curso, as disciplinas em andamento, a média e a frequência. Os atalhos usam o nome da tarefa, enquanto o menu mantém a localização previsível. Horários de aula e avisos ficam em blocos separados.',40,y,W-80)
y=text('Revisão a partir do feedback',40,y,W-80,'heading')
text('A pedido do solicitante, foram retiradas frases promocionais, estrelas e ilustração decorativa. Um seletor CSS que desenhava contornos em todos os links foi corrigido. O foco permanece visível apenas no controle que está sendo usado por teclado.',40,y,W-80)
c.showPage()

y=page(4,'Interface / 02','Solicitação de documentos','Fluxo completo: solicitar, receber protocolo, baixar e cancelar.')
y=screenshot('02-documentos.png',y,400)
y=text('Como usar',40,y,W-80,'heading')
y=text('1. Escolha declaração de matrícula, histórico ou comprovante de frequência.<br/>2. Informe a finalidade, se necessário, e solicite o documento.<br/>3. Localize o protocolo em Minhas solicitações e use Baixar .txt.',40,y,W-80)
y=text('Feedback e controle',40,y,W-80,'heading')
text('A solicitação aparece no histórico e permanece após recarregar a página. O cancelamento exige confirmação. O arquivo é demonstrativo e sem validade oficial: o projeto não emite documentos acadêmicos reais nem envia dados à secretaria.',40,y,W-80)
c.showPage()

y=page(5,'Interface / 03','Reservas de laboratórios','Prevenção de erros no agendamento e recuperação após cancelamento.')
y=screenshot('03-laboratorios.png',y,400)
y=text('Escolha e confirmação',40,y,W-80,'heading')
y=text('O aluno seleciona espaço, data e horário e descreve a finalidade. A reserva tem duração de duas horas. O formulário rejeita datas inválidas ou passadas, horários já encerrados e conflito para o mesmo espaço, dia e horário.',40,y,W-80)
y=text('Reserva integrada à agenda',40,y,W-80,'heading')
text('A confirmação aparece no histórico e na agenda. Ao cancelar, um diálogo permite voltar sem alteração. A disponibilidade é local: considera somente os registros deste navegador, sem coordenação entre alunos ou dispositivos.',40,y,W-80)
c.showPage()

y=page(6,'Interface / 04','Notas e frequência','Dados acadêmicos apresentados em tabela com identificação por disciplina.')
y=screenshot('04-notas.png',y,390)
y=text('Leitura e interpretação',40,y,W-80,'heading')
y=text('A tabela reúne duas avaliações, média parcial e frequência de cinco disciplinas. A média é calculada a partir das avaliações; o status indica semestre em andamento. As referências de média mínima e frequência pertencem ao cenário fictício.',40,y,W-80)
y=text('Consistência entre telas',40,y,W-80,'heading')
text('Cabeçalhos, menu, cores de ação e componentes são reutilizados. Em telas estreitas, a tabela pode ser percorrida horizontalmente dentro de sua área, sem causar rolagem horizontal em toda a página.',40,y,W-80)
c.showPage()

y=page(7,'Interface / 05','Uso móvel e acessibilidade','Adaptações implementadas e limites da verificação.')
screenshot('05-mobile.png',y,625,width=135)
right=197; width=W-right-40
z=text('No celular',right,y,width,'heading')
z=text('O menu fica no topo e permite rolagem lateral. Os serviços são empilhados e os formulários usam uma coluna. A mesma aplicação atende computador e celular.',right,z,width)
z=text('Recursos disponíveis',right,z-8,width,'heading')
z=text('Rótulos associados aos campos; cabeçalhos em tabelas; link para pular ao conteúdo; foco por teclado; diálogos nativos; notificações de estado; contraste reforçado e ampliação de 15%.',right,z,width)
z=text('Verificação técnica',right,z-8,width,'heading')
z=text('As sete telas foram percorridas em viewport de 390 px. As preferências foram conferidas após recarregamento. O link de pular conteúdo foi acessado por teclado.',right,z,width)
z=text('Limites',right,z-8,width,'heading')
text('Não houve certificação WCAG nem auditoria completa com leitores de tela. Os recursos adotados apoiam acessibilidade, mas ainda precisam de avaliação com pessoas de diferentes necessidades.',right,z,width)
c.showPage()

y=page(8,'Engenharia','Arquitetura e testes','Código modular, sem dependências de execução externas.')
y=text('Como executar no VS Code',40,y,W-80,'heading')
y=text('Abra a pasta e execute <b>npm start</b> no terminal. Acesse <b>http://localhost:3000</b>. Requisito: Node.js 20 ou superior. Não é necessário npm install para usar o sistema. A configuração F5 usa a porta 4173 como alternativa.',40,y,W-80)
y=table([['Camada','Responsabilidade'],['public/app.js','Inicialização, roteamento e busca de serviços.'],['public/pages/','Módulo independente por tela; renderização e eventos locais.'],['public/components/','Ícones, cabeçalhos, confirmações, notificações e download.'],['public/services/storage.js','Estado local, persistência e tratamento de falhas de gravação.'],['public/domain.js e data.js','Regras puras de reserva, cálculos e dados demonstrativos.'],['public/styles/ e server.mjs','CSS por responsabilidade e servidor HTTP local.']],y,[175,W-255])
y=text('Evidências técnicas',40,y,W-80,'heading')
y=text('<b>7 testes unitários aprovados</b>: reservas válidas, conflitos, cancelamentos, datas, campos, cálculo e escape de texto.<br/><b>13 verificações de navegador aprovadas</b>: emissão e download, persistência, reserva e conflito, agenda, cancelamento, liberação de horário, notas, busca, preferências, teclado, telas móveis, texto seguro e ausência de erros JavaScript.',40,y,W-80)
text('Evidências reproduzíveis: tests/domain.test.mjs, scripts/browser-qa.cjs e docs/test-results.json. Os testes usam contexto de navegador isolado; não substituem uma avaliação com usuários.',40,y,W-80,'small')
c.showPage()

y=page(9,'Avaliação','Validação e próximos passos','O que foi informado pela equipe, o que foi verificado e o que falta medir.')
y=text('Validação informal',40,y,W-80,'heading')
y=text('<b>Conforme informado pela equipe, o sistema foi validado e testado informalmente por familiar próximo.</b> Não foram fornecidos data da sessão, perfil detalhado, tempos de execução ou respostas SUS. O registro expressa esse relato e não representa um estudo controlado ou validação independente.',40,y,W-80)
y=text('Avaliação orientada por IHC',40,y,W-80,'heading')
y=text('A revisão de projeto considerou visibilidade do estado, linguagem familiar, controle do usuário, consistência, prevenção de erros, reconhecimento, eficiência, minimalismo, recuperação e ajuda. Esses princípios orientam decisões da interface; não se atribui parecer externo de especialistas.',40,y,W-80)
y=text('Protocolo para complementar a avaliação',40,y,W-80,'heading')
y=text('Aplicar as tarefas de documento, consulta de notas, reserva e recuperação com participantes consentidos. Registrar sucesso, tempo, erros e necessidade de ajuda. Para comparar a referência simulada com o Campus, usar a mesma tarefa e alternar a ordem das interfaces. Aplicar versão validada do SUS sem alterar os itens. A planilha de coleta foi entregue vazia; não há escore SUS nem percentual de melhoria comprovado.',40,y,W-80)
y=text('Limitações de implementação',40,y,W-80,'heading')
y=text('O portal não possui autenticação, backend acadêmico ou banco compartilhado. Reservas e documentos ficam no navegador. Dados acadêmicos são fictícios e os downloads não possuem validade oficial. Uma versão institucional exigiria autenticação, autorização, armazenamento protegido e disponibilidade compartilhada.',40,y,W-80)
y=text('Referências e materiais',40,y,W-80,'heading')
for label,url in [ ('Nielsen Norman Group · 10 Usability Heuristics','https://www.nngroup.com/articles/ten-usability-heuristics/'),('W3C · Web Content Accessibility Guidelines 2.2','https://www.w3.org/TR/WCAG22/'),('GitLab Handbook · System Usability Scale','https://handbook.gitlab.com/handbook/product/ux/performance-indicators/system-usability-scale/'),('Repositório do projeto',REPO) ]:
    y=text(f'<link href="{url}" color="#176a5f">{label}</link>',40,y,W-80,'small')
text('Roteiro, proto-personas, jornada, referência simulada e formulário de coleta estão na pasta docs/. Referências consultadas em 27/10/2026.',40,y,W-80,'small')
c.save()
print(OUT)
