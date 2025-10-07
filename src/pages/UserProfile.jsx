import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Tab, Tabs, Badge, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function UserProfile() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])
  const [recentEvaluations, setRecentEvaluations] = useState([])
  const [recentReports, setRecentReports] = useState([])


  useEffect(() => {
    // Carregar dados do localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const savedEvaluations = JSON.parse(localStorage.getItem('recentEvaluations') || '[]')
    const savedReports = JSON.parse(localStorage.getItem('recentReports') || '[]')
    
    setFavorites(savedFavorites)
    setRecentEvaluations(savedEvaluations)
    setRecentReports(savedReports)
  }, [])



  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">Meu Perfil</h1>
        </Col>
      </Row>

      <Tabs defaultActiveKey="favorites" className="mb-4">
        
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