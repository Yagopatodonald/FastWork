import { Navbar as BootstrapNavbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <BootstrapNavbar bg="primary" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" style={{marginLeft: '0'}}>
          FastWork
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <NavDropdown title="Perfil" id="profile-dropdown">
                  <NavDropdown.Item as={Link} to="/user-profile">
                    Meu Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Sair
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                Entrar / Cadastrar
              </Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar