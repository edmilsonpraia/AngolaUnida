// Tipos principais da aplicação Angola Uma Só Nação

export interface User {
    id: string;
    nome: string;
    email: string;
    bi: string;
    role: 'admin' | 'student';
    universidade?: string;
    curso?: string;
    cidade?: string;
    anoFrequencia?: number;
    telefone?: string;
    documentosIds?: string[];
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
    isActive: boolean;
  }
  
  export interface Documento {
    id: string;
    userId: string;
    tipo: TipoDocumento;
    status: StatusDocumento;
    prioridade: PrioridadeDocumento;
    dataEnvio: Date;
    prazoEstimado: Date;
    dataConclusao?: Date;
    observacoes?: string;
    observacoesInternas?: string;
    arquivos: ArquivoDocumento[];
    historico: HistoricoDocumento[];
    createdAt: Date;
    updatedAt: Date;
    processadoPor?: string;
  }
  
  export type TipoDocumento = 
    | 'registro_criminal'
    | 'renovacao_passaporte' 
    | 'procuracao'
    | 'certidao_nascimento'
    | 'declaracao_comparencia'
    | 'visto_estudante'
    | 'atestado_matricula'
    | 'declaracao_residencia'
    | 'legalizacao_documentos'
    | 'outros';
  
  export type StatusDocumento = 
    | 'pendente'
    | 'em_processo' 
    | 'em_analise'
    | 'aguardando_documentos'
    | 'pronto'
    | 'entregue'
    | 'cancelado'
    | 'rejeitado';
  
  export type PrioridadeDocumento = 
    | 'baixa'
    | 'media' 
    | 'alta'
    | 'urgente';
  
  export interface ArquivoDocumento {
    id: string;
    nome: string;
    nomeOriginal: string;
    url: string;
    tipo: 'pdf' | 'jpg' | 'jpeg' | 'png' | 'doc' | 'docx';
    tamanho: number;
    tamanhoFormatado: string;
    uploadedAt: Date;
    uploadedBy: string;
  }
  
  export interface HistoricoDocumento {
    id: string;
    data: Date;
    acao: string;
    observacao?: string;
    realizadoPor: string;
    statusAnterior?: StatusDocumento;
    statusNovo?: StatusDocumento;
  }
  
  export interface Notificacao {
    id: string;
    userId: string;
    tipo: TipoNotificacao;
    titulo: string;
    mensagem: string;
    data: Date;
    lida: boolean;
    prioridade: PrioridadeNotificacao;
    documentoId?: string;
    metadata?: Record<string, any>;
    canais: CanalNotificacao[];
  }
  
  export type TipoNotificacao = 
    | 'documento_pronto'
    | 'documento_rejeitado'
    | 'prazo_vencendo'
    | 'prazo_vencido'
    | 'documentos_necessarios'
    | 'comunicado_geral'
    | 'agendamento'
    | 'sistema';
  
  export type PrioridadeNotificacao = 
    | 'baixa'
    | 'media'
    | 'alta'
    | 'critica';
  
  export type CanalNotificacao = 
    | 'app'
    | 'email'
    | 'sms'
    | 'whatsapp';
  
  export interface Comunicado {
    id: string;
    titulo: string;
    conteudo: string;
    resumo?: string;
    autor: string;
    destinatarios: DestinatarioComunicado;
    prioridade: PrioridadeNotificacao;
    canais: CanalNotificacao[];
    agendadoPara?: Date;
    publicadoEm?: Date;
    expiresEm?: Date;
    anexos?: ArquivoDocumento[];
    visualizacoes: VisualizacaoComunicado[];
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
  }
  
  export interface DestinatarioComunicado {
    tipo: 'todos' | 'universidade' | 'curso' | 'cidade' | 'ano' | 'status' | 'custom';
    filtros?: {
      universidades?: string[];
      cursos?: string[];
      cidades?: string[];
      anos?: number[];
      status?: StatusDocumento[];
      userIds?: string[];
    };
  }
  
  export interface VisualizacaoComunicado {
    userId: string;
    visualizadoEm: Date;
    canal: CanalNotificacao;
  }
  
  export interface Agendamento {
    id: string;
    userId: string;
    titulo: string;
    descricao?: string;
    tipo: TipoAgendamento;
    dataHora: Date;
    duracao: number; // em minutos
    status: StatusAgendamento;
    local?: string;
    documentoId?: string;
    observacoes?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type TipoAgendamento = 
    | 'retirada_documento'
    | 'entrega_documento'
    | 'consulta'
    | 'renovacao'
    | 'outros';
  
  export type StatusAgendamento = 
    | 'agendado'
    | 'confirmado'
    | 'realizado'
    | 'cancelado'
    | 'nao_compareceu';
  
  export interface UniversidadeInfo {
    id: string;
    nome: string;
    nomeCompleto: string;
    cidade: string;
    endereco?: string;
    contato?: {
      telefone?: string;
      email?: string;
      website?: string;
    };
    coordenador?: {
      nome: string;
      email: string;
      telefone: string;
    };
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Estatisticas {
    totalEstudantes: number;
    estudantesAtivos: number;
    novasMatriculas: number;
    documentosPendentes: number;
    documentosProcessando: number;
    documentosProntos: number;
    documentosEntregues: number;
    tempoMedioProcessamento: number; // em dias
    taxaSatisfacao?: number;
    universidades: number;
    cidades: number;
  }
  
  export interface EstudantePorUniversidade {
    universidade: string;
    total: number;
    ativos: number;
    documentosPendentes: number;
    percentual: number;
  }
  
  export interface RelatorioMensal {
    mes: number;
    ano: number;
    novasMatriculas: number;
    documentosProcessados: number;
    documentosEntregues: number;
    tempoMedioProcessamento: number;
    satisfacao: number;
  }
  
  // Interfaces para formulários e requests
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest {
    nome: string;
    email: string;
    password: string;
    bi: string;
    telefone: string;
    universidade: string;
    curso: string;
    cidade: string;
    anoFrequencia: number;
  }
  
  export interface SolicitacaoDocumentoRequest {
    tipo: TipoDocumento;
    observacoes?: string;
    arquivos: File[];
    urgente?: boolean;
  }
  
  export interface ComunicadoRequest {
    titulo: string;
    conteudo: string;
    resumo?: string;
    destinatarios: DestinatarioComunicado;
    prioridade: PrioridadeNotificacao;
    canais: CanalNotificacao[];
    agendarPara?: Date;
    expirarEm?: Date;
    anexos?: File[];
  }
  
  export interface AgendamentoRequest {
    titulo: string;
    descricao?: string;
    tipo: TipoAgendamento;
    dataHora: Date;
    duracao?: number;
    documentoId?: string;
    observacoes?: string;
  }
  
  // Interfaces para responses da API
  export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: Record<string, string[]>;
    meta?: {
      total?: number;
      page?: number;
      perPage?: number;
      totalPages?: number;
    };
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
    expiresAt: Date;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    meta: {
      total: number;
      page: number;
      perPage: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  }
  
  // Interfaces para filtros e busca
  export interface FiltroDocumentos {
    status?: StatusDocumento[];
    tipo?: TipoDocumento[];
    prioridade?: PrioridadeDocumento[];
    dataInicio?: Date;
    dataFim?: Date;
    busca?: string;
  }
  
  export interface FiltroEstudantes {
    universidade?: string[];
    curso?: string[];
    cidade?: string[];
    ano?: number[];
    status?: string[];
    busca?: string;
  }
  
  export interface Ordenacao {
    campo: string;
    direcao: 'asc' | 'desc';
  }
  
  // Constantes e enums utilitários
  export const TIPOS_DOCUMENTO_LABELS: Record<TipoDocumento, string> = {
    registro_criminal: 'Registro Criminal',
    renovacao_passaporte: 'Renovação de Passaporte',
    procuracao: 'Procuração',
    certidao_nascimento: 'Certidão de Nascimento',
    declaracao_comparencia: 'Declaração de Comparência',
    visto_estudante: 'Visto de Estudante',
    atestado_matricula: 'Atestado de Matrícula',
    declaracao_residencia: 'Declaração de Residência',
    legalizacao_documentos: 'Legalização de Documentos',
    outros: 'Outros'
  };
  
  export const STATUS_DOCUMENTO_LABELS: Record<StatusDocumento, string> = {
    pendente: 'Pendente',
    em_processo: 'Em Processo',
    em_analise: 'Em Análise',
    aguardando_documentos: 'Aguardando Documentos',
    pronto: 'Pronto',
    entregue: 'Entregue',
    cancelado: 'Cancelado',
    rejeitado: 'Rejeitado'
  };
  
  export const PRIORIDADE_LABELS: Record<PrioridadeDocumento, string> = {
    baixa: 'Baixa',
    media: 'Média',
    alta: 'Alta',
    urgente: 'Urgente'
  };
  
  // Utilitários de validação
  export const VALID_FILE_TYPES = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'];
  export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  export const BI_REGEX = /^\d{9}[A-Z]{2}\d{3}$/;
  export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;