import Navigation from './components/Navigation.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Topics from './components/Topics.jsx';
import Article from './components/Article.jsx';
import Footer from './components/Footer.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/articles/:topic" element={<Topics />}></Route>
          <Route path="/article/:article_id" element={<Article />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
