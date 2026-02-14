# 🚀 SPRINT 1 - PARTE 1: CONFIGURAÇÃO E UTILS
## Barbearia SaaS v1.0.0

**Como usar:** Copie cada bloco de código abaixo no Spck Editor no caminho indicado.

---

## 📁 src/utils/constants.js

```javascript
/**
 * Versão: v1.0.0
 * Arquivo: src/utils/constants.js  
 * Responsabilidade: Constantes globais da aplicação
 * Dependências: Nenhuma
 * Arquivos relacionados: Todos os arquivos do projeto
 */

// ============================================================
// BLOCO 1: Configurações da Aplicação
// ============================================================

export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Barbearia SaaS',
  URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  TRIAL_DAYS: parseInt(import.meta.env.VITE_TRIAL_DAYS) || 14,
  PLAN_PRICE: parseFloat(import.meta.env.VITE_PLAN_PRICE) || 30,
  SUPER_ADMIN_EMAIL: import.meta.env.VITE_SUPER_ADMIN_EMAIL || 'pfariasoficial@gmail.com'
};

// ============================================================
// BLOCO 2: Roles e Permissões
// ============================================================

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  TENANT_OWNER: 'owner',
  PROFESSIONAL: 'professional'
};

export const TENANT_STATUS = {
  TRIAL: 'trial',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  CANCELLED: 'cancelled'
};

// ============================================================
// BLOCO 3: Rotas da Aplicação
// ============================================================

export const ROUTES = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Super Admin
  SUPER_ADMIN_DASHBOARD: '/super-admin',
  
  // Tenant
  TENANT_DASHBOARD: '/dashboard',
  PROFESSIONALS: '/professionals',
  CLIENTS: '/clients',
  APPOINTMENTS: '/appointments',
  SETTINGS: '/settings'
};

// ============================================================
// BLOCO 4: Mensagens de Feedback
// ============================================================

export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login realizado com sucesso!',
    REGISTER: 'Cadastro realizado! Bem-vindo!',
    SAVE: 'Salvo com sucesso!',
    DELETE: 'Excluído com sucesso!',
    UPDATE: 'Atualizado com sucesso!'
  },
  ERROR: {
    GENERIC: 'Algo deu errado. Tente novamente.',
    LOGIN_FAILED: 'Email ou senha incorretos.',
    REGISTER_FAILED: 'Erro ao criar conta. Tente novamente.',
    NETWORK: 'Erro de conexão. Verifique sua internet.',
    UNAUTHORIZED: 'Você não tem permissão para esta ação.',
    NOT_FOUND: 'Recurso não encontrado.'
  },
  INFO: {
    LOADING: 'Carregando...',
    TRIAL_ENDING: days => `Seu período de teste termina em ${days} dias.`,
    SUSPENDED: 'Conta suspensa. Entre em contato.'
  }
};

// ============================================================
// BLOCO 5: Configurações de UI
// ============================================================

export const UI_CONFIG = {
  SIDEBAR_WIDTH: 280,
  HEADER_HEIGHT: 64,
  MOBILE_BREAKPOINT: 768,
  TOAST_DURATION: 3000
};
```

---

## 📁 src/utils/validators.js

```javascript
/**
 * Versão: v1.0.0
 * Arquivo: src/utils/validators.js
 * Responsabilidade: Funções de validação de dados
 * Dependências: Nenhuma
 * Arquivos relacionados: Formulários de cadastro
 */

// ============================================================
// BLOCO 1: Validação de Email
// ============================================================

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ============================================================
// BLOCO 2: Validação de Telefone (Brasil)
// ============================================================

export const isValidPhone = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
};

export const formatPhone = (phone) => {
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 11) {
    return clean.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  if (clean.length === 10) {
    return clean.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return phone;
};

// ============================================================
// BLOCO 3: Validação de Senha
// ============================================================

export const isValidPassword = (password) => {
  return password.length >= 6;
};

export const getPasswordStrength = (password) => {
  if (password.length < 6) return 'weak';
  if (password.length < 8) return 'medium';
  if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
    return 'strong';
  }
  return 'medium';
};

// ============================================================
// BLOCO 4: Validação de Nome
// ============================================================

export const isValidName = (name) => {
  return name.trim().length >= 3;
};

// ============================================================
// BLOCO 5: Validação de CNPJ
// ============================================================

export const isValidCNPJ = (cnpj) => {
  const clean = cnpj.replace(/\D/g, '');
  return clean.length === 14;
};

export const formatCNPJ = (cnpj) => {
  const clean = cnpj.replace(/\D/g, '');
  if (clean.length === 14) {
    return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  return cnpj;
};
```

---

## 📁 src/styles/globals.css

```css
/**
 * Versão: v1.0.0
 * Arquivo: src/styles/globals.css
 * Responsabilidade: Estilos globais e reset CSS
 * Dependências: Tailwind CSS
 * Arquivos relacionados: tailwind.config.js
 */

/* ============================================================ */
/* BLOCO 1: Imports do Tailwind */
/* ============================================================ */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ============================================================ */
/* BLOCO 2: Reset e Base Styles */
/* ============================================================ */

@layer base {
  * {
    @apply box-border;
  }

  html {
    @apply h-full;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    @apply h-full font-sans antialiased bg-gray-50 text-gray-900;
    overscroll-behavior: none;
  }

  #root {
    @apply h-full;
  }
}

/* ============================================================ */
/* BLOCO 3: Componentes Customizados */
/* ============================================================ */

@layer components {
  /* Botões */
  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 active:bg-primary-700 
           text-white font-medium py-3 px-6 rounded-app 
           transition-all duration-200 shadow-soft
           disabled:opacity-50 disabled:cursor-not-allowed
           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
  }

  .btn-secondary {
    @apply bg-white hover:bg-gray-50 active:bg-gray-100
           text-gray-700 font-medium py-3 px-6 rounded-app
           border border-gray-300 transition-all duration-200 shadow-soft
           disabled:opacity-50 disabled:cursor-not-allowed
           focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
  }

  .btn-danger {
    @apply bg-danger hover:bg-danger-dark active:bg-red-700
           text-white font-medium py-3 px-6 rounded-app
           transition-all duration-200 shadow-soft
           disabled:opacity-50 disabled:cursor-not-allowed
           focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2;
  }

  /* Inputs */
  .input-field {
    @apply w-full px-4 py-3 rounded-app border border-gray-300
           bg-white text-gray-900 placeholder-gray-400
           transition-all duration-200
           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
           disabled:bg-gray-100 disabled:cursor-not-allowed;
  }

  /* Cards */
  .card {
    @apply bg-white rounded-app shadow-soft p-6 border border-gray-100;
  }

  .card-interactive {
    @apply card hover:shadow-medium active:shadow-soft
           transition-all duration-200 cursor-pointer;
  }
}

/* ============================================================ */
/* BLOCO 4: Utilitários Customizados */
/* ============================================================ */

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .safe-top {
    padding-top: env(safe-area-inset-top);
  }

  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* ============================================================ */
/* BLOCO 5: Animações */
/* ============================================================ */

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* ============================================================ */
/* BLOCO 6: Mobile Optimizations */
/* ============================================================ */

@media (max-width: 768px) {
  body {
    font-size: 16px; /* Previne zoom em iOS */
  }

  input, textarea, select {
    font-size: 16px; /* Previne zoom em iOS */
  }
}
```

---

## ✅ PRÓXIMA PARTE

Continue para **SPRINT1-PARTE2-FIREBASE.md** para configuração Firebase e serviços.
