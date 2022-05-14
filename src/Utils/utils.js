import axios from 'axios';

const myApi = axios.create({
  baseURL: 'https://my-be-project.herokuapp.com/api',
});

export const fetchTopics = () => {
  return myApi.get('/topics').then(({ data }) => {
    return data;
  });
};

export const fetchArticles = (topic, sortBy) => {
  let path = '/articles';
  if (sortBy === 'comment_count') path += '?sort_by=comment_count';
  if (sortBy === 'votes') path += '?sort_by=votes';
  if (sortBy === 'asc') path += '?order=asc';
  if (sortBy === 'desc') path += '?order=desc';

  return myApi.get(path).then(({ data }) => {
    if (topic) {
      return data.filter((article) => article.topic === topic);
    } else return data;
  });
};

export const fetchArticle = (article_id) => {
  return myApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data;
  });
};

export const fetchComments = (article_id) => {
  return myApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
};

export const addVote = (article_id, votes, setVotes, setDisabled) => {
  const currentVotes = votes;
  setVotes((currVotes) => currVotes + 1);

  myApi
    .patch(`/articles/${article_id}`, {
      inc_votes: 1,
    })
    .then(setDisabled(true))
    .catch((err) => {
      if (err) {
        setVotes(currentVotes);
        setDisabled(false);
      }
    });
};

export const postComment = (
  article_id,
  newComment,
  prevComments,
  setComments
) => {
  return myApi
    .post(`/articles/${article_id}/comments`, {
      username: 'guest',
      body: newComment,
    })
    .then(({ data }) => {
      return data.comment.comment_id;
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        setComments(prevComments);
      }
    });
};

export const deleteComment = (index, comment_id, comments, setComments) => {
  const deletedComment = comments.filter(
    (comment) => comment.comment_id === comment_id
  );
  setComments((currComments) => {
    return currComments.filter((comment) => comment.comment_id !== comment_id);
  });
  myApi.delete(`/comments/${comment_id}`).catch((err) => {
    setComments((currComments) => {
      const newComments = [...currComments];
      newComments.splice(index, 0, deletedComment[0]);
      return newComments;
    });
  });
};
