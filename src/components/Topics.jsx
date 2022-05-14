import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticles } from '../Utils/utils';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import { TailSpin } from 'react-loading-icons';

const Topics = () => {
  const [error, setError] = useState(null);
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles(topic, sortBy)
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
        if (!articlesFromApi.length) setError('error');
      })
      .catch((err) => {
        setError('error');
      });
  }, [topic, sortBy]);

  if (error) {
    return <p className="not-found">Sorry, that topic doesn't exist</p>;
  }

  return !isLoading ? (
    <section className="home">
      <Filter setSortBy={setSortBy}></Filter>

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
    </section>
  ) : (
    <section className="home">
      <Filter setSortBy={setSortBy}></Filter>
      <div className="topic-loading">
        <TailSpin stroke="#212529" height="5em" />
      </div>
    </section>
  );
};

export default Topics;
