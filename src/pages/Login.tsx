import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

// Temporariamente sem ícones até instalar lucide-react
// import { Eye, EyeOff, Mail, Lock, User, Phone, GraduationCap, MapPin, Calendar } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
  nome: string;
  bi: string;
  telefone: string;
  universidade: string;
  curso: string;
  cidade: string;
  anoFrequencia: number;
}

const Login: React.FC = () => {
  const { login, register, isAuthenticated, loading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    nome: '',
    bi: '',
    telefone: '',
    universidade: '',
    curso: '',
    cidade: '',
    anoFrequencia: 1
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  // Redirecionar se já estiver logado
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!isLoginMode) {
      if (!formData.nome) {
        newErrors.nome = 'Nome é obrigatório';
      }

      if (!formData.bi) {
        newErrors.bi = 'Bilhete de Identidade é obrigatório';
      } else if (!/^\d{9}[A-Z]{2}\d{3}$/.test(formData.bi)) {
        newErrors.bi = 'Formato do BI inválido (ex: 123456789BA000)';
      }

      if (!formData.telefone) {
        newErrors.telefone = 'Telefone é obrigatório';
      }

      if (!formData.universidade) {
        newErrors.universidade = 'Universidade é obrigatória';
      }

      if (!formData.curso) {
        newErrors.curso = 'Curso é obrigatório';
      }

      if (!formData.cidade) {
        newErrors.cidade = 'Cidade é obrigatória';
      }

      if (!formData.anoFrequencia || formData.anoFrequencia < 1 || formData.anoFrequencia > 6) {
        newErrors.anoFrequencia = 'Ano de frequência deve estar entre 1 e 6';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    try {
      let success = false;
      
      if (isLoginMode) {
        success = await login(formData.email, formData.password);
      } else {
        success = await register({
          nome: formData.nome,
          email: formData.email,
          password: formData.password,
          bi: formData.bi,
          telefone: formData.telefone,
          universidade: formData.universidade,
          curso: formData.curso,
          cidade: formData.cidade,
          anoFrequencia: formData.anoFrequencia
        });
      }

      if (!success) {
        setSubmitError(
          isLoginMode 
            ? 'Credenciais inválidas. Tente novamente.' 
            : 'Erro ao criar conta. Tente novamente.'
        );
      }
    } catch (error) {
      setSubmitError('Erro de conexão. Tente novamente mais tarde.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: LoginFormData) => ({
      ...prev,
      [name]: name === 'anoFrequencia' ? parseInt(value) || 1 : value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors((prev: Record<string, string>) => ({ ...prev, [name]: '' }));
    }
  };

  const universidadesRussia = [
    'Universidade de Moscou (MSU)',
    'Universidade Técnica Estatal de Moscou',
    'Universidade de São Petersburgo',
    'Instituto de Física e Tecnologia de Moscou',
    'Universidade de Amizade dos Povos da Rússia',
    'Universidade Técnica Estatal Bauman de Moscou',
    'Universidade Nacional de Pesquisa de Tomsk',
    'Universidade Federal de Kazan',
    'Outras'
  ];

  const cidadesRussia = [
    'Moscou',
    'São Petersburgo',
    'Novosibirsk',
    'Yekaterinburg',
    'Nizhny Novgorod',
    'Kazan',
    'Chelyabinsk',
    'Omsk',
    'Samara',
    'Rostov-on-Don',
    'Outras'
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ce1126, #ffcd00, #000)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '28rem', width: '100%' }}>
        <div style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
          {/* Logo e título */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ margin: '0 auto', height: '4rem', width: '4rem', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <span style={{ fontSize: '2rem' }}>🇦🇴</span>
            </div>
            <h2 style={{ marginTop: '1rem', fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>
              Angola Uma Só Nação
            </h2>
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
              Embaixada de Angola na Rússia
            </p>
          </div>

          {/* Toggle entre Login e Registro */}
          <div style={{ display: 'flex', borderRadius: '0.5rem', background: '#f3f4f6', padding: '0.25rem', marginBottom: '1.5rem' }}>
            <button
              type="button"
              onClick={() => setIsLoginMode(true)}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                background: isLoginMode ? 'white' : 'transparent',
                color: isLoginMode ? '#111827' : '#6b7280'
              }}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setIsLoginMode(false)}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                background: !isLoginMode ? 'white' : 'transparent',
                color: !isLoginMode ? '#111827' : '#6b7280'
              }}
            >
              Registrar
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Campos de registro */}
            {!isLoginMode && (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                    Nome Completo
                  </label>
                  <input
                    name="nome"
                    type="text"
                    value={formData.nome}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      border: errors.nome ? '1px solid #ef4444' : '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                    placeholder="Seu nome completo"
                  />
                  {errors.nome && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.nome}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                    Bilhete de Identidade
                  </label>
                  <input
                    name="bi"
                    type="text"
                    value={formData.bi}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      border: errors.bi ? '1px solid #ef4444' : '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                    placeholder="123456789BA000"
                  />
                  {errors.bi && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.bi}</p>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                    Telefone
                  </label>
                  <input
                    name="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      border: errors.telefone ? '1px solid #ef4444' : '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                    placeholder="+7 (xxx) xxx-xxxx"
                  />
                  {errors.telefone && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.telefone}</p>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                      Universidade
                    </label>
                    <select
                      name="universidade"
                      value={formData.universidade}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        border: errors.universidade ? '1px solid #ef4444' : '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      <option value="">Selecione...</option>
                      {universidadesRussia.map(uni => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                    {errors.universidade && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.universidade}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                      Cidade
                    </label>
                    <select
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        border: errors.cidade ? '1px solid #ef4444' : '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      <option value="">Selecione...</option>
                      {cidadesRussia.map(cidade => (
                        <option key={cidade} value={cidade}>{cidade}</option>
                      ))}
                    </select>
                    {errors.cidade && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.cidade}</p>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                      Curso
                    </label>
                    <input
                      name="curso"
                      type="text"
                      value={formData.curso}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        border: errors.curso ? '1px solid #ef4444' : '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                      placeholder="Ex: Engenharia Informática"
                    />
                    {errors.curso && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.curso}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                      Ano
                    </label>
                    <select
                      name="anoFrequencia"
                      value={formData.anoFrequencia}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        border: errors.anoFrequencia ? '1px solid #ef4444' : '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6].map(ano => (
                        <option key={ano} value={ano}>{ano}º Ano</option>
                      ))}
                    </select>
                    {errors.anoFrequencia && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.anoFrequencia}</p>}
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                E-mail
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  border: errors.email ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
                placeholder="seu@email.com"
              />
              {errors.email && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.email}</p>}
            </div>

            {/* Senha */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
                Senha
              </label>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  border: errors.password ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
                placeholder="Sua senha"
              />
              {errors.password && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#ef4444' }}>{errors.password}</p>}
            </div>

            {/* Erro de submissão */}
            {submitError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.375rem', padding: '0.75rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#991b1b' }}>{submitError}</p>
              </div>
            )}

            {/* Botão de submissão */}
            <button
              type="submit"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'white',
                background: '#2563eb',
                cursor: 'pointer'
              }}
            >
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '16px', height: '16px', border: '2px solid #fff', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px' }}></div>
                  {isLoginMode ? 'Entrando...' : 'Registrando...'}
                </div>
              ) : (
                isLoginMode ? 'Entrar' : 'Criar Conta'
              )}
            </button>
          </form>

          {/* Credenciais de teste */}
          {isLoginMode && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Credenciais de Teste:</h4>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                <p><strong>Admin:</strong> admin@embaixada-angola.ru / 123456</p>
                <p><strong>Estudante:</strong> joao.silva@estudante.com / 123456</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;