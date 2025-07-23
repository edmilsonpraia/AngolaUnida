import React, { useState } from 'react';
import { useAuth } from '../context/Auth';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
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
    <header className="bg-white shadow border-b p-4 header-mobile">
      <div className="flex items-center justify-between">
        {/* Logo e título */}
        <div className="flex items-center space-x-4">
          {/* Botão menu mobile */}
          {onMobileMenuToggle && (
            <button
              onClick={onMobileMenuToggle}
              className="menu-toggle btn-primary md:hidden"
              style={{
                background: 'none',
                color: '#6b7280',
                minHeight: 'auto',
                minWidth: 'auto',
                padding: '0.5rem'
              }}
            >
              ☰
            </button>
          )}
          
          <span style={{ fontSize: '2rem' }}>🇦🇴</span>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Angola Uma Só Nação
            </h1>
            <p className="text-sm text-gray-500">
              Embaixada de Angola na Rússia
            </p>
          </div>
        </div>

        {/* Ações do usuário */}
        <div className="flex items-center space-x-4">
          {/* Notificações */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="btn-primary"
              style={{
                position: 'relative',
                padding: '0.5rem',
                color: '#6b7280',
                background: 'none',
                borderRadius: '50%',
                minHeight: 'auto',
                minWidth: 'auto'
              }}
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
              <div className="card" style={{
                position: 'absolute',
                right: 0,
                marginTop: '0.5rem',
                width: 'min(320px, calc(100vw - 2rem))',
                maxWidth: '320px',
                zIndex: 50
              }}>
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Notificações
                  </h3>
                </div>
                <div style={{ maxHeight: '384px', overflowY: 'auto' }}>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b hover:bg-gray-100 transition-colors"
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="flex justify-between items-start">
                        <div style={{ flex: 1 }}>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">
                            {notification.titulo}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.mensagem}
                          </p>
                          <p className="text-xs text-gray-500">
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
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full">
                {user?.nome.charAt(0)}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.nome}
                </p>
                <p className="text-xs text-gray-600 text-transform-capitalize">
                  {user?.role === 'admin' ? 'Administrador' : 'Estudante'}
                </p>
              </div>
              <span className="text-gray-500 hidden md:block">▼</span>
            </button>

            {/* Dropdown do usuário */}
            {showUserMenu && (
              <div className="card" style={{
                position: 'absolute',
                right: 0,
                marginTop: '0.5rem',
                width: 'min(192px, calc(100vw - 2rem))',
                maxWidth: '192px',
                zIndex: 50
              }}>
                <div className="p-2">
                  <button className="flex items-center space-x-2 w-full p-2 text-left text-sm text-gray-700 rounded hover:bg-gray-100 transition-colors">
                    <span>👤</span>
                    <span>Meu Perfil</span>
                  </button>
                  <button className="flex items-center space-x-2 w-full p-2 text-left text-sm text-gray-700 rounded hover:bg-gray-100 transition-colors">
                    <span>⚙️</span>
                    <span>Configurações</span>
                  </button>
                  <hr className="my-2 border-t" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full p-2 text-left text-sm text-red-600 rounded hover:bg-red-50 transition-colors"
                  >
                    <span>🚪</span>
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