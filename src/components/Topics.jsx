import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticles } from '../Utils/utils';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Topics = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticles(topic).then((articlesFromApi) => {
      setArticles(articlesFromApi);
    });
  }, [topic]);
  return (
    <div className="article-cards">
      {articles.map((article) => {
        return (
          <div className="article-card" key={article.article_id}>
            <Card key={article.article_id}>
              <Card.Body>
                <Card.Title>
                  <Link to={`/article/${article.article_id}`}>
                    {article.title}
                  </Link>
                </Card.Title>
                <Card.Text className="article-topic">
                  {article.topic[0].toUpperCase() +
                    article.topic.slice(1).toLowerCase()}
                </Card.Text>
                <Card.Text className="article-author">
                  {article.author}
                </Card.Text>
                <Card.Text>{article.body.slice(0, 150)}...</Card.Text>
                <Card.Link
                  as={Link}
                  to={`/article/${article.article_id}`}
                  className="article-link"
                >
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

export default Topics;
