import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/Auth';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
  adminOnly?: boolean;
  badge?: number;
}

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems: MenuItem[] = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: '🏠'
    },
    {
      path: '/documentos',
      label: 'Meus Documentos',
      icon: '📄',
      badge: 3 // Exemplo: 3 documentos pendentes
    },
    {
      path: '/calendario',
      label: 'Calendário',
      icon: '📅'
    },
    {
      path: '/comunicados',
      label: 'Comunicados',
      icon: '💬',
      badge: 2 // Exemplo: 2 comunicados não lidos
    },
    // Itens apenas para admin
    {
      path: '/admin',
      label: 'Painel Admin',
      icon: '🛡️',
      adminOnly: true
    },
    {
      path: '/admin/estudantes',
      label: 'Gestão de Estudantes',
      icon: '👥',
      adminOnly: true
    },
    {
      path: '/admin/documentos',
      label: 'Gestão de Documentos',
      icon: '📦',
      adminOnly: true
    },
    {
      path: '/admin/relatorios',
      label: 'Relatórios',
      icon: '📊',
      adminOnly: true
    },
    {
      path: '/admin/notificacoes',
      label: 'Enviar Notificações',
      icon: '🔔',
      adminOnly: true
    },
    {
      path: '/admin/aprovacoes',
      label: 'Aprovações',
      icon: '✅',
      adminOnly: true,
      badge: 5 // Exemplo: 5 aprovações pendentes
    }
  ];

  // Filtrar itens baseado no role do usuário
  const filteredMenuItems = menuItems.filter(item => 
    !item.adminOnly || (item.adminOnly && isAdmin)
  );

  const isActivePath = (path: string) => {
    return location.pathname === path || 
           (path !== '/dashboard' && location.pathname.startsWith(path));
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside style={{
      background: 'white',
      width: isExpanded ? '256px' : '80px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      borderRight: '1px solid #e5e7eb',
      height: 'calc(100vh - 76px)', // Ajustar baseado na altura do header
      overflowY: 'auto',
      transition: 'width 0.3s ease',
      position: 'relative'
    }}>
      {/* Botão para expandir/recolher */}
      <button 
        onClick={toggleSidebar}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '-12px',
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        {isExpanded ? '◄' : '►'}
      </button>

      <nav style={{ padding: '1rem', height: '100%' }}>
        {/* Seção principal */}
        <div style={{ marginBottom: '2rem' }}>
          {filteredMenuItems
            .filter(item => !item.adminOnly)
            .map((item) => {
              const isActive = isActivePath(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isExpanded ? 'space-between' : 'center',
                    padding: '0.75rem',
                    marginBottom: '0.25rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    background: isActive ? '#dbeafe' : 'transparent',
                    color: isActive ? '#1d4ed8' : '#6b7280',
                    borderRight: isActive ? '2px solid #1d4ed8' : 'none'
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.color = '#1f2937';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#6b7280';
                    }
                  }}
                  title={!isExpanded ? item.label : ''}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: isExpanded ? '0.75rem' : '0' }}>
                    <span style={{ fontSize: '1.125rem' }}>{item.icon}</span>
                    {isExpanded && <span>{item.label}</span>}
                  </div>
                  {isExpanded && item.badge && item.badge > 0 && (
                    <span style={{
                      background: '#ef4444',
                      color: 'white',
                      fontSize: '0.75rem',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '9999px',
                      minWidth: '20px',
                      textAlign: 'center'
                    }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
        </div>

        {/* Seção administrativa */}
        {isAdmin && (
          <>
            {isExpanded && (
              <div style={{ paddingTop: '1rem' }}>
                <h3 style={{
                  padding: '0 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem'
                }}>
                  Administração
                </h3>
              </div>
            )}
            <div>
              {filteredMenuItems
                .filter(item => item.adminOnly)
                .map((item) => {
                  const isActive = isActivePath(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isExpanded ? 'space-between' : 'center',
                        padding: '0.75rem',
                        marginBottom: '0.25rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        background: isActive ? '#fee2e2' : 'transparent',
                        color: isActive ? '#b91c1c' : '#6b7280',
                        borderRight: isActive ? '2px solid #b91c1c' : 'none'
                      }}
                      onMouseOver={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                          e.currentTarget.style.color = '#1f2937';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#6b7280';
                        }
                      }}
                      title={!isExpanded ? item.label : ''}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: isExpanded ? '0.75rem' : '0' }}>
                        <span style={{ fontSize: '1.125rem' }}>{item.icon}</span>
                        {isExpanded && <span>{item.label}</span>}
                      </div>
                      {isExpanded && item.badge && item.badge > 0 && (
                        <span style={{
                          background: '#ef4444',
                          color: 'white',
                          fontSize: '0.75rem',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '9999px',
                          minWidth: '20px',
                          textAlign: 'center'
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
            </div>
          </>
        )}

        {/* Seção de configurações */}
        <div style={{
          paddingTop: '1rem',
          marginTop: '1rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <Link
            to="/configuracoes"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isExpanded ? '0.75rem' : '0',
              justifyContent: isExpanded ? 'flex-start' : 'center',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.2s',
              color: isActivePath('/configuracoes') ? '#1f2937' : '#6b7280',
              background: isActivePath('/configuracoes') ? '#f3f4f6' : 'transparent'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.color = '#1f2937';
            }}
            onMouseOut={(e) => {
              if (!isActivePath('/configuracoes')) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6b7280';
              }
            }}
            title={!isExpanded ? 'Configurações' : ''}
          >
            <span style={{ fontSize: '1.125rem' }}>⚙️</span>
            {isExpanded && <span>Configurações</span>}
          </Link>
        </div>
      </nav>

      {/* Informações do usuário na parte inferior */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '1rem',
        borderTop: '1px solid #e5e7eb',
        background: '#f9fafb',
        display: isExpanded ? 'block' : 'flex',
        justifyContent: 'center'
      }}>
        {isExpanded ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                background: '#3b82f6',
                color: 'white',
                borderRadius: '50%',
                fontSize: '0.875rem'
              }}>
                {user?.nome.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#1f2937',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {user?.nome}
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {user?.universidade || 'Embaixada de Angola'}
                </p>
              </div>
            </div>
            {user?.role === 'student' && (
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
                <p style={{ margin: 0 }}>Curso: {user.curso}</p>
                <p style={{ margin: 0 }}>Ano: {user.anoFrequencia}º</p>
              </div>
            )}
          </>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            background: '#3b82f6',
            color: 'white',
            borderRadius: '50%',
            fontSize: '0.875rem'
          }}>
            {user?.nome.charAt(0)}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;