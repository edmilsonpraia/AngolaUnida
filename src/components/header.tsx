import React, { useState } from 'react';
import { useAuth } from '../context/Auth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications
  const notifications = [
    {
      id: '1',
      titulo: 'Documento Pronto',
      mensagem: 'Seu Registro Criminal está pronto para retirada',
      timestamp: new Date('2024-01-15T10:30:00'),
      lido: false,
      prioridade: 'alta'
    },
    {
      id: '2',
      titulo: 'Prazo Aproximando',
      mensagem: 'Renovação do passaporte vence em 15 dias',
      timestamp: new Date('2024-01-14T15:45:00'),
      lido: false,
      prioridade: 'media'
    }
  ];

  const unreadCount = notifications.filter(n => !n.lido).length;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Agora mesmo';
    if (hours < 24) return `${hours}h atrás`;
    const days = Math.floor(hours / 24);
    return `${days}d atrás`;
  };

  return (
    <header style={{
      background: 'white',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e5e7eb',
      padding: '1rem 1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo e título */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2rem' }}>🇦🇴</span>
          <div>
            <h1 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0
            }}>
              Angola Uma Só Nação
            </h1>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              margin: 0
            }}>
              Embaixada de Angola na Rússia
            </p>
          </div>
        </div>

        {/* Ações do usuário */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Notificações */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                position: 'relative',
                padding: '0.5rem',
                color: '#6b7280',
                background: 'none',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              🔔
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: '#ef4444',
                  color: 'white',
                  fontSize: '0.75rem',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown de notificações */}
            {showNotifications && (
              <div style={{
                position: 'absolute',
                right: 0,
                marginTop: '0.5rem',
                width: '320px',
                background: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                zIndex: 50
              }}>
                <div style={{
                  padding: '1rem',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: 0
                  }}>
                    Notificações
                  </h3>
                </div>
                <div style={{ maxHeight: '384px', overflowY: 'auto' }}>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      style={{
                        padding: '1rem',
                        borderBottom: '1px solid #f3f4f6',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start'
                      }}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#1f2937',
                            margin: '0 0 0.25rem 0'
                          }}>
                            {notification.titulo}
                          </h4>
                          <p style={{
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            margin: '0 0 0.5rem 0'
                          }}>
                            {notification.mensagem}
                          </p>
                          <p style={{
                            fontSize: '0.75rem',
                            color: '#9ca3af',
                            margin: 0
                          }}>
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                        {!notification.lido && (
                          <span style={{
                            width: '8px',
                            height: '8px',
                            background: '#3b82f6',
                            borderRadius: '50%',
                            marginLeft: '0.5rem'
                          }}></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Menu do usuário */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                background: '#3b82f6',
                color: 'white',
                borderRadius: '50%'
              }}>
                {user?.nome.charAt(0)}
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#1f2937',
                  margin: 0
                }}>
                  {user?.nome}
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  margin: 0,
                  textTransform: 'capitalize'
                }}>
                  {user?.role === 'admin' ? 'Administrador' : 'Estudante'}
                </p>
              </div>
              <span style={{ color: '#6b7280' }}>▼</span>
            </button>

            {/* Dropdown do usuário */}
            {showUserMenu && (
              <div style={{
                position: 'absolute',
                right: 0,
                marginTop: '0.5rem',
                width: '192px',
                background: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                zIndex: 50
              }}>
                <div style={{ padding: '0.5rem' }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.5rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    color: '#374151',
                    background: 'none',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    👤
                    <span>Meu Perfil</span>
                  </button>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.5rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    color: '#374151',
                    background: 'none',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    ⚙️
                    <span>Configurações</span>
                  </button>
                  <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      width: '100%',
                      padding: '0.5rem',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      color: '#dc2626',
                      background: 'none',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    🚪
                    <span>Sair</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay para fechar dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 39
          }}
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;