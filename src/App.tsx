import React from 'react';
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
  
  if (!isAuthenticated) {
    return <>{children}</>;
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <div style={{
          flex: 1,
          background: '#f8fafc',
          overflowY: 'auto',
          padding: '1.5rem'
        }}>
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
        <div style={{
          background: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', margin: 0 }}>
                {user?.role === 'admin' ? 'Total Estudantes' : 'Documentos Prontos'}
              </p>
              <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#16a34a', margin: '0.25rem 0' }}>
                {user?.role === 'admin' ? '247' : '2'}
              </p>
            </div>
            <div style={{
              background: '#dcfce7',
              padding: '0.75rem',
              borderRadius: '50%'
            }}>
              <span style={{ fontSize: '1.5rem' }}>
                {user?.role === 'admin' ? '👥' : '✅'}
              </span>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', margin: 0 }}>
                {user?.role === 'admin' ? 'Docs Pendentes' : 'Em Processo'}
              </p>
              <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#eab308', margin: '0.25rem 0' }}>
                {user?.role === 'admin' ? '23' : '1'}
              </p>
            </div>
            <div style={{
              background: '#fef3c7',
              padding: '0.75rem',
              borderRadius: '50%'
            }}>
              <span style={{ fontSize: '1.5rem' }}>⏳</span>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', margin: 0 }}>
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
      <div style={{
        background: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0
          }}>
            {user?.role === 'admin' ? 'Ações Urgentes' : 'Próximas Ações'}
          </h2>
        </div>
        <div style={{ padding: '1.5rem' }}>
          {user?.role === 'admin' ? (
            // Conteúdo para admin
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: '#fef2f2',
                borderRadius: '0.5rem',
                border: '1px solid #fecaca'
              }}>
                <div style={{
                  flexShrink: 0,
                  width: '48px',
                  height: '48px',
                  background: '#dc2626',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '1.5rem', color: 'white' }}>⚠️</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937', margin: '0 0 0.25rem 0' }}>
                    5 Aprovações Pendentes
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                    Solicitações de documentos aguardando aprovação
                  </p>
                </div>
                <button style={{
                  background: '#dc2626',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}>
                  Revisar
                </button>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: '#fffbeb',
                borderRadius: '0.5rem',
                border: '1px solid #fde68a'
              }}>
                <div style={{
                  flexShrink: 0,
                  width: '48px',
                  height: '48px',
                  background: '#f59e0b',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '1.5rem', color: 'white' }}>📊</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937', margin: '0 0 0.25rem 0' }}>
                    Relatório Mensal Disponível
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                    Relatório de Janeiro 2024 pronto para download
                  </p>
                </div>
                <button style={{
                  background: '#f59e0b',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}>
                  Download
                </button>
              </div>
            </div>
          ) : (
            // Conteúdo para estudante
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              background: '#f0f9ff',
              borderRadius: '0.5rem',
              border: '1px solid #bae6fd'
            }}>
              <div style={{
                flexShrink: 0,
                width: '48px',
                height: '48px',
                background: '#3b82f6',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '1.5rem', color: 'white' }}>📅</span>
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937', margin: '0 0 0.25rem 0' }}>
                  Retirada de Documento
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>
                  Registro Criminal - Embaixada de Angola
                </p>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
                  Hoje às 14:00
                </p>
              </div>
              <div style={{ flexShrink: 0 }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  background: '#dcfce7',
                  color: '#166534'
                }}>
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
    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
      Meus Documentos
    </h1>
    <div style={{
      background: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <span style={{ fontSize: '4rem' }}>📄</span>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', margin: '1rem 0 0.5rem 0' }}>
        Página de Documentos
      </h2>
      <p style={{ color: '#6b7280', margin: 0 }}>
        Esta funcionalidade será implementada em breve
      </p>
    </div>
  </div>
);

const CalendarioPage: React.FC = () => (
  <div>
    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
      Calendário
    </h1>
    <div style={{
      background: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <span style={{ fontSize: '4rem' }}>📅</span>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', margin: '1rem 0 0.5rem 0' }}>
        Calendário de Agendamentos
      </h2>
      <p style={{ color: '#6b7280', margin: 0 }}>
        Esta funcionalidade será implementada em breve
      </p>
    </div>
  </div>
);

const ComunicadosPage: React.FC = () => (
  <div>
    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
      Comunicados
    </h1>
    <div style={{
      background: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <span style={{ fontSize: '4rem' }}>💬</span>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', margin: '1rem 0 0.5rem 0' }}>
        Comunicados da Embaixada
      </h2>
      <p style={{ color: '#6b7280', margin: 0 }}>
        Esta funcionalidade será implementada em breve
      </p>
    </div>
  </div>
);

const AdminPage: React.FC = () => (
  <div>
    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
      Painel Administrativo
    </h1>
    <div style={{
      background: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <span style={{ fontSize: '4rem' }}>🛡️</span>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', margin: '1rem 0 0.5rem 0' }}>
        Painel Administrativo
      </h2>
      <p style={{ color: '#6b7280', margin: 0 }}>
        Esta funcionalidade será implementada em breve
      </p>
    </div>
  </div>
);

const ConfiguracoesPage: React.FC = () => (
  <div>
    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
      Configurações
    </h1>
    <div style={{
      background: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <span style={{ fontSize: '4rem' }}>⚙️</span>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', margin: '1rem 0 0.5rem 0' }}>
        Configurações do Sistema
      </h2>
      <p style={{ color: '#6b7280', margin: 0 }}>
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