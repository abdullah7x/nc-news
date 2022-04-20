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
