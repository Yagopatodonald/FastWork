import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'

function MyProfessionalProfile() {
  const [professionalProfile, setProfessionalProfile] = useState(null)

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('professionalProfile') || '{}')
    setProfessionalProfile(savedProfile)
  }, [])

  if (!professionalProfile || !professionalProfile.name) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <h3>Perfil não encontrado</h3>
          <p className="text-muted">Complete seu perfil profissional primeiro.</p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card>
            <div 
              className="d-flex align-items-center justify-content-center bg-light"
              style={{ height: '300px' }}
            >
              <i className="bi bi-person-circle" style={{ fontSize: '6rem', color: '#6c757d' }}></i>
            </div>
            <Card.Body className="text-center">
              <Card.Title>{professionalProfile.name}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                {professionalProfile.profession}
              </Card.Subtitle>
              
              <div className="mb-3">
                <Badge bg="warning" text="dark" className="me-2 mb-2">
                  ⭐ Novo
                </Badge>
              </div>
              
              <div className="mb-3">
                <small className="text-muted">📍 {professionalProfile.location}</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card>
            <Card.Body>
              <h3>Sobre</h3>
              <p>{professionalProfile.description}</p>
              
              <h4 className="mt-4">Habilidades</h4>
              <div className="mb-4">
                {professionalProfile.skills && professionalProfile.skills.split(',').map((skill, index) => (
                  <Badge key={index} bg="secondary" className="me-2 mb-2">
                    {skill.trim()}
                  </Badge>
                ))}
              </div>
              
              <h4>Informações de Contato</h4>
              <p>
                <strong>Email:</strong> {professionalProfile.email}<br/>
                <strong>Telefone:</strong> {professionalProfile.phone}<br/>
                <strong>Localização:</strong> {professionalProfile.location}<br/>
                <strong>Avaliação:</strong> Novo profissional
              </p>
              
              <h4 className="mt-4">Avaliações dos Clientes</h4>
              <div className="mb-4">
                <p className="text-muted">Ainda não há avaliações para este profissional.</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default MyProfessionalProfile