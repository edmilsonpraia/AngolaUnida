import React, { useState } from 'react';
import { useAuth } from '../context/Auth';
import { 
  Users, 
  FileText, 
  BarChart3, 
  TrendingUp,
  MessageSquare,
  Calendar,
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Download,
  Send
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [filtroEstudantes, setFiltroEstudantes] = useState('todos');
  const [termoBusca, setTermoBusca] = useState('');

  // Mock data - substitua por dados reais da API
  const estatisticas = {
    totalEstudantes: 247,
    documentosPendentes: 23,
    documentosProcessando: 45,
    documentosProntos: 89,
    novasMatriculas: 12,
    universidades: 8
  };

  const estudantesRecentes = [
    {
      id: '1',
      nome: 'Maria Santos',
      universidade: 'Universidade de Moscou',
      curso: 'Medicina',
      cidade: 'Moscou',
      status: 'ativo',
      dataRegistro: new Date('2024-01-15'),
      documentosPendentes: 2
    },
    {
      id: '2',
      nome: 'José Mendes',
      universidade: 'Universidade de São Petersburgo',
      curso: 'Engenharia Civil',
      cidade: 'São Petersburgo',
      status: 'ativo',
      dataRegistro: new Date('2024-01-14'),
      documentosPendentes: 0
    },
    {
      id: '3',
      nome: 'Ana Costa',
      universidade: 'Instituto de Física e Tecnologia',
      curso: 'Física Nuclear',
      cidade: 'Moscou',
      status: 'pendente',
      dataRegistro: new Date('2024-01-13'),
      documentosPendentes: 1
    }
  ];

  const documentosUrgentes = [
    {
      id: '1',
      estudante: 'Carlos Silva',
      tipo: 'Registro Criminal',
      status: 'pronto',
      prazo: new Date('2024-01-22'),
      prioridade: 'alta'
    },
    {
      id: '2',
      estudante: 'Luísa Fernandes',
      tipo: 'Renovação Passaporte',
      status: 'em_processo',
      prazo: new Date('2024-01-25'),
      prioridade: 'media'
    },
    {
      id: '3',
      estudante: 'Pedro Augusto',
      tipo: 'Visto de Estudante',
      status: 'pendente',
      prazo: new Date('2024-01-20'),
      prioridade: 'alta'
    }
  ];

  const universidadesStats = [
    { nome: 'Universidade de Moscou', estudantes: 67, documentos: 23 },
    { nome: 'Universidade de São Petersburgo', estudantes: 45, documentos: 18 },
    { nome: 'Instituto de Física e Tecnologia', estudantes: 38, documentos: 15 },
    { nome: 'Universidade Técnica Bauman', estudantes: 31, documentos: 12 },
    { nome: 'Universidade de Kazan', estudantes: 28, documentos: 9 }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'inativo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baixa': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const [mostrarEnviarComunicado, setMostrarEnviarComunicado] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header Administrativo */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Painel Administrativo
            </h1>
            <p className="text-red-100 mt-2">
              Embaixada de Angola na Rússia - Gestão de Estudantes
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-sm text-red-100">Administrador</div>
              <div className="font-medium">{user?.nome}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Estudantes</p>
              <p className="text-3xl font-bold text-blue-600">{estatisticas.totalEstudantes}</p>
              <p className="text-sm text-green-600 flex items-center mt-2">
                <TrendingUp size={16} className="mr-1" />
                +{estatisticas.novasMatriculas} este mês
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Docs. Pendentes</p>
              <p className="text-3xl font-bold text-red-600">{estatisticas.documentosPendentes}</p>
              <p className="text-sm text-red-600">Requer atenção</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Em Processo</p>
              <p className="text-3xl font-bold text-yellow-600">{estatisticas.documentosProcessando}</p>
              <p className="text-sm text-yellow-600">Sendo processados</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Docs. Prontos</p>
              <p className="text-3xl font-bold text-green-600">{estatisticas.documentosProntos}</p>
              <p className="text-sm text-green-600">Para retirada</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estudantes Recentes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Registros Recentes</h2>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {estudantesRecentes.map((estudante) => (
              <div key={estudante.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {estudante.nome}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {estudante.curso} - {estudante.universidade}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{estudante.cidade}</span>
                      <span>•</span>
                      <span>Registrado em {formatDate(estudante.dataRegistro)}</span>
                    </div>
                    {estudante.documentosPendentes > 0 && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {estudante.documentosPendentes} doc(s) pendente(s)
                        </span>
                      </div>
                    )}
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(estudante.status)}`}>
                    {estudante.status === 'ativo' ? 'Ativo' : 'Pendente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Ver todos os estudantes →
            </button>
          </div>
        </div>

        {/* Documentos Urgentes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Documentos Urgentes</h2>
              <FileText className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {documentosUrgentes.map((documento) => (
              <div key={documento.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        {documento.tipo}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPrioridadeColor(documento.prioridade)}`}>
                        {documento.prioridade}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Estudante: {documento.estudante}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Prazo: {formatDate(documento.prazo)}</span>
                      <span>•</span>
                      <span className="capitalize">{documento.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Ver todos os documentos →
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas por Universidade */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Estudantes por Universidade</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {universidadesStats.map((uni, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">
                      {uni.nome}
                    </h4>
                    <div className="text-sm text-gray-600">
                      {uni.estudantes} estudantes • {uni.documentos} documentos
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(uni.estudantes / estatisticas.totalEstudantes) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ações Administrativas */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Ações Rápidas</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => setMostrarEnviarComunicado(true)}
              className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
            >
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div className="text-left">
                <h4 className="text-sm font-medium text-gray-900">
                  Enviar Comunicado
                </h4>
                <p className="text-xs text-gray-600">
                  Notificar estudantes
                </p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
              <Download className="h-8 w-8 text-green-600" />
              <div className="text-left">
                <h4 className="text-sm font-medium text-gray-900">
                  Relatórios
                </h4>
                <p className="text-xs text-gray-600">
                  Exportar dados
                </p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="text-left">
                <h4 className="text-sm font-medium text-gray-900">
                  Agendar Atendimento
                </h4>
                <p className="text-xs text-gray-600">
                  Gerenciar horários
                </p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 transition-colors">
              <Bell className="h-8 w-8 text-yellow-600" />
              <div className="text-left">
                <h4 className="text-sm font-medium text-gray-900">
                  Notificações
                </h4>
                <p className="text-xs text-gray-600">
                  Configurar alertas
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Modal para Enviar Comunicado */}
      {mostrarEnviarComunicado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Enviar Comunicado
                </h2>
                <button
                  onClick={() => setMostrarEnviarComunicado(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destinatários
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="todos">Todos os estudantes</option>
                  <option value="universidade">Por universidade</option>
                  <option value="curso">Por curso</option>
                  <option value="cidade">Por cidade</option>
                  <option value="status">Por status de documento</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite o assunto do comunicado..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                  placeholder="Digite a mensagem do comunicado..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prioridade
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="email" className="rounded" />
                <label htmlFor="email" className="text-sm text-gray-700">
                  Enviar também por e-mail
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="sms" className="rounded" />
                <label htmlFor="sms" className="text-sm text-gray-700">
                  Enviar também por SMS
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setMostrarEnviarComunicado(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Send size={16} />
                  <span>Enviar Comunicado</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;