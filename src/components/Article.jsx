import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchArticle,
  fetchComments,
  addVote,
  postComment,
  deleteComment,
} from '../Utils/utils';
import { Link } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';

const Article = () => {
  const [error, setError] = useState(null);
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [articleTopic, setArticleTopic] = useState('');
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const prevComments = [...comments];

    setComments((currComments) => {
      return [
        {
          author: 'guest',
          created_at: new Date().toString(),
          body: newComment,
          votes: 0,
          comment_id: 'test-comment',
        },
        ...currComments,
      ];
    });

    setNewComment('');

    postComment(article_id, newComment, prevComments, setComments);
  };

  useEffect(() => {
    fetchArticle(article_id)
      .then(({ article }) => {
        setArticle(article);
        setArticleTopic(
          article.topic[0].toUpperCase() + article.topic.slice(1).toLowerCase()
        );
        setVotes(article.votes);
      })
      .catch((err) => {
        setError('error');
      });

    fetchComments(article_id)
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        setError('error');
      });
  }, [article_id]);

  if (error) {
    return <p className="not-found">Sorry, we couldn't find that article</p>;
  }

  return (
    <section className="home">
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

          <Form onSubmit={handleSubmit}>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Let's hear your opinion!"
              value={newComment}
              required
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
            />
            <div className="comment-bottom">
              <Form.Check
                inline="true"
                type="checkbox"
                label="I want to comment as a guest"
                required
              />
              <Button className="form-button" variant="primary" type="submit">
                Submit comment
              </Button>
            </div>
          </Form>
          <hr />
          <div className="comment-cards">
            {comments.map((comment, index) => {
              if (comment.author === 'guest') {
                return (
                  <Card body className="comment-card" key={comment.comment_id}>
                    <h6>
                      {comment.author},{' '}
                      {new Date(comment.created_at).toString()}
                    </h6>
                    <p>{comment.body}</p>
                    <p className="likes">Likes: {comment.votes}</p>
                    <button
                      onClick={() =>
                        deleteComment(
                          index,
                          comment.comment_id,
                          comments,
                          setComments
                        )
                      }
                    >
                      <i className="fa fa-trash-o"></i>
                    </button>
                  </Card>
                );
              } else
                return (
                  <Card body className="comment-card" key={comment.comment_id}>
                    <h6>
                      {comment.author},{' '}
                      {new Date(comment.created_at).toString()}
                    </h6>
                    <p>{comment.body}</p>
                    <p className="likes">Likes: {comment.votes}</p>
                  </Card>
                );
            })}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Article;
