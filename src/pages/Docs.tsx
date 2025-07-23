import React, { useState } from 'react';
import { useAuth } from '../context/Auth';

interface Documento {
  id: string;
  tipo: string;
  status: 'pronto' | 'em_processo' | 'pendente' | 'cancelado';
  dataEnvio: Date;
  prazoEstimado: Date;
  observacoes?: string;
  arquivos: {
    nome: string;
    url: string;
    tipo: 'pdf' | 'jpg' | 'png';
    tamanho: string;
  }[];
  historico: {
    data: Date;
    acao: string;
    observacao?: string;
  }[];
}

const DocsPage: React.FC = () => {
  const { user } = useAuth();
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [termoBusca, setTermoBusca] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [documentoSelecionado, setDocumentoSelecionado] = useState<Documento | null>(null);
  const [mostrarNovoDocumento, setMostrarNovoDocumento] = useState(false);

  // Mock data - substitua por dados reais da API
  const documentos: Documento[] = [
    {
      id: '1',
      tipo: 'Registro Criminal',
      status: 'pronto',
      dataEnvio: new Date('2024-01-10'),
      prazoEstimado: new Date('2024-01-20'),
      observacoes: 'Documento pronto para retirada na embaixada',
      arquivos: [
        {
          nome: 'registro_criminal_joao.pdf',
          url: '/docs/registro_criminal_joao.pdf',
          tipo: 'pdf',
          tamanho: '1.2 MB'
        }
      ],
      historico: [
        {
          data: new Date('2024-01-20'),
          acao: 'Documento finalizado',
          observacao: 'Pronto para retirada'
        },
        {
          data: new Date('2024-01-15'),
          acao: 'Em processamento',
          observacao: 'Enviado ao consulado'
        },
        {
          data: new Date('2024-01-10'),
          acao: 'Solicitação recebida',
          observacao: 'Documentação completa'
        }
      ]
    },
    {
      id: '2',
      tipo: 'Renovação de Passaporte',
      status: 'em_processo',
      dataEnvio: new Date('2024-01-15'),
      prazoEstimado: new Date('2024-02-15'),
      observacoes: 'Em análise pelo consulado angolano',
      arquivos: [
        {
          nome: 'passaporte_antigo.jpg',
          url: '/docs/passaporte_antigo.jpg',
          tipo: 'jpg',
          tamanho: '2.8 MB'
        },
        {
          nome: 'formulario_renovacao.pdf',
          url: '/docs/formulario_renovacao.pdf',
          tipo: 'pdf',
          tamanho: '456 KB'
        }
      ],
      historico: [
        {
          data: new Date('2024-01-18'),
          acao: 'Documentação enviada',
          observacao: 'Enviado para análise consular'
        },
        {
          data: new Date('2024-01-15'),
          acao: 'Solicitação recebida',
          observacao: 'Aguardando processamento'
        }
      ]
    },
    {
      id: '3',
      tipo: 'Procuração',
      status: 'pendente',
      dataEnvio: new Date('2024-01-18'),
      prazoEstimado: new Date('2024-01-25'),
      observacoes: 'Falta documento de identidade do procurador',
      arquivos: [
        {
          nome: 'procuracao_draft.pdf',
          url: '/docs/procuracao_draft.pdf',
          tipo: 'pdf',
          tamanho: '892 KB'
        }
      ],
      historico: [
        {
          data: new Date('2024-01-19'),
          acao: 'Documentação incompleta',
          observacao: 'Necessário BI do procurador'
        },
        {
          data: new Date('2024-01-18'),
          acao: 'Solicitação recebida',
          observacao: 'Em análise inicial'
        }
      ]
    }
  ];

  const tiposDocumento = [
    'Registro Criminal',
    'Renovação de Passaporte',
    'Procuração',
    'Certidão de Nascimento',
    'Declaração de Comparência',
    'Visto de Estudante',
    'Atestado de Matrícula'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pronto': return { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' };
      case 'em_processo': return { bg: '#fef3c7', text: '#92400e', border: '#fde68a' };
      case 'pendente': return { bg: '#fee2e2', text: '#991b1b', border: '#fecaca' };
      case 'cancelado': return { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
      default: return { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pronto': return '✅';
      case 'em_processo': return '⏳';
      case 'pendente': return '⚠️';
      default: return '📄';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pronto': return 'Pronto';
      case 'em_processo': return 'Em Processo';
      case 'pendente': return 'Pendente';
      case 'cancelado': return 'Cancelado';
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

  const documentosFiltrados = documentos.filter(doc => {
    const matchStatus = filtroStatus === 'todos' || doc.status === filtroStatus;
    const matchBusca = doc.tipo.toLowerCase().includes(termoBusca.toLowerCase());
    return matchStatus && matchBusca;
  });

  const abrirDetalhes = (documento: Documento) => {
    setDocumentoSelecionado(documento);
    setMostrarModal(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
            Meus Documentos
          </h1>
          <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0' }}>
            Acompanhe o status e gerencie seus documentos
          </p>
        </div>
        <button
          onClick={() => setMostrarNovoDocumento(true)}
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          <span>➕</span>
          <span>Solicitar Documento</span>
        </button>
      </div>

      {/* Filtros e Busca */}
      <div style={{
        background: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        padding: '1.5rem'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                🔍
              </span>
              <input
                type="text"
                placeholder="Buscar documentos..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                style={{
                  paddingLeft: '2.5rem',
                  paddingRight: '1rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  minWidth: '250px'
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#9ca3af' }}>🔽</span>
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                style={{
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.875rem'
                }}
              >
                <option value="todos">Todos os Status</option>
                <option value="pronto">Prontos</option>
                <option value="em_processo">Em Processo</option>
                <option value="pendente">Pendentes</option>
                <option value="cancelado">Cancelados</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Documentos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {documentosFiltrados.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '3rem' }}>📄</span>
            <h3 style={{
              marginTop: '1rem',
              fontSize: '1.125rem',
              fontWeight: '500',
              color: '#1f2937'
            }}>
              Nenhum documento encontrado
            </h3>
            <p style={{
              marginTop: '0.5rem',
              color: '#6b7280'
            }}>
              {termoBusca || filtroStatus !== 'todos' 
                ? 'Tente ajustar os filtros de busca'
                : 'Você ainda não possui documentos cadastrados'
              }
            </p>
          </div>
        ) : (
          documentosFiltrados.map((documento) => {
            const statusStyle = getStatusColor(documento.status);
            return (
              <div
                key={documento.id}
                style={{
                  background: 'white',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.75rem'
                      }}>
                        <span style={{ fontSize: '1.25rem' }}>
                          {getStatusIcon(documento.status)}
                        </span>
                        <h3 style={{
                          fontSize: '1.125rem',
                          fontWeight: '500',
                          color: '#1f2937',
                          margin: 0
                        }}>
                          {documento.tipo}
                        </h3>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          background: statusStyle.bg,
                          color: statusStyle.text,
                          border: `1px solid ${statusStyle.border}`
                        }}>
                          {getStatusText(documento.status)}
                        </span>
                      </div>
                      
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        marginBottom: '0.75rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>📅</span>
                          <span>Enviado: {formatDate(documento.dataEnvio)}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>⏰</span>
                          <span>Prazo: {formatDate(documento.prazoEstimado)}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>📎</span>
                          <span>{documento.arquivos.length} arquivo(s)</span>
                        </div>
                      </div>

                      {documento.observacoes && (
                        <div style={{
                          marginTop: '0.75rem',
                          padding: '0.75rem',
                          background: '#f9fafb',
                          borderRadius: '0.5rem'
                        }}>
                          <p style={{
                            fontSize: '0.875rem',
                            color: '#374151',
                            margin: 0
                          }}>
                            <strong>Observações:</strong> {documento.observacoes}
                          </p>
                        </div>
                      )}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginLeft: '1rem'
                    }}>
                      <button
                        onClick={() => abrirDetalhes(documento)}
                        style={{
                          padding: '0.5rem',
                          color: '#6b7280',
                          background: 'none',
                          border: 'none',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                          e.currentTarget.style.color = '#1f2937';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#6b7280';
                        }}
                        title="Ver detalhes"
                      >
                        👁️
                      </button>
                      {documento.status === 'pronto' && (
                        <button
                          style={{
                            padding: '0.5rem',
                            color: '#16a34a',
                            background: 'none',
                            border: 'none',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#dcfce7';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                          title="Download"
                        >
                          📥
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal de Detalhes */}
      {mostrarModal && documentoSelecionado && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          zIndex: 50
        }}>
          <div style={{
            background: 'white',
            borderRadius: '0.5rem',
            maxWidth: '32rem',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0
                }}>
                  {documentoSelecionado.tipo}
                </h2>
                <button
                  onClick={() => setMostrarModal(false)}
                  style={{
                    color: '#9ca3af',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {/* Status e Informações */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Status
                  </label>
                  <div style={{
                    marginTop: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>{getStatusIcon(documentoSelecionado.status)}</span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      ...getStatusColor(documentoSelecionado.status)
                    }}>
                      {getStatusText(documentoSelecionado.status)}
                    </span>
                  </div>
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Data de Envio
                  </label>
                  <p style={{
                    marginTop: '0.25rem',
                    fontSize: '0.875rem',
                    color: '#1f2937'
                  }}>
                    {formatDate(documentoSelecionado.dataEnvio)}
                  </p>
                </div>
              </div>

              {/* Arquivos */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.75rem'
                }}>
                  Arquivos Anexados
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {documentoSelecionado.arquivos.map((arquivo, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem',
                        background: '#f9fafb',
                        borderRadius: '0.5rem'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}>
                        <span style={{ fontSize: '1.25rem' }}>📄</span>
                        <div>
                          <p style={{
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#1f2937',
                            margin: 0
                          }}>
                            {arquivo.nome}
                          </p>
                          <p style={{
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            margin: 0
                          }}>
                            {arquivo.tamanho}
                          </p>
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <button style={{
                          padding: '0.25rem',
                          color: '#6b7280',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer'
                        }}>
                          👁️
                        </button>
                        <button style={{
                          padding: '0.25rem',
                          color: '#6b7280',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer'
                        }}>
                          📥
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Histórico */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.75rem'
                }}>
                  Histórico do Documento
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {documentoSelecionado.historico.map((item, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'start',
                      gap: '0.75rem'
                    }}>
                      <div style={{
                        flexShrink: 0,
                        width: '8px',
                        height: '8px',
                        background: '#3b82f6',
                        borderRadius: '50%',
                        marginTop: '0.5rem'
                      }}></div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#1f2937',
                          margin: 0
                        }}>
                          {item.acao}
                        </p>
                        {item.observacao && (
                          <p style={{
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            margin: '0.25rem 0 0 0'
                          }}>
                            {item.observacao}
                          </p>
                        )}
                        <p style={{
                          fontSize: '0.75rem',
                          color: '#9ca3af',
                          margin: '0.25rem 0 0 0'
                        }}>
                          {formatDate(item.data)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Novo Documento */}
      {mostrarNovoDocumento && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          zIndex: 50
        }}>
          <div style={{
            background: 'white',
            borderRadius: '0.5rem',
            maxWidth: '28rem',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0
                }}>
                  Solicitar Novo Documento
                </h2>
                <button
                  onClick={() => setMostrarNovoDocumento(false)}
                  style={{
                    color: '#9ca3af',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Tipo de Documento
                </label>
                <select style={{
                  width: '100%',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  fontSize: '0.875rem'
                }}>
                  <option value="">Selecione o tipo...</option>
                  {tiposDocumento.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Observações
                </label>
                <textarea
                  style={{
                    width: '100%',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    fontSize: '0.875rem',
                    resize: 'vertical',
                    minHeight: '100px'
                  }}
                  rows={4}
                  placeholder="Informações adicionais sobre o documento..."
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Anexar Arquivos
                </label>
                <div style={{
                  border: '2px dashed #d1d5db',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
                >
                  <span style={{ fontSize: '2rem' }}>📤</span>
                  <p style={{
                    marginTop: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    margin: '0.5rem 0 0.25rem 0'
                  }}>
                    Clique para selecionar arquivos ou arraste aqui
                  </p>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#9ca3af',
                    margin: 0
                  }}>
                    PDF, JPG, PNG até 10MB
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.75rem',
                paddingTop: '1rem'
              }}>
                <button
                  onClick={() => setMostrarNovoDocumento(false)}
                  style={{
                    padding: '0.5rem 1rem',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    background: 'white',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  Cancelar
                </button>
                <button style={{
                  padding: '0.5rem 1rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }}
                >
                  Enviar Solicitação
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocsPage;