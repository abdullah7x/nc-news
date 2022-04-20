import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { fetchArticles } from '../Utils/utils';
import { Link } from 'react-router-dom';

const Home = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticles().then((data) => {
      setArticles(data);
    });
  });

  return (
    <div className="article-cards">
      {articles.map((article) => {
        return (
          <div className="article-card" key={article.article_id}>
            <Card key={article.article_id}>
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.body.slice(0, 150)}...</Card.Text>
                <Card.Link as={Link} to={`/articles/${article.article_id}`}>
                  Read article
                </Card.Link>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
