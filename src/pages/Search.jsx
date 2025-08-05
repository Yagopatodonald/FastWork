import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form, Badge, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getProfessionals } from '../services/api'

function Search() {
  const [professionals, setProfessionals] = useState([])
  const [filteredProfessionals, setFilteredProfessionals] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProfession, setSelectedProfession] = useState('')
  const [minRating, setMinRating] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        const data = await getProfessionals()
        setProfessionals(data)
        setFilteredProfessionals(data)
      } catch (error) {
        console.error('Erro ao carregar profissionais:', error)
      }
      setLoading(false)
    }

    loadProfessionals()
  }, [])

  useEffect(() => {
    let filtered = professionals

    if (searchTerm) {
      filtered = filtered.filter(prof => 
        prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedProfession) {
      filtered = filtered.filter(prof => 
        prof.profession.toLowerCase().includes(selectedProfession.toLowerCase())
      )
    }

    if (minRating) {
      filtered = filtered.filter(prof => prof.rating >= parseFloat(minRating))
    }

    setFilteredProfessionals(filtered)
  }, [searchTerm, selectedProfession, minRating, professionals])

  const professions = [...new Set(professionals.map(prof => prof.profession))]

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
          <h1 className="mb-4">Buscar Profissionais</h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Buscar por nome ou habilidade</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                🔍
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Digite sua busca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label>Profissão</Form.Label>
            <Form.Select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
            >
              <option value="">Todas as profissões</option>
              {professions.map((profession, index) => (
                <option key={index} value={profession}>
                  {profession}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label>Avaliação mínima</Form.Label>
            <Form.Select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            >
              <option value="">Qualquer avaliação</option>
              <option value="4.5">4.5+ estrelas</option>
              <option value="4.0">4.0+ estrelas</option>
              <option value="3.5">3.5+ estrelas</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <p className="text-muted">
            {filteredProfessionals.length} profissional(is) encontrado(s)
          </p>
        </Col>
      </Row>

      <Row>
        {filteredProfessionals.map((professional) => (
          <Col md={6} lg={4} key={professional.id} className="mb-4">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={professional.image} 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{professional.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {professional.profession}
                </Card.Subtitle>
                <Card.Text className="flex-grow-1">
                  {professional.description}
                </Card.Text>
                
                <div className="mb-2">
                  <Badge bg="warning" text="dark" className="me-2">
                    ⭐ {professional.rating}
                  </Badge>
                  <Badge bg="success">{professional.price}</Badge>
                </div>
                
                <div className="mb-3">
                  <small className="text-muted">📍 {professional.location}</small>
                </div>
                
                <div className="mb-3">
                  {professional.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} bg="secondary" className="me-1 mb-1">
                      {skill}
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
        ))}
      </Row>

      {filteredProfessionals.length === 0 && (
        <Row>
          <Col className="text-center">
            <p className="text-muted">Nenhum profissional encontrado com os filtros aplicados.</p>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default Search