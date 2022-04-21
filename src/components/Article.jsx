import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../Utils/utils';

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [articleTopic, setArticleTopic] = useState('');

  useEffect(() => {
    fetchArticle(article_id).then(({ article }) => {
      setArticle(article);
      setArticleTopic(
        article.topic[0].toUpperCase() + article.topic.slice(1).toLowerCase()
      );
    });
  }, [article_id, article]);

  return (
    <div className="article">
      <h1 className="article-page-title">{article.title}</h1>
      <h6 className="article-page-topic">
        <span>{articleTopic}</span>
      </h6>
      <h6 className="article-page-author">{article.author}</h6>
      <h6 className="article-page-date">Created at: {article.created_at}</h6>
      <hr />
      <p className="article-page-body">{article.body}</p>
    </div>
  );
};

export default Article;
