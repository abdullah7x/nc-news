import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchTopics } from '../Utils/utils';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          NC News
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <NavDropdown title="Topics" id="collasible-nav-dropdown">
              {topics.map((topic) => {
                return (
                  <NavDropdown.Item
                    as={Link}
                    to={`/articles/${topic.slug}`}
                    key={topic.slug}
                  >
                    {topic.slug[0].toUpperCase() +
                      topic.slug.slice(1).toLowerCase()}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
