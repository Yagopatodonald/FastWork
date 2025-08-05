import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Tab, Tabs, Badge, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function UserProfile() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])
  const [recentEvaluations, setRecentEvaluations] = useState([])
  const [recentReports, setRecentReports] = useState([])
  const [professionalProfile, setProfessionalProfile] = useState({
    name: '',
    profession: '',
    description: '',
    skills: '',
    phone: '',
    email: '',
    location: ''
  })

  useEffect(() => {
    // Carregar dados do localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const savedEvaluations = JSON.parse(localStorage.getItem('recentEvaluations') || '[]')
    const savedReports = JSON.parse(localStorage.getItem('recentReports') || '[]')
    const savedProfile = JSON.parse(localStorage.getItem('professionalProfile') || '{}')
    
    setFavorites(savedFavorites)
    setRecentEvaluations(savedEvaluations)
    setRecentReports(savedReports)
    setProfessionalProfile({
      name: savedProfile.name || '',
      profession: savedProfile.profession || '',
      description: savedProfile.description || '',
      skills: savedProfile.skills || '',
      phone: savedProfile.phone || '',
      email: savedProfile.email || '',
      location: savedProfile.location || ''
    })
  }, [])

  const handleProfileChange = (field, value) => {
    setProfessionalProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    localStorage.setItem('professionalProfile', JSON.stringify(professionalProfile))
    alert('Perfil salvo com sucesso!')
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">Meu Perfil</h1>
        </Col>
      </Row>

      <Tabs defaultActiveKey="favorites" className="mb-4">
        {localStorage.getItem('wantToAdvertise') === 'true' && (
          <Tab eventKey="professional" title="Meu Perfil Profissional">
            <Row>
              <Col md={8}>
                <Card>
                  <Card.Body>
                    <h4>Customize seu Perfil Profissional</h4>
                    <Form onSubmit={handleSaveProfile}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nome Profissional</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Seu nome profissional" 
                          value={professionalProfile.name}
                          onChange={(e) => handleProfileChange('name', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Profissão</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Ex: Desenvolvedor, Designer, Faxineira..." 
                          value={professionalProfile.profession}
                          onChange={(e) => handleProfileChange('profession', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          rows={3} 
                          placeholder="Conte sobre sua experiência e especialidades..." 
                          value={professionalProfile.description}
                          onChange={(e) => handleProfileChange('description', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Habilidades (separadas por vírgula)</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Ex: React, JavaScript, CSS, HTML" 
                          value={professionalProfile.skills}
                          onChange={(e) => handleProfileChange('skills', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Telefone de Contato</Form.Label>
                        <Form.Control 
                          type="tel" 
                          placeholder="(11) 99999-9999" 
                          value={professionalProfile.phone}
                          onChange={(e) => handleProfileChange('phone', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Email de Contato</Form.Label>
                        <Form.Control 
                          type="email" 
                          placeholder="seu.email@exemplo.com" 
                          value={professionalProfile.email}
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Localização</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Cidade, Estado" 
                          value={professionalProfile.location}
                          onChange={(e) => handleProfileChange('location', e.target.value)}
                        />
                      </Form.Group>
                      
                      <Button variant="primary" type="submit">
                        Salvar Perfil
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <h5>Pré-visualização</h5>
                    <p className="text-muted">Assim seu perfil aparecerá para os clientes:</p>
                    <div className="border rounded p-3" style={{cursor: 'pointer'}} onClick={() => navigate('/my-professional-profile')}>
                      <div className="text-center mb-3">
                        <div className="bg-light rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                          <i className="bi bi-person-circle" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                        </div>
                        <h6>{professionalProfile.name || 'Seu Nome'}</h6>
                        <small className="text-muted">{professionalProfile.profession || 'Sua Profissão'}</small>
                      </div>
                      <Badge bg="warning" text="dark" className="mb-2">
                        ⭐ Novo
                      </Badge>
                      <p className="small">{professionalProfile.description || 'Sua descrição aparecerá aqui...'}</p>
                      {professionalProfile.skills && (
                        <div className="mb-2">
                          {professionalProfile.skills.split(',').map((skill, index) => (
                            <Badge key={index} bg="secondary" className="me-1 mb-1">
                              {skill.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>
        )}
        
        <Tab eventKey="favorites" title="Favoritos">
          <Row>
            {favorites.length === 0 ? (
              <Col className="text-center">
                <p className="text-muted">Nenhum profissional favoritado ainda.</p>
              </Col>
            ) : (
              favorites.map((professional) => (
                <Col md={6} lg={4} key={professional.id} className="mb-4">
                  <Card className="h-100">
                    <div 
                      className="d-flex align-items-center justify-content-center bg-light"
                      style={{ height: '200px' }}
                    >
                      <i className="bi bi-person-circle" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
                    </div>
                    <Card.Body>
                      <Card.Title>{professional.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {professional.profession}
                      </Card.Subtitle>
                      <div className="mb-2">
                        <Badge bg="warning" text="dark" className="me-2">
                          ⭐ {professional.rating}
                        </Badge>
                      </div>
                      <Button 
                        as={Link} 
                        to={`/profile/${professional.id}`}
                        variant="primary"
                        size="sm"
                      >
                        Ver Perfil
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Tab>

        <Tab eventKey="evaluations" title="Avaliações Recentes">
          <Row>
            {recentEvaluations.length === 0 ? (
              <Col className="text-center">
                <p className="text-muted">Nenhuma avaliação feita ainda.</p>
              </Col>
            ) : (
              recentEvaluations.map((evaluation, index) => (
                <Col md={12} key={index} className="mb-3">
                  <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h6>{evaluation.professionalName}</h6>
                          <Badge bg="warning" text="dark">
                            ⭐ {evaluation.rating}
                          </Badge>
                          <p className="mt-2 mb-0">{evaluation.comment}</p>
                        </div>
                        <small className="text-muted">{evaluation.date}</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Tab>

        <Tab eventKey="reports" title="Denúncias">
          <Row>
            {recentReports.length === 0 ? (
              <Col className="text-center">
                <p className="text-muted">Nenhuma denúncia feita ainda.</p>
              </Col>
            ) : (
              recentReports.map((report, index) => (
                <Col md={12} key={index} className="mb-3">
                  <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h6>{report.professionalName}</h6>
                          <Badge bg="danger">{report.reason}</Badge>
                          <p className="mt-2 mb-0">{report.description}</p>
                        </div>
                        <small className="text-muted">{report.date}</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  )
}

export default UserProfile