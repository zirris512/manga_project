import React from 'react';
import ApiQuery from '../components/Query/ApiQuery';

const Home = () => {
   return (
      <>
         <div className='container'>
            <h2>Trending Anime</h2>
            <ApiQuery perPage={10} type='ANIME' sort='TRENDING_DESC' isHome={true} />
         </div>
         <div className='container'>
            <h2>Trending Anime</h2>
            <ApiQuery perPage={10} type='MANGA' sort='TRENDING_DESC' isHome={true} />
         </div>

      </>
   )
}

export default Home;