import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // API mock para demonstração
})

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
    skills: ['React', 'JavaScript', 'CSS', 'HTML']
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
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator']
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
    skills: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL']
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
    skills: ['Limpeza Geral', 'Organização', 'Produtos Ecológicos', 'Pontualidade']
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
    skills: ['Cuidados Infantis', 'Primeiros Socorros', 'Atividades Lúdicas', 'Paciência']
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
    skills: ['Instalações Elétricas', 'Manutenção', 'Segurança', 'Diagnóstico']
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
    skills: ['Culinária Brasileira', 'Doces', 'Eventos', 'Higiene Alimentar']
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
    skills: ['Paisagismo', 'Poda', 'Irrigação', 'Plantas Ornamentais']
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
    skills: ['Musculação', 'Cardio', 'Nutrição', 'Motivação']
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
    skills: ['Hidráulica', 'Reparos', 'Instalações', 'Emergências']
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
    skills: ['Matemática', 'Física', 'Vestibular', 'Didática']
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
    skills: ['Direção Defensiva', 'Pontualidade', 'Conhecimento Local', 'Cortesia']
  }
]

export const loginUser = async (credentials) => {
  // Simulação de login
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, user: { name: 'Usuário', email: credentials.email } })
    }, 1000)
  })
}

export const registerUser = async (userData) => {
  // Simulação de cadastro
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, user: { name: userData.name, email: userData.email } })
    }, 1000)
  })
}

export const getProfessionals = async () => {
  return mockProfessionals
}

export const getProfessionalById = async (id) => {
  return mockProfessionals.find(prof => prof.id === parseInt(id))
}

export const reportProfessional = async (id, reason) => {
  // Simulação de denúncia
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Denúncia enviada com sucesso' })
    }, 1000)
  })
}

export default api