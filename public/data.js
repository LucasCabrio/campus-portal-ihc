export const student = { name: 'Lucas Cabrio', ra: '04723-133', course: 'Análise e Desenvolvimento de Sistemas' };
export const subjects = [
  { name: 'Interação Humano-Computador', teacher: 'Mariana Oliveira', grades: [8.5, 9.0], attendance: 96, room: 'Sala 204', day: 'Terça-feira', start: '19:00', end: '20:40' },
  { name: 'Redes de Computadores', teacher: 'Ricardo Santos', grades: [7.5, 8.0], attendance: 92, room: 'Laboratório de Redes', day: 'Terça-feira', start: '20:50', end: '22:30' },
  { name: 'Engenharia de Software', teacher: 'Camila Ferreira', grades: [9.0, 8.5], attendance: 100, room: 'Sala 301', day: 'Quarta-feira', start: '19:00', end: '20:40' },
  { name: 'Banco de Dados', teacher: 'André Lima', grades: [7.0, 8.0], attendance: 88, room: 'Laboratório de Informática 01', day: 'Quinta-feira', start: '19:00', end: '20:40' },
  { name: 'Programação Web', teacher: 'Juliana Costa', grades: [9.5, 9.0], attendance: 96, room: 'Laboratório de Informática 01', day: 'Sexta-feira', start: '19:00', end: '20:40' }
];
export const rooms = [
  { name: 'Laboratório de Informática 01', details: '30 computadores · desenvolvimento e pesquisa' },
  { name: 'Laboratório de Redes', details: '20 estações · roteadores e switches' },
  { name: 'Sala de Estudos', details: '8 lugares · estudo individual ou em grupo' }
];
export const documentTypes = ['Declaração de matrícula', 'Histórico escolar', 'Comprovante de frequência'];
export const navigation = [ ['inicio', 'Visão geral', 'grid'], ['notas', 'Notas e frequência', 'chart'], ['documentos', 'Documentos', 'file'], ['laboratorios', 'Laboratórios', 'lab'], ['agenda', 'Minha agenda', 'calendar'] ];
