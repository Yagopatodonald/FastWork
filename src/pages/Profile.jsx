import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { getProfessionalById, reportProfessional } from '../services/api'

function Profile({ isAuthenticated }) {
  const { id } = useParams()
  const [professional, setProfessional] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showEvaluationModal, setShowEvaluationModal] = useState(false)
  const [reportSuccess, setReportSuccess] = useState(false)
  const [evaluationSuccess, setEvaluationSuccess] = useState(false)
  const [reportLoading, setReportLoading] = useState(false)
  const [evaluationLoading, setEvaluationLoading] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const { register: reportRegister, handleSubmit: handleReportSubmit, formState: { errors: reportErrors }, reset: resetReport } = useForm()
  const { register: evaluationRegister, handleSubmit: handleEvaluationSubmit, formState: { errors: evaluationErrors }, reset: resetEvaluation } = useForm()

  useEffect(() => {
    const loadProfessional = async () => {
      try {
        const data = await getProfessionalById(id)
        setProfessional(data)
        
        // Verificar se está favoritado
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        setIsFavorited(favorites.some(fav => fav.id === data.id))
      } catch (error) {
        console.error('Erro ao carregar profissional:', error)
      }
      setLoading(false)
    }

    loadProfessional()
  }, [id])

  const handleReport = async (data) => {
    setReportLoading(true)
    try {
      const response = await reportProfessional(id, data.reason)
      if (response.success) {
        // Salvar no localStorage
        const reports = JSON.parse(localStorage.getItem('recentReports') || '[]')
        reports.unshift({
          professionalName: professional.name,
          reason: data.reason,
          description: data.description,
          date: new Date().toLocaleDateString()
        })
        localStorage.setItem('recentReports', JSON.stringify(reports.slice(0, 10)))
        
        setReportSuccess(true)
        setShowReportModal(false)
        resetReport()
        setTimeout(() => setReportSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Erro ao enviar denúncia:', error)
    }
    setReportLoading(false)
  }

  const handleEvaluation = async (data) => {
    setEvaluationLoading(true)
    try {
      // Simular envio da avaliação
      const evaluations = JSON.parse(localStorage.getItem('recentEvaluations') || '[]')
      evaluations.unshift({
        professionalName: professional.name,
        rating: data.rating,
        comment: data.comment,
        date: new Date().toLocaleDateString()
      })
      localStorage.setItem('recentEvaluations', JSON.stringify(evaluations.slice(0, 10)))
      
      setEvaluationSuccess(true)
      setShowEvaluationModal(false)
      resetEvaluation()
      setTimeout(() => setEvaluationSuccess(false), 5000)
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error)
    }
    setEvaluationLoading(false)
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    
    if (isFavorited) {
      const updatedFavorites = favorites.filter(fav => fav.id !== professional.id)
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      setIsFavorited(false)
    } else {
      favorites.push(professional)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      setIsFavorited(true)
    }
  }

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">Carregando...</div>
      </Container>
    )
  }

  if (!professional) {
    return (
      <Container className="mt-4">
        <div className="text-center">Profissional não encontrado</div>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      {reportSuccess && (
        <Alert variant="success" className="mb-4">
          Denúncia enviada com sucesso! Nossa equipe irá analisar o caso.
        </Alert>
      )}
      
      {evaluationSuccess && (
        <Alert variant="success" className="mb-4">
          Avaliação enviada com sucesso!
        </Alert>
      )}

      <Row>
        <Col md={4}>
          <Card>
            <Card.Img 
              variant="top" 
              src={professional.image} 
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <Card.Body className="text-center">
              <Card.Title>{professional.name}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                {professional.profession}
              </Card.Subtitle>
              
              <div className="mb-3">
                <Badge bg="warning" text="dark" className="me-2 mb-2">
                  ⭐ {professional.rating}
                </Badge>
              </div>
              
              <div className="mb-3">
                <small className="text-muted">📍 {professional.location}</small>
              </div>
              
              <Button 
                variant="primary" 
                className="w-100 mb-2"
                onClick={() => setShowEvaluationModal(true)}
                disabled={!isAuthenticated}
              >
                {isAuthenticated ? 'Avaliar' : 'Faça login para avaliar'}
              </Button>
              
              <Button 
                variant="outline-warning" 
                className="w-100 mb-2"
                onClick={() => toggleFavorite()}
                disabled={!isAuthenticated}
              >
                {isAuthenticated ? 
                  (isFavorited ? '♥ Remover dos Favoritos' : '♡ Adicionar aos Favoritos') :
                  'Faça login para favoritar'
                }
              </Button>
              
              <Button 
                variant="outline-danger" 
                className="w-100"
                onClick={() => setShowReportModal(true)}
                disabled={!isAuthenticated}
              >
                {isAuthenticated ? '🚨 Denunciar' : 'Faça login para denunciar'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card>
            <Card.Body>
              <h3>Sobre</h3>
              <p>{professional.description}</p>
              
              <h4 className="mt-4">Habilidades</h4>
              <div className="mb-4">
                {professional.skills.map((skill, index) => (
                  <Badge key={index} bg="secondary" className="me-2 mb-2">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <h4>Informações de Contato</h4>
              <p>
                <strong>Email:</strong> {professional.email}<br/>
                <strong>Telefone:</strong> {professional.phone}<br/>
                <strong>Localização:</strong> {professional.location}<br/>
                <strong>Avaliação:</strong> {professional.rating}/5.0
              </p>
              
              <h4 className="mt-4">Avaliações dos Clientes</h4>
              <div className="mb-4">
                {professional.reviews && professional.reviews.length > 0 ? (
                  professional.reviews.map((review, index) => (
                    <Card key={index} className="mb-3">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">{review.clientName}</h6>
                            <div className="mb-2">
                              <Badge bg="warning" text="dark">
                                ⭐ {review.rating}
                              </Badge>
                            </div>
                            <p className="mb-0">{review.comment}</p>
                          </div>
                          <small className="text-muted">{review.date}</small>
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted">Ainda não há avaliações para este profissional.</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal de Denúncia */}
      <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Denunciar Profissional</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleReportSubmit(handleReport)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Motivo da denúncia</Form.Label>
              <Form.Select
                {...reportRegister('reason', { required: 'Selecione um motivo' })}
                isInvalid={!!reportErrors.reason}
              >
                <option value="">Selecione um motivo</option>
                <option value="comportamento_inadequado">Comportamento inadequado</option>
                <option value="servico_nao_entregue">Serviço não entregue</option>
                <option value="cobranca_indevida">Cobrança indevida</option>
                <option value="perfil_falso">Perfil falso</option>
                <option value="outros">Outros</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {reportErrors.reason?.message}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Descrição detalhada (opcional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...reportRegister('description')}
                placeholder="Descreva o problema em detalhes..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={() => setShowReportModal(false)}
              disabled={reportLoading}
            >
              Cancelar
            </Button>
            <Button 
              variant="danger" 
              type="submit"
              disabled={reportLoading}
            >
              {reportLoading ? 'Enviando...' : 'Enviar Denúncia'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal de Avaliação */}
      <Modal show={showEvaluationModal} onHide={() => setShowEvaluationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Avaliar Profissional</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEvaluationSubmit(handleEvaluation)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Avaliação</Form.Label>
              <Form.Select
                {...evaluationRegister('rating', { required: 'Selecione uma avaliação' })}
                isInvalid={!!evaluationErrors.rating}
              >
                <option value="">Selecione uma nota</option>
                <option value="5">⭐⭐⭐⭐⭐ (5 estrelas)</option>
                <option value="4">⭐⭐⭐⭐ (4 estrelas)</option>
                <option value="3">⭐⭐⭐ (3 estrelas)</option>
                <option value="2">⭐⭐ (2 estrelas)</option>
                <option value="1">⭐ (1 estrela)</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {evaluationErrors.rating?.message}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Comentário (opcional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...evaluationRegister('comment')}
                placeholder="Conte como foi sua experiência..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={() => setShowEvaluationModal(false)}
              disabled={evaluationLoading}
            >
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={evaluationLoading}
            >
              {evaluationLoading ? 'Enviando...' : 'Enviar Avaliação'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default Profile