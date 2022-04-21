import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticle, fetchComments } from '../Utils/utils';
import { Link } from 'react-router-dom';

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [articleTopic, setArticleTopic] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchArticle(article_id).then(({ article }) => {
      setArticle(article);
      setArticleTopic(
        article.topic[0].toUpperCase() + article.topic.slice(1).toLowerCase()
      );
    });

    fetchComments(article_id).then((data) => {
      setComments(data);
    });
  }, [article_id, article]);

  return (
    <div className="article">
      <h1 className="article-page-title">{article.title}</h1>
      <h6 className="article-page-topic">
        <Link to={`/articles/${article.topic}`}>{articleTopic}</Link>
      </h6>
      <h6 className="article-page-author">{article.author}</h6>
      <h6 className="article-page-date">Created at: {article.created_at}</h6>
      <hr />
      <p className="article-page-body">{article.body}</p>
      <br />
      <h2>Comments:</h2>
      {comments.map((comment) => {
        return <h1></h1>;
      })}
    </div>
  );
};

export default Article;
