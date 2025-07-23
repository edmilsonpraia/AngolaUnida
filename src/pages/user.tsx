import React from 'react';
import { useAuth } from '../context/Auth';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Calendar,
  MessageSquare,
  User,
  GraduationCap
} from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - substitua por dados reais da API
  const documentos = [
    {
      id: '1',
      tipo: 'Registro Criminal',
      status: 'pronto',
      dataEnvio: new Date('2024-01-10'),
      prazoEstimado: new Date('2024-01-20'),
      observacoes: 'Documento pronto para retirada'
    },
    {
      id: '2',
      tipo: 'Renovação Passaporte',
      status: 'em_processo',
      dataEnvio: new Date('2024-01-15'),
      prazoEstimado: new Date('2024-02-15'),
      observacoes: 'Em análise pelo consulado'
    },
    {
      id: '3',
      tipo: 'Procuração',
      status: 'pendente',
      dataEnvio: new Date('2024-01-18'),
      prazoEstimado: new Date('2024-01-25'),
      observacoes: 'Documentação adicional necessária'
    }
  ];

  const comunicados = [
    {
      id: '1',
      titulo: 'Nova Regulamentação para Estudantes',
      resumo: 'Novas diretrizes para renovação de documentos',
      data: new Date('2024-01-15'),
      prioridade: 'alta'
    },
    {
      id: '2',
      titulo: 'Calendário de Atendimento - Fevereiro',
      resumo: 'Horários especiais durante o período de férias',
      data: new Date('2024-01-12'),
      prioridade: 'media'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pronto': return 'bg-green-100 text-green-800 border-green-200';
      case 'em_processo': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pendente': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pronto': return <CheckCircle size={16} className="text-green-600" />;
      case 'em_processo': return <Clock size={16} className="text-yellow-600" />;
      case 'pendente': return <AlertTriangle size={16} className="text-red-600" />;
      default: return <FileText size={16} className="text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pronto': return 'Pronto';
      case 'em_processo': return 'Em Processo';
      case 'pendente': return 'Pendente';
      default: return 'Desconhecido';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const documentosProntos = documentos.filter(d => d.status === 'pronto').length;
  const documentosProcesso = documentos.filter(d => d.status === 'em_processo').length;
  const documentosPendentes = documentos.filter(d => d.status === 'pendente').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header de boas-vindas */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Bem-vindo, {user?.nome?.split(' ')[0]}!
            </h1>
            <p className="text-blue-100 mt-2">
              Acompanhe o status dos seus documentos e mantenha-se atualizado
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-blue-100">
                <GraduationCap size={20} />
                <span className="text-sm">{user?.universidade}</span>
              </div>
              <div className="text-sm mt-1">
                {user?.curso} - {user?.anoFrequencia}º Ano
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documentos Prontos</p>
              <p className="text-3xl font-bold text-green-600">{documentosProntos}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Em Processo</p>
              <p className="text-3xl font-bold text-yellow-600">{documentosProcesso}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendentes</p>
              <p className="text-3xl font-bold text-red-600">{documentosPendentes}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status dos Documentos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Meus Documentos</h2>
              <FileText className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {documentos.map((documento) => (
              <div key={documento.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(documento.status)}
                      <h3 className="text-sm font-medium text-gray-900">
                        {documento.tipo}
                      </h3>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-500">
                        Enviado em: {formatDate(documento.dataEnvio)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Prazo estimado: {formatDate(documento.prazoEstimado)}
                      </p>
                      {documento.observacoes && (
                        <p className="text-xs text-gray-600 mt-2">
                          {documento.observacoes}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(documento.status)}`}>
                    {getStatusText(documento.status)}
                  </span>
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

        {/* Comunicados Recentes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Comunicados</h2>
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {comunicados.map((comunicado) => (
              <div key={comunicado.id} className="p-6">
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                    comunicado.prioridade === 'alta' 
                      ? 'bg-red-500' 
                      : comunicado.prioridade === 'media' 
                      ? 'bg-yellow-500' 
                      : 'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {comunicado.titulo}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {comunicado.resumo}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatDate(comunicado.data)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Ver todos os comunicados →
            </button>
          </div>
        </div>
      </div>

      {/* Próximos Compromissos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Próximos Compromissos</h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">
                  Retirada de Documento
                </h4>
                <p className="text-sm text-gray-600">
                  Registro Criminal - Embaixada de Angola
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  22 de Janeiro, 2024 às 14:00
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Confirmado
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">
                  Prazo de Renovação
                </h4>
                <p className="text-sm text-gray-600">
                  Passaporte expira em 15 dias
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Vencimento: 05 de Fevereiro, 2024
                </p>
              </div>
              <div className="flex-shrink-0">
                <button className="text-xs bg-yellow-600 text-white px-3 py-1 rounded-full hover:bg-yellow-700 transition-colors">
                  Agendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Ações Rápidas</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="text-left">
                <h4 className="text-sm font-medium text-gray-900">
                  Solicitar Documento
                </h4>
                <p className="text-xs text-gray-600">
                  Envie uma nova solicitação
                </p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="text-left">
                <h4 className="text-sm font-medium text-gray-900">
                  Agendar Atendimento
                </h4>
                <p className="text-xs text-gray-600">
                  Marque um horário
                </p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
              <User className="h-8 w-8 text-purple-600" />
              <div className="text-left">
                <h4 className="text-sm font-medium text-gray-900">
                  Atualizar Perfil
                </h4>
                <p className="text-xs text-gray-600">
                  Edite suas informações
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;