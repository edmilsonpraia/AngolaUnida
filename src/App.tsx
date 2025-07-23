import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/Auth';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Login from './pages/Login';
import Docs from './pages/Docs';
import './App.css';

// Componente para rotas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Layout para usuários logados
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  // Fechar sidebar ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!isAuthenticated) {
    return <>{children}</>;
  }
  
  return (
    <div className="app-layout">
      <Header onMobileMenuToggle={toggleMobileSidebar} />
      <div className="main-content">
        <Sidebar 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
};

// Dashboard principal
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      {/* Header de boas-vindas */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        color: 'white',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              margin: '0 0 0.5rem 0'
            }}>
              Bem-vindo, {user?.nome?.split(' ')[0]}!
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0
            }}>
              Acompanhe o status dos seus documentos e mantenha-se atualizado
            </p>
          </div>
          {user?.role === 'student' && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '0.5rem',
              padding: '1rem',
              textAlign: 'right'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.875rem'
              }}>
                🎓
                <span>{user?.universidade}</span>
              </div>
              <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {user?.curso} - {user?.anoFrequencia}º Ano
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <div className="card p-6">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                {user?.role === 'admin' ? 'Total Estudantes' : 'Documentos Prontos'}
              </p>
              <p className="text-3xl font-bold text-green-600">
                {user?.role === 'admin' ? '247' : '2'}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <span style={{ fontSize: '1.5rem' }}>
                {user?.role === 'admin' ? '👥' : '✅'}
              </span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                {user?.role === 'admin' ? 'Docs Pendentes' : 'Em Processo'}
              </p>
              <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#eab308', margin: '0.25rem 0' }}>
                {user?.role === 'admin' ? '23' : '1'}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <span style={{ fontSize: '1.5rem' }}>⏳</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                {user?.role === 'admin' ? 'Docs Prontos' : 'Pendentes'}
              </p>
              <p style={{ fontSize: '1.875rem', fontWeight: '700', color: user?.role === 'admin' ? '#16a34a' : '#dc2626', margin: '0.25rem 0' }}>
                {user?.role === 'admin' ? '89' : '0'}
              </p>
            </div>
            <div style={{
              background: user?.role === 'admin' ? '#dcfce7' : '#fee2e2',
              padding: '0.75rem',
              borderRadius: '50%'
            }}>
              <span style={{ fontSize: '1.5rem' }}>
                {user?.role === 'admin' ? '📄' : '⚠️'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Próximas ações */}
      <div className="card">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {user?.role === 'admin' ? 'Ações Urgentes' : 'Próximas Ações'}
          </h2>
        </div>
        <div className="p-6">
          {user?.role === 'admin' ? (
            // Conteúdo para admin
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">⚠️</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    5 Aprovações Pendentes
                  </h4>
                  <p className="text-sm text-gray-600">
                    Solicitações de documentos aguardando aprovação
                  </p>
                </div>
                <button className="btn-primary bg-red-600 hover:bg-red-700">
                  Revisar
                </button>
              </div>

              <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📊</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Relatório Mensal Disponível
                  </h4>
                  <p className="text-sm text-gray-600">
                    Relatório de Janeiro 2024 pronto para download
                  </p>
                </div>
                <button className="btn-primary" style={{ backgroundColor: '#f59e0b' }}>
                  Download
                </button>
              </div>
            </div>
          ) : (
            // Conteúdo para estudante
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📅</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Retirada de Documento
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  Registro Criminal - Embaixada de Angola
                </p>
                <p className="text-xs text-gray-500">
                  Hoje às 14:00
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="status-pronto px-3 py-1 rounded-full text-xs font-medium">
                  Confirmado
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Páginas temporárias (algumas serão substituídas por componentes completos)
const DocumentosPageTemp: React.FC = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-6">
      Meus Documentos
    </h1>
    <div className="card p-8 text-center">
      <span style={{ fontSize: '4rem' }}>📄</span>
      <h2 className="text-xl font-semibold text-gray-900 mt-4 mb-2">
        Página de Documentos
      </h2>
      <p className="text-gray-600">
        Esta funcionalidade será implementada em breve
      </p>
    </div>
  </div>
);

const CalendarioPage: React.FC = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-6">
      Calendário
    </h1>
    <div className="card p-8 text-center">
      <span style={{ fontSize: '4rem' }}>📅</span>
      <h2 className="text-xl font-semibold text-gray-900 mt-4 mb-2">
        Calendário de Agendamentos
      </h2>
      <p className="text-gray-600">
        Esta funcionalidade será implementada em breve
      </p>
    </div>
  </div>
);

const ComunicadosPage: React.FC = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-6">
      Comunicados
    </h1>
    <div className="card p-8 text-center">
      <span style={{ fontSize: '4rem' }}>💬</span>
      <h2 className="text-xl font-semibold text-gray-900 mt-4 mb-2">
        Comunicados da Embaixada
      </h2>
      <p className="text-gray-600">
        Esta funcionalidade será implementada em breve
      </p>
    </div>
  </div>
);

const AdminPage: React.FC = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-6">
      Painel Administrativo
    </h1>
    <div className="card p-8 text-center">
      <span style={{ fontSize: '4rem' }}>🛡️</span>
      <h2 className="text-xl font-semibold text-gray-900 mt-4 mb-2">
        Painel Administrativo
      </h2>
      <p className="text-gray-600">
        Esta funcionalidade será implementada em breve
      </p>
    </div>
  </div>
);

const ConfiguracoesPage: React.FC = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900 mb-6">
      Configurações
    </h1>
    <div className="card p-8 text-center">
      <span style={{ fontSize: '4rem' }}>⚙️</span>
      <h2 className="text-xl font-semibold text-gray-900 mt-4 mb-2">
        Configurações do Sistema
      </h2>
      <p className="text-gray-600">
        Esta funcionalidade será implementada em breve
      </p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/documentos" 
              element={
                <ProtectedRoute>
                  <Docs />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/calendario" 
              element={
                <ProtectedRoute>
                  <CalendarioPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/comunicados" 
              element={
                <ProtectedRoute>
                  <ComunicadosPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/configuracoes" 
              element={
                <ProtectedRoute>
                  <ConfiguracoesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;