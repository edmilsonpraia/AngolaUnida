import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/Auth';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
  adminOnly?: boolean;
  badge?: number;
}

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen = false, onMobileClose }) => {
  const { user } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detectar mudanças de tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleLinkClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Sidebar único que se adapta responsivamente */}
      <aside 
        className={`bg-white shadow border-r ${isMobile ? 'sidebar-mobile' : 'sidebar-desktop'} ${isMobileOpen && isMobile ? 'open' : ''}`}
        style={{
          width: isMobile ? '80%' : (isExpanded ? '256px' : '80px'),
          maxWidth: isMobile ? '300px' : 'none',
          height: isMobile ? '100vh' : 'calc(100vh - 76px)',
          overflowY: 'auto',
          transition: isMobile ? 'transform 0.3s ease' : 'width 0.3s ease',
          position: isMobile ? 'fixed' : 'relative',
          top: isMobile ? 0 : 'auto',
          left: isMobile ? 0 : 'auto',
          zIndex: isMobile ? 1000 : 'auto'
        }}
      >
        {/* Botão para expandir/recolher - apenas desktop */}
        {!isMobile && (
          <button 
            onClick={toggleSidebar}
            className="btn-primary"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '-12px',
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              color: '#6b7280',
              zIndex: 10,
              minHeight: 'auto',
              minWidth: 'auto',
              padding: 0
            }}
          >
            {isExpanded ? '◄' : '►'}
          </button>
        )}

        <nav className="p-4 h-full">
          {/* Seção principal */}
          <div className="mb-8">
            {filteredMenuItems
              .filter(item => !item.adminOnly)
              .map((item) => {
                const isActive = isActivePath(item.path);
                const showExpanded = isMobile || isExpanded;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`flex items-center mb-1 p-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-600 border-r-2' 
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    style={{
                      justifyContent: showExpanded ? 'space-between' : 'center',
                      borderRightColor: isActive ? '#1d4ed8' : 'transparent',
                      textDecoration: 'none'
                    }}
                    title={!showExpanded ? item.label : ''}
                  >
                    <div className="flex items-center" style={{ gap: showExpanded ? '0.75rem' : '0' }}>
                      <span style={{ fontSize: '1.125rem' }}>{item.icon}</span>
                      {showExpanded && <span>{item.label}</span>}
                    </div>
                    {showExpanded && item.badge && item.badge > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
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
              {(isMobile || isExpanded) && (
                <div className="pt-4">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Administração
                  </h3>
                </div>
              )}
              <div>
                {filteredMenuItems
                  .filter(item => item.adminOnly)
                  .map((item) => {
                    const isActive = isActivePath(item.path);
                    const showExpanded = isMobile || isExpanded;
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={handleLinkClick}
                        className={`flex items-center mb-1 p-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive 
                            ? 'angola-red text-white border-r-2' 
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        style={{
                          justifyContent: showExpanded ? 'space-between' : 'center',
                          borderRightColor: isActive ? '#b91c1c' : 'transparent',
                          textDecoration: 'none'
                        }}
                        title={!showExpanded ? item.label : ''}
                      >
                        <div className="flex items-center" style={{ gap: showExpanded ? '0.75rem' : '0' }}>
                          <span style={{ fontSize: '1.125rem' }}>{item.icon}</span>
                          {showExpanded && <span>{item.label}</span>}
                        </div>
                        {showExpanded && item.badge && item.badge > 0 && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
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
          <div className="pt-4 mt-4 border-t">
            <Link
              to="/configuracoes"
              onClick={handleLinkClick}
              className={`flex items-center p-3 rounded-lg text-sm font-medium transition-colors ${
                isActivePath('/configuracoes') 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
              style={{
                gap: (isMobile || isExpanded) ? '0.75rem' : '0',
                justifyContent: (isMobile || isExpanded) ? 'flex-start' : 'center',
                textDecoration: 'none'
              }}
              title={!(isMobile || isExpanded) ? 'Configurações' : ''}
            >
              <span style={{ fontSize: '1.125rem' }}>⚙️</span>
              {(isMobile || isExpanded) && <span>Configurações</span>}
            </Link>
          </div>
        </nav>

        {/* Informações do usuário na parte inferior */}
        <div className="bg-gray-50 border-t p-4" style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: (isMobile || isExpanded) ? 'block' : 'flex',
          justifyContent: 'center'
        }}>
          {(isMobile || isExpanded) ? (
            <>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm">
                  {user?.nome.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.nome}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {user?.universidade || 'Embaixada de Angola'}
                  </p>
                </div>
              </div>
              {user?.role === 'student' && (
                <div className="mt-2 text-xs text-gray-600">
                  <p className="mb-0">Curso: {user.curso}</p>
                  <p className="mb-0">Ano: {user.anoFrequencia}º</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm">
              {user?.nome.charAt(0)}
            </div>
          )}
        </div>
      </aside>

      {/* Overlay Mobile - só quando mobile e aberto */}
      {isMobile && isMobileOpen && (
        <div className="sidebar-overlay open" onClick={onMobileClose}></div>
      )}
    </>
  );
};

export default Sidebar;