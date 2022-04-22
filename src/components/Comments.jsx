import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { postComment } from '../Utils/utils';

const Comments = ({ article_id, comments, setComments }) => {
  const [commentBody, setCommentBody] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    const previousComments = comments;

    setComments((currComments) => {
      return [
        {
          author: 'guest',
          created_at: Date.now(),
          body: commentBody,
          votes: 0,
        },
        ...currComments,
      ];
    });
    postComment(previousComments, setComments, article_id, commentBody);

    setCommentBody('');
  };
};

export default Comments;
