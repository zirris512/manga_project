import React from 'react';
import ApiQuery from '../components/Query/ApiQuery';

const Home = () => {
   return (
      <>
         <div className="container home">
            <h2>Top 10 Trending Anime</h2>
            <ApiQuery
               perPage={10}
               type="ANIME"
               sort="TRENDING_DESC"
               isHome={true}
            />
         </div>
         <br />
         <div className="container home">
            <h2>Top 10 Trending Manga</h2>
            <ApiQuery
               perPage={10}
               type="MANGA"
               sort="TRENDING_DESC"
               isHome={true}
            />
         </div>
      </>
   );
};

export default Home;
