# FastWork - Catálogo de Profissionais

Um site web desenvolvido em ReactJS para catalogar profissionais freelancers.

## Funcionalidades

- **Autenticação**: Página de login e cadastro
- **Página Inicial**: Lista de profissionais recomendados
- **Busca**: Sistema de busca com filtros por profissão, avaliação e habilidades
- **Perfil Detalhado**: Visualização completa do perfil do profissional
- **Sistema de Denúncia**: Botão para reportar profissionais

## Tecnologias Utilizadas

- ReactJS 18
- Vite
- React Router Dom
- Axios
- React Hook Form
- Bootstrap 5
- React Bootstrap

## Como executar

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto:
```bash
npm run dev
```

3. Acesse http://localhost:5173

## Estrutura do Projeto

```
src/
├── components/
│   └── Navbar.jsx
├── pages/
│   ├── Login.jsx
│   ├── Home.jsx
│   ├── Search.jsx
│   └── Profile.jsx
├── services/
│   └── api.js
├── App.jsx
└── main.jsx
```

## Funcionalidades Implementadas

### Autenticação
- Login e cadastro com validação de formulários
- Proteção de rotas privadas
- Simulação de autenticação

### Catálogo de Profissionais
- Listagem de profissionais com informações básicas
- Cards responsivos com foto, nome, profissão, avaliação e preço
- Navegação para perfil detalhado

### Sistema de Busca
- Busca por nome, profissão ou habilidades
- Filtros por profissão e avaliação mínima
- Resultados em tempo real

### Perfil Detalhado
- Informações completas do profissional
- Lista de habilidades
- Botão de contratação
- Sistema de denúncia com modal

### Sistema de Denúncia
- Modal com formulário de denúncia
- Categorias predefinidas de motivos
- Campo opcional para descrição detalhada
- Feedback de sucesso após envio