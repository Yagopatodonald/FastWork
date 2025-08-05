import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getProfessionals } from '../services/api'

function Home() {
  const [professionals, setProfessionals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        const data = await getProfessionals()
        setProfessionals(data)
      } catch (error) {
        console.error('Erro ao carregar profissionais:', error)
      }
      setLoading(false)
    }

    loadProfessionals()
  }, [])

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
      
      <Row>
        {professionals.map((professional) => (
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
    </Container>
  )
}

export default Home