import axios from 'axios';

const myApi = axios.create({
  baseURL: 'https://my-be-project.herokuapp.com/api',
});

export const fetchTopics = () => {
  return myApi.get('/topics').then(({ data }) => {
    return data;
  });
};

export const fetchArticles = (topic) => {
  return myApi.get('/articles').then(({ data }) => {
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
