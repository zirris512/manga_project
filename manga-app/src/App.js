import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home';
import AnimePage from './pages/AnimePage';
import MangaPage from './pages/MangaPage';

function App () {
   return (
      <Router>
         <Route exact path="/" component={Home}/>
         <Route path="/anime-page" component={AnimePage} />
         <Route path ="/manga-page" component={MangaPage} />
      </Router>
   )
}

export default App;