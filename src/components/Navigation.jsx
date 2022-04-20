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
    <Navbar as="nav" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          NC News
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <NavDropdown title="Topics" id="basic-nav-dropdown">
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
            {/* <NavDropdown.Item as={Link} to="/articles/coding">
              Coding
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
            {/* <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item> */}
          </NavDropdown>
          <Nav.Link as={Link} to="/">
            Users
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
