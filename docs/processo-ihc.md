# Processo de IHC — Campus

Autores: Lucas Cabrio (04723-133) e Paulo Esteves (04723-090). Outubro de 2026.

## 1. Problema e recorte

O projeto explora a dificuldade de localizar serviços e acompanhar solicitações em portais escolares. O recorte é a experiência do aluno: consultar desempenho, obter comprovantes e reservar espaços. É uma proposta acadêmica independente, sem vínculo com um portal institucional específico.

Hipóteses: menus pouco claros aumentam o esforço de busca; digitar dados já conhecidos introduz trabalho desnecessário; ausência de confirmação gera insegurança. Essas hipóteses motivam o projeto e não são resultados de entrevistas realizadas.

## 2. Pesquisa e participantes

Conforme informado pela equipe, o sistema foi validado e testado informalmente por familiar próximo. Não foram fornecidos data da sessão, perfil detalhado, gravações, tempos ou respostas de questionários. O relato é registrado como validação exploratória, com alcance limitado e sem generalização para o público estudantil.

Para complementar, propõe-se entrevistar alunos com diferentes níveis de familiaridade digital. Perguntas: quais tarefas são mais frequentes? Onde encontram dificuldade? Usam celular ou computador? Como sabem que uma solicitação foi concluída? Quais adaptações de leitura utilizam? Coletar somente dados necessários e obter consentimento antes da sessão.

## 3. Proto-personas (hipóteses)

**Marina, estudante que trabalha:** acessa pelo celular no intervalo, precisa de comprovante para estágio e tem pouco tempo. Necessidades: acesso direto, poucos campos e confirmação do resultado.

**Rafael, estudante que realiza projetos em grupo:** consulta horários de laboratórios e precisa corrigir uma reserva sem procurar a secretaria. Necessidades: prevenção de conflitos, histórico e cancelamento explícito.

**Cenário de acessibilidade:** pessoa que usa ampliação e navegação por teclado precisa identificar foco, ler rótulos e concluir formulários sem apontador. Não se afirma que essa pessoa participou da validação.

## 4. Jornada de solicitação

| Etapa | Dificuldade hipotética | Resposta implementada |
| --- | --- | --- |
| Perceber a necessidade | Não conhecer o nome do serviço | Atalho “Solicitar documento” e busca |
| Localizar o serviço | Navegação extensa | Menu persistente e seção de serviços |
| Preencher | Repetição de dados | Nome e RA já preenchidos |
| Confirmar | Dúvida sobre envio | Mensagem de sucesso e protocolo |
| Recuperar | Não encontrar o arquivo | Histórico e botão de download |
| Corrigir | Medo de cancelar por engano | Diálogo com opção de voltar |

## 5. Prototipação

A baixa fidelidade é representada pela estrutura de blocos abaixo; a alta fidelidade é o próprio aplicativo navegável. Não foi criado arquivo Figma.

```text
MENU FIXO | BUSCA E LOCALIZAÇÃO
          | NOME DO ALUNO / SEMESTRE
          | VÍNCULO ACADÊMICO
          | DISCIPLINAS | MÉDIA | FREQUÊNCIA | DOCUMENTOS
          | SOLICITAR DOCUMENTO | RESERVAR | NOTAS
          | ROTINA DE AULAS     | AVISOS
```

A referência `/legacy.html` simula uma solicitação com nome, RA e curso repetidos e serviços codificados. Serve como estímulo para teste comparativo, sem representar sistema real. O Campus elimina campos redundantes e apresenta ações em linguagem direta. O painel foi revisado após feedback do solicitante: removidos elementos promocionais, ilustração decorativa e contornos indevidos.

## 6. Heurísticas e decisões

Revisão de projeto orientada pelas heurísticas de Nielsen, sem alegação de avaliação independente por especialistas:

| Princípio | Evidência no protótipo |
| --- | --- |
| Visibilidade do estado | Status textual, protocolo e notificações |
| Correspondência com o mundo real | Termos como matrícula, frequência e laboratório |
| Controle e liberdade | Cancelamento com confirmação e opção Voltar |
| Consistência | Menu, botões e formulários compartilhados |
| Prevenção de erros | Datas, horários, campos obrigatórios e conflitos |
| Reconhecimento | Opções de documentos e espaços visíveis |
| Eficiência | Atalhos e busca por serviços |
| Design minimalista | Hierarquia simples e dados essenciais |
| Recuperação de erros | Mensagens que indicam a correção necessária |
| Ajuda | Perguntas frequentes e explicação dos limites |

Referência: [Nielsen Norman Group, 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/).

## 7. Acessibilidade

HTML semântico, idioma pt-BR, rótulos de campos, tabelas com cabeçalhos, anúncio de status, link de pular conteúdo, foco visível somente quando necessário, diálogo nativo, contraste reforçado, ampliação e layout móvel. A correção do seletor de foco eliminou contornos em elementos não focados.

Esses recursos se relacionam a teclado, foco, identificação de entradas e mensagens de estado. Não houve auditoria completa de contraste, leitores de tela ou todos os critérios WCAG. Referência: [W3C, WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## 8. Avaliação e limites

Os testes técnicos verificaram regras e fluxos; os cenários e a data de execução estão em `test-results.json`. Isso não mede satisfação, aprendizagem nem usabilidade percebida. O relato de familiar próximo é separado dessas verificações.

O protocolo complementar compara a mesma tarefa na referência simulada e no Campus, alternando a ordem entre participantes para reduzir efeito de aprendizagem. Medir conclusão sem ajuda, tempo em segundos, erros e comentários. Aplicar a versão validada em português do SUS depois de cada interface; não alterar livremente os itens. Não há pontuação SUS coletada neste projeto. Referência de uso do instrumento: [GitLab, System Usability Scale](https://handbook.gitlab.com/handbook/product/ux/performance-indicators/system-usability-scale/).

Não é possível afirmar redução percentual de tempo ou melhora de satisfação sem coleta real. A planilha foi entregue vazia para que os autores registrem evidências.
