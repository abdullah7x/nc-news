import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchTopics } from '../Utils/utils';
import { useState, useEffect } from 'react';
import Media from 'react-media';

const Navigation = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  return (
    <div>
      <Media
        queries={{
          small: '(max-width: 768px)',
          // medium: '(min-width: 600px) and (max-width: 1199px)',
          large: '(min-width: 768px)',
        }}
      >
        {(matches) => (
          <>
            {matches.small && (
              <Navbar bg="dark" expand={false}>
                <Container fluid>
                  <Navbar.Brand as={Link} to="/">
                    NC News
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="offcanvasNavbar" />
                  <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title id="offcanvasNavbarLabel">
                        NC News
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link className="sidenav-link" as={Link} to="/">
                          Home
                        </Nav.Link>
                        <NavDropdown
                          title="Topics"
                          id="offcanvasNavbarDropdown"
                        >
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
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            )}

            {matches.large && (
              <Navbar as="nav" bg="dark" variant="dark" fixed="top">
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
                    </NavDropdown>
                  </Nav>
                </Container>
              </Navbar>
            )}
          </>
        )}
      </Media>
    </div>
  );

  // return (
  //   <Navbar as="nav" bg="dark" variant="dark" fixed="top">
  //     <Container>
  //       <Navbar.Brand as={Link} to="/">
  //         NC News
  //       </Navbar.Brand>
  //       <Nav className="me-auto">
  //         <Nav.Link as={Link} to="/">
  //           Home
  //         </Nav.Link>
  //         <NavDropdown title="Topics" id="basic-nav-dropdown">
  //           {topics.map((topic) => {
  //             return (
  //               <NavDropdown.Item
  //                 as={Link}
  //                 to={`/articles/${topic.slug}`}
  //                 key={topic.slug}
  //               >
  //                 {topic.slug[0].toUpperCase() +
  //                   topic.slug.slice(1).toLowerCase()}
  //               </NavDropdown.Item>
  //             );
  //           })}
  //         </NavDropdown>
  //         <Nav.Link as={Link} to="/">
  //           Users
  //         </Nav.Link>
  //       </Nav>
  //     </Container>
  //   </Navbar>
  // );
};

export default Navigation;
