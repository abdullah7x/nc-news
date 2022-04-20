import axios from 'axios';

const myApi = axios.create({
  baseURL: 'https://my-be-project.herokuapp.com/api',
});

export const fetchTopics = () => {
  return myApi.get('/topics').then(({ data }) => {
    return data;
  });
};

export const fetchArticles = () => {
  return myApi.get('/articles').then(({ data }) => {
    return data;
  });
};
