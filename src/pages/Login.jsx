import { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Tab, Tabs } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { loginUser, registerUser } from '../services/api'

function Login({ setIsAuthenticated }) {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('login')
  
  const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm()
  const { register: signupRegister, handleSubmit: handleSignupSubmit, formState: { errors: signupErrors } } = useForm()

  const onLogin = async (data) => {
    setLoading(true)
    try {
      const response = await loginUser(data)
      if (response.success) {
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Erro no login:', error)
    }
    setLoading(false)
  }

  const onSignup = async (data) => {
    setLoading(true)
    try {
      const response = await registerUser(data)
      if (response.success) {
        // Salvar se quer se divulgar
        if (data.wantToAdvertise) {
          localStorage.setItem('wantToAdvertise', 'true')
        }
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Erro no cadastro:', error)
    }
    setLoading(false)
  }

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">FastWork</h2>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3"
              >
                <Tab eventKey="login" title="Login">
                  <Form onSubmit={handleLoginSubmit(onLogin)}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        {...loginRegister('email', { required: 'Email é obrigatório' })}
                        isInvalid={!!loginErrors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {loginErrors.email?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Senha</Form.Label>
                      <Form.Control
                        type="password"
                        {...loginRegister('password', { required: 'Senha é obrigatória' })}
                        isInvalid={!!loginErrors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {loginErrors.password?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="w-100"
                      disabled={loading}
                    >
                      {loading ? 'Entrando...' : 'Entrar'}
                    </Button>
                  </Form>
                </Tab>
                
                <Tab eventKey="signup" title="Cadastro">
                  <Form onSubmit={handleSignupSubmit(onSignup)}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        {...signupRegister('name', { required: 'Nome é obrigatório' })}
                        isInvalid={!!signupErrors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {signupErrors.name?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        {...signupRegister('email', { required: 'Email é obrigatório' })}
                        isInvalid={!!signupErrors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {signupErrors.email?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Senha</Form.Label>
                      <Form.Control
                        type="password"
                        {...signupRegister('password', { required: 'Senha é obrigatória' })}
                        isInvalid={!!signupErrors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {signupErrors.password?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Gostaria de me divulgar como profissional"
                        {...signupRegister('wantToAdvertise')}
                      />
                    </Form.Group>
                    
                    <Button 
                      variant="success" 
                      type="submit" 
                      className="w-100"
                      disabled={loading}
                    >
                      {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </Button>
                  </Form>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login