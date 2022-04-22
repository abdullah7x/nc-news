import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticle, fetchComments, addVote } from '../Utils/utils';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [articleTopic, setArticleTopic] = useState('');
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    fetchArticle(article_id).then(({ article }) => {
      setArticle(article);
      setArticleTopic(
        article.topic[0].toUpperCase() + article.topic.slice(1).toLowerCase()
      );
      setVotes(article.votes);
    });

    fetchComments(article_id).then((data) => {
      setComments(data);
    });
  }, [article_id]);

  return (
    <div className="article">
      <h1 className="article-page-title">{article.title}</h1>
      <h6 className="article-page-topic">
        <Link to={`/articles/${article.topic}`}>{articleTopic}</Link>
      </h6>
      <h6 className="article-page-author">{article.author}</h6>
      <h6 className="article-page-date">Created at: {article.created_at}</h6>
      <button
        disabled={disabled}
        onClick={() => {
          addVote(article_id, votes, setVotes, setDisabled);
        }}
        className="vote-button"
      >
        &hearts; Likes: {votes}
      </button>
      <hr />
      <p className="article-page-body">{article.body}</p>
      <hr />
      <section className="comments-section">
        <h4>{comments.length} Comments</h4>
        {comments.map((comment) => {
          return (
            <Card body className="comment-card">
              <h6>
                {comment.author}, {comment.created_at}
              </h6>
              <p>{comment.body}</p>
              <text>Likes: {comment.votes}</text>
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default Article;
