import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

// Interceptor para debug de erros
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// Mock data para profissionais
export const mockProfessionals = [
  {
    id: 1,
    name: 'João Silva',
    profession: 'Desenvolvedor Frontend',
    rating: 4.8,
    price: 'R$ 80/hora',
    location: 'São Paulo, SP',
    image: 'https://via.placeholder.com/150',
    description: 'Desenvolvedor com 5 anos de experiência em React e Vue.js',
    skills: ['React', 'JavaScript', 'CSS', 'HTML'],
    email: 'joao.silva@email.com',
    phone: '(11) 99999-1111',
    evaluationCount: 45,
    reviews: [
      {
        clientName: 'Carlos Mendes',
        rating: 5,
        comment: 'Excelente profissional! Entregou o projeto no prazo e com qualidade excepcional.',
        date: '15/12/2023'
      },
      {
        clientName: 'Ana Paula',
        rating: 4,
        comment: 'Muito bom trabalho, recomendo. Apenas algumas pequenas correções foram necessárias.',
        date: '10/12/2023'
      }
    ]
  },
  {
    id: 2,
    name: 'Maria Santos',
    profession: 'Designer UX/UI',
    rating: 4.9,
    price: 'R$ 90/hora',
    location: 'Rio de Janeiro, RJ',
    image: 'https://via.placeholder.com/150',
    description: 'Designer especializada em experiência do usuário e interfaces modernas',
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
    email: 'maria.santos@email.com',
    phone: '(21) 99999-2222',
    evaluationCount: 67,
    reviews: [
      {
        clientName: 'Roberto Silva',
        rating: 5,
        comment: 'Design incrível! Maria entendeu perfeitamente nossa visão e criou algo além das expectativas.',
        date: '18/12/2023'
      },
      {
        clientName: 'Fernanda Costa',
        rating: 5,
        comment: 'Profissional muito criativa e atenciosa. O resultado final ficou perfeito!',
        date: '12/12/2023'
      }
    ]
  },
  {
    id: 3,
    name: 'Pedro Costa',
    profession: 'Desenvolvedor Backend',
    rating: 4.7,
    price: 'R$ 85/hora',
    location: 'Belo Horizonte, MG',
    image: 'https://via.placeholder.com/150',
    description: 'Especialista em APIs REST e microserviços com Node.js',
    skills: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL'],
    email: 'pedro.costa@email.com',
    phone: '(31) 99999-3333',
    evaluationCount: 32
  },
  {
    id: 4,
    name: 'Ana Oliveira',
    profession: 'Faxineira',
    rating: 4.9,
    price: 'R$ 25/hora',
    location: 'São Paulo, SP',
    image: 'https://via.placeholder.com/150',
    description: 'Profissional experiente em limpeza residencial e comercial',
    skills: ['Limpeza Geral', 'Organização', 'Produtos Ecológicos', 'Pontualidade'],
    email: 'ana.oliveira@email.com',
    phone: '(11) 99999-4444',
    evaluationCount: 89,
    reviews: [
      {
        clientName: 'Marcos Pereira',
        rating: 5,
        comment: 'Ana é muito cuidadosa e deixa tudo impecável. Super pontual e confiável!',
        date: '20/12/2023'
      },
      {
        clientName: 'Julia Santos',
        rating: 5,
        comment: 'Melhor faxineira que já contratei. Muito detalhista e organizada.',
        date: '16/12/2023'
      }
    ]
  },
  {
    id: 5,
    name: 'Carla Mendes',
    profession: 'Babá',
    rating: 4.8,
    price: 'R$ 20/hora',
    location: 'Rio de Janeiro, RJ',
    image: 'https://via.placeholder.com/150',
    description: 'Cuidadora infantil com 8 anos de experiência e curso de primeiros socorros',
    skills: ['Cuidados Infantis', 'Primeiros Socorros', 'Atividades Lúdicas', 'Paciência'],
    email: 'carla.mendes@email.com',
    phone: '(21) 99999-5555',
    evaluationCount: 54
  },
  {
    id: 6,
    name: 'Roberto Lima',
    profession: 'Eletricista',
    rating: 4.6,
    price: 'R$ 60/hora',
    location: 'Brasília, DF',
    image: 'https://via.placeholder.com/150',
    description: 'Eletricista residencial e predial com 10 anos de experiência',
    skills: ['Instalações Elétricas', 'Manutenção', 'Segurança', 'Diagnóstico'],
    email: 'roberto.lima@email.com',
    phone: '(61) 99999-6666',
    evaluationCount: 23
  },
  {
    id: 7,
    name: 'Fernanda Rocha',
    profession: 'Cozinheira',
    rating: 4.7,
    price: 'R$ 35/hora',
    location: 'Salvador, BA',
    image: 'https://via.placeholder.com/150',
    description: 'Chef especializada em culinária brasileira e internacional',
    skills: ['Culinária Brasileira', 'Doces', 'Eventos', 'Higiene Alimentar'],
    email: 'fernanda.rocha@email.com',
    phone: '(71) 99999-7777',
    evaluationCount: 38
  },
  {
    id: 8,
    name: 'Carlos Pereira',
    profession: 'Jardineiro',
    rating: 4.5,
    price: 'R$ 30/hora',
    location: 'Curitiba, PR',
    image: 'https://via.placeholder.com/150',
    description: 'Paisagista e jardineiro com conhecimento em plantas ornamentais',
    skills: ['Paisagismo', 'Poda', 'Irrigação', 'Plantas Ornamentais'],
    email: 'carlos.pereira@email.com',
    phone: '(41) 99999-8888',
    evaluationCount: 15
  },
  {
    id: 9,
    name: 'Juliana Alves',
    profession: 'Personal Trainer',
    rating: 4.8,
    price: 'R$ 70/hora',
    location: 'Fortaleza, CE',
    image: 'https://via.placeholder.com/150',
    description: 'Personal trainer especializada em emagrecimento e condicionamento físico',
    skills: ['Musculação', 'Cardio', 'Nutrição', 'Motivação'],
    email: 'juliana.alves@email.com',
    phone: '(85) 99999-9999',
    evaluationCount: 72
  },
  {
    id: 10,
    name: 'Marcos Souza',
    profession: 'Encanador',
    rating: 4.4,
    price: 'R$ 55/hora',
    location: 'Porto Alegre, RS',
    image: 'https://via.placeholder.com/150',
    description: 'Encanador especializado em instalações hidráulicas e reparos',
    skills: ['Hidráulica', 'Reparos', 'Instalações', 'Emergências'],
    email: 'marcos.souza@email.com',
    phone: '(51) 99999-0000',
    evaluationCount: 28
  },
  {
    id: 11,
    name: 'Luciana Castro',
    profession: 'Professora Particular',
    rating: 4.9,
    price: 'R$ 45/hora',
    location: 'Recife, PE',
    image: 'https://via.placeholder.com/150',
    description: 'Professora de matemática e física para ensino médio e vestibular',
    skills: ['Matemática', 'Física', 'Vestibular', 'Didática'],
    email: 'luciana.castro@email.com',
    phone: '(81) 99999-1010',
    evaluationCount: 95
  },
  {
    id: 12,
    name: 'Diego Martins',
    profession: 'Motorista Particular',
    rating: 4.6,
    price: 'R$ 25/hora',
    location: 'Goiânia, GO',
    image: 'https://via.placeholder.com/150',
    description: 'Motorista experiente com conhecimento da cidade e direção defensiva',
    skills: ['Direção Defensiva', 'Pontualidade', 'Conhecimento Local', 'Cortesia'],
    email: 'diego.martins@email.com',
    phone: '(62) 99999-1212',
    evaluationCount: 41
  }
]

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    console.error('Login error:', error)
    // Fallback para quando backend não está disponível
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      // Simulação temporária
      if (credentials.email === 'admin@fastwork.com' && credentials.password === '123456') {
        return { success: true, message: 'Login realizado com sucesso (simulado)', token: 'token_admin' }
      }
      return { success: false, message: 'Email ou senha inválidos (simulado)' }
    }
    return { 
      success: false, 
      message: error.response?.data?.message || 'Erro ao conectar com o servidor' 
    }
  }
}

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData)
    return response.data
  } catch (error) {
    console.error('Register error:', error)
    // Fallback para quando backend não está disponível
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      // Simulação temporária
      return { success: true, message: 'Cadastro realizado com sucesso (simulado)', token: 'token_user' }
    }
    return { 
      success: false, 
      message: error.response?.data?.message || 'Erro ao conectar com o servidor' 
    }
  }
}

export const getProfessionals = async () => {
  try {
    const response = await api.get('/profissionais')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar profissionais:', error)
    return mockProfessionals // Fallback para dados mock
  }
}

export const getProfessionalById = async (id) => {
  try {
    const response = await api.get(`/profissionais/${id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar profissional:', error)
    return mockProfessionals.find(prof => prof.id === parseInt(id)) // Fallback
  }
}

export const reportProfessional = async (id, reason) => {
  // Simulação de denúncia
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Denúncia enviada com sucesso' })
    }, 1000)
  })
}

export const updateProfessional = async (id, data) => {
  try {
    const response = await api.put(`/profissionais/${id}`, data)
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Erro ao atualizar profissional:', error)
    return { success: false, message: 'Erro ao atualizar perfil' }
  }
}

export default api