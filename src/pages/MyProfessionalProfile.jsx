import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Button, Form, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { updateProfessional } from '../services/api'

function MyProfessionalProfile() {
  const [professional, setProfessional] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  useEffect(() => {
    // Verificar se usuário logado é profissional
    const userType = localStorage.getItem('userType')
    const userEmail = localStorage.getItem('userEmail')
    
    if (userType !== 'PROFISSIONAL') {
      setProfessional(null)
      return
    }
    
    // Buscar dados do profissional logado
    const loadProfessional = async () => {
      try {
        // Por enquanto, usar dados do localStorage até implementar busca por email
        const savedData = localStorage.getItem('professionalData')
        if (savedData) {
          const data = JSON.parse(savedData)
          setProfessional(data)
          reset(data)
        } else {
          // Dados padrão se não houver dados salvos
          const defaultData = {
            id: Date.now(), // ID temporário
            nome: '',
            email: userEmail || '',
            telefone: '',
            regiao: '',
            habilidades: '',
            descricao: '',
            numAvaliacoes: 0
          }
          setProfessional(defaultData)
          reset(defaultData)
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }
    
    loadProfessional()
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    setError('')
    try {
      const result = await updateProfessional(professional.id, data)
      if (result.success) {
        setProfessional({ ...professional, ...data })
        setSuccess(true)
        setIsEditing(false)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Erro ao atualizar perfil')
    }
    setLoading(false)
  }

  if (!professional) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <h3>Acesso Negado</h3>
          <p className="text-muted">Esta página é apenas para profissionais cadastrados.</p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      {success && (
        <Alert variant="success" className="mb-4">
          Perfil atualizado com sucesso!
        </Alert>
      )}
      
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

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
              <Card.Title>{professional.nome}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                Profissional
              </Card.Subtitle>
              
              <div className="mb-3">
                <Badge bg="info" text="white">
                  {professional.numAvaliacoes} avaliações
                </Badge>
              </div>
              
              <div className="mb-3">
                <small className="text-muted">📍 {professional.regiao}</small>
              </div>
              
              <Button 
                variant={isEditing ? "success" : "primary"}
                className="w-100"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancelar" : "Editar Perfil"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card>
            <Card.Body>
              {isEditing ? (
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('nome', { required: 'Nome é obrigatório' })}
                      isInvalid={!!errors.nome}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nome?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('telefone')}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Região</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('regiao', { required: 'Região é obrigatória' })}
                      isInvalid={!!errors.regiao}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.regiao?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Habilidades (separadas por vírgula)</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('habilidades', { required: 'Habilidades são obrigatórias' })}
                      isInvalid={!!errors.habilidades}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.habilidades?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      {...register('descricao')}
                    />
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </Form>
              ) : (
                <>
                  <h3>Sobre</h3>
                  <p>{professional.descricao || 'Profissional qualificado'}</p>
                  
                  <h4 className="mt-4">Habilidades</h4>
                  <div className="mb-4">
                    {professional.habilidades.split(',').map((skill, index) => (
                      <Badge key={index} bg="secondary" className="me-2 mb-2">
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>
                  
                  <h4>Informações de Contato</h4>
                  <p>
                    <strong>Email:</strong> {professional.email}<br/>
                    <strong>Telefone:</strong> {professional.telefone || 'Não informado'}<br/>
                    <strong>Localização:</strong> {professional.regiao}<br/>
                    <strong>Avaliações:</strong> {professional.numAvaliacoes}
                  </p>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default MyProfessionalProfile