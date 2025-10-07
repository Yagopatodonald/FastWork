import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getProfessionals } from '../services/api'

function Home() {
  const [professionals, setProfessionals] = useState([])
  const [filteredProfessionals, setFilteredProfessionals] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [minEvaluations, setMinEvaluations] = useState('')

  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        const data = await getProfessionals()
        console.log('Dados recebidos:', data)
        setProfessionals(data || [])
        setFilteredProfessionals(data || [])
      } catch (error) {
        console.error('Erro ao carregar profissionais:', error)
        setProfessionals([])
        setFilteredProfessionals([])
      }
      setLoading(false)
    }

    loadProfessionals()
  }, [])

  useEffect(() => {
    let filtered = professionals

    if (searchTerm) {
      filtered = filtered.filter(prof => 
        (prof.nome || prof.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prof.habilidades || prof.skills || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedRegion) {
      filtered = filtered.filter(prof => 
        (prof.regiao || prof.location || '').toLowerCase().includes(selectedRegion.toLowerCase())
      )
    }

    if (minEvaluations) {
      filtered = filtered.filter(prof => (prof.numAvaliacoes || prof.evaluationCount || 0) >= parseInt(minEvaluations))
    }

    setFilteredProfessionals(filtered)
  }, [searchTerm, selectedRegion, minEvaluations, professionals])

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">Carregando...</div>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">Profissionais Recomendados</h1>
          <p className="text-muted mb-4">
            Encontre os melhores profissionais para seus projetos
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Buscar profissionais</Form.Label>
            <InputGroup>
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Nome, profissão ou habilidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label>Região</Form.Label>
            <Form.Select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">Todas as regiões</option>
              <option value="São Paulo">São Paulo</option>
              <option value="Rio de Janeiro">Rio de Janeiro</option>
              <option value="Belo Horizonte">Belo Horizonte</option>
              <option value="Brasília">Brasília</option>
              <option value="Salvador">Salvador</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label>Mínimo de avaliações</Form.Label>
            <Form.Select
              value={minEvaluations}
              onChange={(e) => setMinEvaluations(e.target.value)}
            >
              <option value="">Qualquer quantidade</option>
              <option value="10">10+ avaliações</option>
              <option value="25">25+ avaliações</option>
              <option value="50">50+ avaliações</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      
      <Row>
        {filteredProfessionals.length === 0 ? (
          <Col className="text-center">
            <p className="text-muted">Nenhum profissional encontrado.</p>
          </Col>
        ) : (
          filteredProfessionals.map((professional) => (
          <Col md={6} lg={4} key={professional.id} className="mb-4">
            <Card className="h-100">
              <div 
                className="d-flex align-items-center justify-content-center bg-light"
                style={{ height: '200px' }}
              >
                <i className="bi bi-person-circle" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{professional.nome || professional.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Profissional
                </Card.Subtitle>
                <Card.Text className="flex-grow-1">
                  {professional.descricao || professional.description || 'Profissional qualificado'}
                </Card.Text>
                
                <div className="mb-2">
                  <Badge bg="warning" text="dark" className="me-2">
                    ⭐ {professional.rating || '5.0'}
                  </Badge>
                  <Badge bg="info" text="white">
                    {professional.numAvaliacoes || professional.evaluationCount || 0} avaliações
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <small className="text-muted">📍 {professional.regiao || professional.location}</small>
                </div>
                
                <div className="mb-3">
                  {(professional.habilidades || professional.skills || '').split(',').filter(skill => skill.trim()).slice(0, 3).map((skill, index) => (
                    <Badge key={index} bg="secondary" className="me-1 mb-1">
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  as={Link} 
                  to={`/profile/${professional.id}`}
                  variant="primary"
                  className="mt-auto"
                >
                  Ver Perfil
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))
        )}
      </Row>
    </Container>
  )
}

export default Home