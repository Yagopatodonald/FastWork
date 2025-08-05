import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { getProfessionalById, reportProfessional } from '../services/api'

function Profile() {
  const { id } = useParams()
  const [professional, setProfessional] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportSuccess, setReportSuccess] = useState(false)
  const [reportLoading, setReportLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  useEffect(() => {
    const loadProfessional = async () => {
      try {
        const data = await getProfessionalById(id)
        setProfessional(data)
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
        setReportSuccess(true)
        setShowReportModal(false)
        reset()
        setTimeout(() => setReportSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Erro ao enviar denúncia:', error)
    }
    setReportLoading(false)
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
                <Badge bg="success" className="mb-2">{professional.price}</Badge>
              </div>
              
              <div className="mb-3">
                <small className="text-muted">📍 {professional.location}</small>
              </div>
              
              <Button variant="primary" className="w-100 mb-2">
                Contratar
              </Button>
              
              <Button 
                variant="outline-danger" 
                className="w-100"
                onClick={() => setShowReportModal(true)}
              >
                🚨 Denunciar
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
                <strong>Localização:</strong> {professional.location}<br/>
                <strong>Valor:</strong> {professional.price}<br/>
                <strong>Avaliação:</strong> {professional.rating}/5.0
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal de Denúncia */}
      <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Denunciar Profissional</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(handleReport)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Motivo da denúncia</Form.Label>
              <Form.Select
                {...register('reason', { required: 'Selecione um motivo' })}
                isInvalid={!!errors.reason}
              >
                <option value="">Selecione um motivo</option>
                <option value="comportamento_inadequado">Comportamento inadequado</option>
                <option value="servico_nao_entregue">Serviço não entregue</option>
                <option value="cobranca_indevida">Cobrança indevida</option>
                <option value="perfil_falso">Perfil falso</option>
                <option value="outros">Outros</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.reason?.message}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Descrição detalhada (opcional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register('description')}
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
    </Container>
  )
}

export default Profile